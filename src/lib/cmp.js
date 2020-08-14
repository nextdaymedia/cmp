// This file supports both TCF v1 (__cmp) and TCF v2 (__tcfapi).
// Remove support for TCF v1 once it is no longer supported by the community.
//
// Functions in this file should register the callback with both __cmp and __tcfapi, if possible.
// The loaded CMP must only implement one of the two functions, ensuring the callback is only called once.
import log from './log';

const isEmpty = (obj) => {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
};
// const deleteCookie = (name, path, domain) => {
// 	console.debug('NDM Delete: ', name, path, domain);
// 	document.cookie = name + "=" +
// 		((path) ? ";path="+path:"")+
// 		((domain)?";domain="+domain:"") +
// 		";expires=Thu, 01 Jan 1970 00:00:01 GMT";
// };

export const getTCData = (view, callback) => {
	if (view.__tcfapi === undefined && view.__cmp === undefined) {
		return log.error('__tcfapi and __cmp are both undefined');
	}

	if (view.__tcfapi !== undefined) {
		const callbackWrapper = (function () {
			let hasBeenInvoked = false;
			return function (tcData, addSuccess) {
				if (hasBeenInvoked) {
					// This ensures the code below is executed only once.
					// It is required due to the 'consentDataExist' command used with the LiveRamp/Faktor CMP.
					return;
				}
				hasBeenInvoked = true;

				view.__tcfapi('removeEventListener', 2, (removeSuccess) => {
					if (!removeSuccess) {
						log.error(`could not removeEventListener with listenerId '${tcData.listenerId}'`);
					}
				}, tcData.listenerId);
				callback(tcData, addSuccess);
			};
		})();

		view.__tcfapi('addEventListener', 2, (tcData, addSuccess) => {
			if (addSuccess) {
				switch (tcData.cmpId) {
					case 3: // LiveRamp/Faktor
						if (tcData.gdprApplies === false) {
							callbackWrapper(tcData, addSuccess);
						} else {
							// The LiveRamp CMP does not invoke the addEventListener callback after the user gives consent if the consent hasn't changed.
							// This could occur if the user denies all consent.
							// The consentDataExist is invoked immediately on registration and if consent has been given.
							view.__tcfapi('consentDataExist', 2, (result, consentDataExistSuccess) => {
								if (result && consentDataExistSuccess) {
									callbackWrapper(tcData, addSuccess);
								}
							});
						}
						break;
					case 10: // Quantcast
						if (tcData.cmpVersion <= 5) {
							if (tcData.eventStatus === 'useractioncomplete') {
								callbackWrapper(tcData, addSuccess);
							}
						} else if (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded') { // New behaviour since cmpVersion 6.
							// vvv temporary fix.
							console.debug('NDM LegitimateInterests test', tcData);
							if (isEmpty(tcData.purpose.legitimateInterests)) {
								console.warn('NDM Missing legitimateInterests', tcData);
								// deleteCookie('euconsent-v2', '/', '.' + window.location.hostname);
							} else {
								console.debug('NDM Find legitimateInterests', tcData);
							}
							// ^^^ temporary fix.
							callbackWrapper(tcData, addSuccess);
						}
						break;
					case 134: // Cookiebot
						if (tcData.tcString) {
							callbackWrapper(tcData, addSuccess);
						}
						break;
					default:
						log.warn(`unsupported cmpId '${tcData.cmpId}'`);
						if (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded') {
							callbackWrapper(tcData, addSuccess);
						}
						break;
				}
			}
		});
	}
	if (view.__cmp !== undefined) {
		view.__cmp('getConsentData', null, (data, success) => {
			log.warn("__cmp('getConsentData') is deprecated: use __tcfapi instead");
			callback({gdprApplies: data.gdprApplies, tcString: data.consentData}, success);
		});
	}
};
