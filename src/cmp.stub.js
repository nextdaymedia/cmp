// The quantcast script (scr/template/quantcast.js) is prepended to the bundle of this file (cmp.stub.bundle.js).

import listener from "./lib/ssp-fallback";
import log from "./lib/log";
import { getTCData } from './lib/cmp';

window.ndmtag = window.ndmtag || {};
window.ndmtag.cmd = window.ndmtag.cmd || [];

window.addEventListener("message", listener, false);

if (window.__cmp !== undefined) {
	// fetch google personalization consent information
	window.__cmp('getGooglePersonalization', (consent, isSuccess) => {
		log.warn("__cmp('getGooglePersonalization') is deprecated: use __tcfapi instead");
		// request non personalized ads if we don't have a cookie or if no consent is given
		if (!isSuccess || !consent.googlePersonalizationData.consentValue) {
			(window.adsbygoogle=window.adsbygoogle||[]).requestNonPersonalizedAds=1;
		}
	});
}

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

getTCData(window, (tcData) => {
	// vvv temporary fix.
	console.debug('NDM LegitimateInterests test', tcData);
	if (tcData.gdprApplies && isEmpty(tcData.purpose.legitimateInterests)) {
		console.warn('NDM Missing legitimateInterests', tcData);
		// deleteCookie('euconsent-v2', '/', '.' + window.location.hostname);
	} else {
		console.debug('NDM Find legitimateInterests', tcData);
	}
	// ^^^ temporary fix.
});
