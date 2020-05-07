// The quantcast script (scr/template/quantcast.js) is prepended to the bundle of this file (cmp.stub.bundle.js).

import listener from "./lib/ssp-fallback";
import log from "./lib/log";

window.ndmtag = window.ndmtag || {};
window.ndmtag.cmd = window.ndmtag.cmd || [];

window.addEventListener("message", listener, false);

if (window.__cmp !== undefined) {
	// fetch google personalization consent information
	window.__cmp('getGooglePersonalization', (consent, isSuccess) => {
		log.warn('__cmp is deprecated: use __tcfapi instead');
		// request non personalized ads if we don't have a cookie or if no consent is given
		if (!isSuccess || !consent.googlePersonalizationData.consentValue) {
			(window.adsbygoogle=window.adsbygoogle||[]).requestNonPersonalizedAds=1;
		}
	});
}
