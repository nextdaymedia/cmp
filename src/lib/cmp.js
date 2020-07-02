// This file supports both TCF v1 (__cmp) and TCF v2 (__tcfapi).
// Remove support for TCF v1 once it is no longer supported by the community.
//
// Functions in this file should register the callback with both __cmp and __tcfapi, if possible.
// The loaded CMP must only implement one of the two functions, ensuring the callback is only called once.
import log from './log';

export const getTCData = (view, callback) => {
	if (view.__tcfapi === undefined && view.__cmp === undefined) {
		return log.error('__tcfapi and __cmp are both undefined');
	}

	if (view.__tcfapi !== undefined) {
		view.__tcfapi('addEventListener', 2, (tcData, addSuccess) => {
			if (addSuccess) {
				const callbackWrapper = () => {
					view.__tcfapi('removeEventListener', 2, (removeSuccess) => {
						if (!removeSuccess) {
							log.error(`could not removeEventListener with listenerId '${tcData.listenerId}'`);
						}
					}, tcData.listenerId);
					callback(tcData, addSuccess);
				};

				switch (tcData.cmpId) {
					case 3: // LiveRamp/Faktor
						if (tcData.gdprApplies === false) {
							callbackWrapper();
						} else if (tcData.gdprApplies === true) {
							view.__tcfapi('consentDataExist', 2, (result, success) => {
								if (success && result) {
									callbackWrapper();
								}
							});
						}
						break;
					case 10: // Quantcast
						if (tcData.eventStatus === 'useractioncomplete') {
							callbackWrapper();
						}
						break;
					case 134: // Cookiebot
						if (tcData.tcString) {
							callbackWrapper();
						}
						break;
					default:
						log.warn(`unsupported cmpId '${tcData.cmpId}'`);
						if (tcData.gdprApplies === false || tcData.tcString) {
							callbackWrapper();
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
