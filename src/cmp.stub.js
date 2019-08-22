// import listener from "./cmp.ssp";

(function() {
	const xhttp = new XMLHttpRequest();
	const host = window.location.hostname;
	const element = document.createElement('script');
	const firstScript = document.getElementsByTagName('script')[0];
	const milliseconds = (new Date).getTime();
	let url = 'https://quantcast.mgr.consensu.org'
		.concat('/choice/', 'M3GJF68CvEPQs', '/', host, '/choice.js')
		.concat('?timestamp=', milliseconds);
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4) {
			element.async = true;
			element.type = 'text/javascript';
			if (this.status === 200) {
				element.src = url;
			} else {
				const requestUrl = 'https://quantcast.mgr.consensu.org'.concat('/choice.js');
				element.src = requestUrl;
				url = requestUrl;
			}
			firstScript.parentNode.insertBefore(element, firstScript);
		}
	};
	xhttp.open('GET', url, true);
	xhttp.send();
})();
if (typeof window.__cmp === 'undefined') {
	let count = 0;
	window.__cmp = function() {
		const arg = arguments;
		if (typeof window.__cmp.a !== 'object') {
			if (count < 10) {
				setTimeout(() => {
					console.log('call apply in setTimeout');
					window.__cmp.apply(window.__cmp, arg);
				}, 400);
				count ++;
			} else {
				console.warn('CMP not loaded after 4 seconds');
			}
		} else {
			console.log('call apply because __cmp.a is an object');
			return window.__cmp.apply(window.__cmp, arg);
		}
	};
}

window.ndmtag = window.ndmtag || {};
window.ndmtag.cmd = window.ndmtag.cmd || [];

// window.addEventListener("message", listener, false); // TODO debug
