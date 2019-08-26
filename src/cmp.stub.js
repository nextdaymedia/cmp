import listener from "./cmp.ssp";
import Config from "./lib/config";
import log from './lib/log';
import {hasLocalVendorConsentCookie} from './lib/cookie/cookie';
import {GeolocationClient, GDPR_APPLIES_NO} from "./lib/geolocation/client";
import {GeolocationEventManager} from "./lib/geolocation/eventManager";

(function(window) {
	window.ndmCmpConfig = window.ndmCmpConfig || {};
	const ndmCmpConfig = window.ndmCmpConfig;
	const configUpdates = {
		...ndmCmpConfig
	};
	Config.update(configUpdates);

	window.ndmCmpGeolocationEventManager = new GeolocationEventManager();

	if (!hasLocalVendorConsentCookie()) {
		const geolocationClient = new GeolocationClient(Config.geolocation);
		geolocationClient.gdprCheck()
			.then(result => {
				log.debug(`GDPR check result '${result}'`);
				window.ndmCmpConfig.gdprApplies = result !== GDPR_APPLIES_NO;
				window.ndmCmpGeolocationEventManager.gdprCheckDone();
			});
	} else {
		window.ndmCmpGeolocationEventManager.gdprCheckDone();
	}

	const commandQueue = [];
	const cmp = function (command, parameter, callback) {
		commandQueue.push({
			command,
			parameter,
			callback
		});
	};
	cmp.commandQueue = commandQueue;
	cmp.receiveMessage = function (event) {
		const data = event && event.data && event.data.__cmpCall;
		if (data) {
			const {callId, command, parameter} = data;
			commandQueue.push({
				callId,
				command,
				parameter,
				event
			});
		}
	};

	window.__cmp = cmp;

	window.ndmtag = window.ndmtag || {};
	window.ndmtag.cmd = window.ndmtag.cmd || [];

	window.addEventListener("message", listener, false);
}(window));
