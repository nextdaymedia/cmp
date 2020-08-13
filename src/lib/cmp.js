// This file supports TCF v2 (__tcfapi).
// Support for TCF v1 has been removed.
import log from './log';

export const getTCData = (view, callback) => {
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
};
