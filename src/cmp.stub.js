import listener from "./lib/ssp-fallback";
import config from './lib/config';

(function() {
	// TODO check if choiceID is different per publisher. If not, do not read choiceID from config
	const ndmCmpConfig = window.ndmCmpConfig || {};
	config.update(ndmCmpConfig);

	const element = document.createElement('script');
	const firstScript = document.getElementsByTagName('script')[0];
	const milliseconds = (new Date).getTime();

	const defaultRequestUrl = 'https://quantcast.mgr.consensu.org/choice.js';
	if (config.quantcast && config.quantcast.choiceID) {
		const xhttp = new XMLHttpRequest();
		const host = window.location.hostname;
		let url = 'https://quantcast.mgr.consensu.org'
			.concat('/choice/', config.quantcast.choiceID, '/', host, '/choice.js')
			.concat('?timestamp=', milliseconds);
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4) {
				element.async = true;
				element.type = 'text/javascript';
				if (this.status === 200) {
					element.src = url;
				} else {
					element.src = defaultRequestUrl;
				}
				firstScript.parentNode.insertBefore(element, firstScript);
			}
		};
		xhttp.open('GET', url, true);
		xhttp.send();
	} else {
		element.src = defaultRequestUrl;
		firstScript.parentNode.insertBefore(element, firstScript);
	}
})();
if (typeof window.__cmp === 'undefined') {
	let count = 0;
	window.__cmp = function() {
		const arg = arguments;
		if (typeof window.__cmp.a !== 'object') {
			if (count < 10) {
				setTimeout(() => {
					window.__cmp.apply(window.__cmp, arg);
				}, 400);
				count ++;
			} else {
				console.warn('CMP not loaded after 4 seconds');
			}
		} else {
			return window.__cmp.apply(window.__cmp, arg);
		}
	};
}

window.ndmtag = window.ndmtag || {};
window.ndmtag.cmd = window.ndmtag.cmd || [];

window.addEventListener("message", listener, false);
