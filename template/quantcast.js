(function() {
	var host = window.location.hostname;
	var element = document.createElement('script');
	var firstScript = document.getElementsByTagName('script')[0];
	var milliseconds = new Date().getTime();
	var url = 'https://quantcast.mgr.consensu.org'
		.concat('/choice/', '%%choiceID%%', '/', host, '/choice.js')
		.concat('?timestamp=', milliseconds);
	element.async = true;
	element.type = 'text/javascript';
	element.src = url;

	firstScript.parentNode.insertBefore(element, firstScript);

	function makeStub() {
		var TCF_LOCATOR_NAME = '__tcfapiLocator';
		var queue = [];
		var win = window;
		var cmpFrame;

		function addFrame() {
			var doc = win.document;
			var otherCMP = !!(win.frames[TCF_LOCATOR_NAME]);

			if (!otherCMP) {
				if (doc.body) {
					var iframe = doc.createElement('iframe');

					iframe.style.cssText = 'display:none';
					iframe.name = TCF_LOCATOR_NAME;
					doc.body.appendChild(iframe);
				} else {
					setTimeout(addFrame, 5);
				}
			}
			return !otherCMP;
		}

		function tcfAPIHandler() {
			var gdprApplies;
			var args = arguments;

			if (!args.length) {
				return queue;
			} else if (args[0] === 'setGdprApplies') {
				if (
					args.length > 3 &&
					args[2] === 2 &&
					typeof args[3] === 'boolean'
				) {
					gdprApplies = args[3];
					if (typeof args[2] === 'function') {
						args[2]('set', true);
					}
				}
			} else if (args[0] === 'ping') {
				var retr = {
					gdprApplies: gdprApplies,
					cmpLoaded: false,
					cmpStatus: 'stub'
				};

				if (typeof args[2] === 'function') {
					args[2](retr);
				}
			} else {
				queue.push(args);
			}
		}

		function postMessageEventHandler(event) {
			var msgIsString = typeof event.data === 'string';
			var json = {};

			try {
				if (msgIsString) {
					json = JSON.parse(event.data);
				} else {
					json = event.data;
				}
			} catch (ignore) {}

			var payload = json.__tcfapiCall;

			if (payload) {
				window.__tcfapi(
					payload.command,
					payload.version,
					function(retValue, success) {
						var returnMsg = {
							__tcfapiReturn: {
								returnValue: retValue,
								success: success,
								callId: payload.callId
							}
						};
						if (msgIsString) {
							returnMsg = JSON.stringify(returnMsg);
						}
						event.source.postMessage(returnMsg, '*');
					},
					payload.parameter
				);
			}
		}

		while (win) {
			try {
				if (win.frames[TCF_LOCATOR_NAME]) {
					cmpFrame = win;
					break;
				}
			} catch (ignore) {}

			if (win === window.top) {
				break;
			}
			win = win.parent;
		}
		if (!cmpFrame) {
			addFrame();
			win.__tcfapi = tcfAPIHandler;
			win.addEventListener('message', postMessageEventHandler, false);
		}
	};

	if (typeof module !== 'undefined') {
		module.exports = makeStub;
	} else {
		makeStub();
	}
})();

var cmpStubFunction = function() {
	var arg = arguments;
	if (typeof window.__cmp.a !== "object") {
		setTimeout(function() {
			window.__cmp.apply(window.__cmp, arg);
		}, 500);
	}
};

var tcfapiStubFunction = window.__tcfapi;

var checkIfCmpIsReady = function() {
	if (window.__cmp === cmpStubFunction && window.__tcfapi === tcfapiStubFunction) {
		console.warn("CMP not loaded after 6 seconds. Trying again.");
	} else {
		clearInterval(cmpInterval);
	}
};

if (typeof window.__cmp === "undefined") {
	window.__cmp = cmpStubFunction;
	var cmpInterval = setInterval(checkIfCmpIsReady, 6000);
}
