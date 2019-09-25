(function() {
	var ndmCmpConfig = window.ndmCmpConfig || {};
	var xhttp = new XMLHttpRequest();
	var host = ndmCmpConfig.host || window.location.hostname;
	var element = document.createElement('script');
	var firstScript = document.getElementsByTagName('script')[0];
	var milliseconds = (new Date).getTime();
	var url = 'https://quantcast.mgr.consensu.org'
		.concat('/choice/', '%%choiceID%%', '/', host, '/choice.js')
		.concat('?timestamp=', milliseconds);

	xhttp.onreadystatechange = function() {
		if (this.readyState === 4) {
			element.async = true;
			element.type = 'text/javascript';
			if(this.status === 200) {
				element.src = url;
			} else {
				var requestUrl = 'https://quantcast.mgr.consensu.org'.concat('/choice.js');
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
	var count = 0;
	window.__cmp = function() {
		var arg = arguments;

		if (typeof window.__cmp.a != 'object') {
			if (count >= 10) {
				console.warn('CMP not loaded after ' + (count * 0.4).toFixed(1) + ' seconds');
			}
			setTimeout(function() {window.__cmp.apply(window.__cmp, arg)}, 400);
			count ++;
		} else {
			return window.__cmp.apply(window.__cmp, arg);
		}
	}
}
