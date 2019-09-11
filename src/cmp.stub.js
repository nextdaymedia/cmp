// quantcast script if prepended to bundle file by wrapper plugin in webpack.config.babel.js

import listener from "./lib/ssp-fallback";

window.ndmtag = window.ndmtag || {};
window.ndmtag.cmd = window.ndmtag.cmd || [];

window.addEventListener("message", listener, false);

// fetch google personalization consent information
window.__cmp('getGooglePersonalization', (consent, isSuccess) => {
	// request non personalized ads if we don't have a cookie or if no consent is given
	if (!isSuccess || !consent.googlePersonalizationData.consentValue) {
		(window.adsbygoogle=window.adsbygoogle||[]).requestNonPersonalizedAds=1;
	}
});
