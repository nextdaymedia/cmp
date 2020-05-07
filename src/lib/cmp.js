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
		view.__tcfapi('getTCData', 2, callback);
	}
	if (view.__cmp !== undefined) {
		view.__cmp('getConsentData', null, data => {
			log.warn('__cmp is deprecated: use __tcfapi instead');
			const success = data.gdprApplies && data.consentData;
			callback({gdprApplies: data.gdprApplies, tcString: data.consentData}, success);
		});
	}
};
