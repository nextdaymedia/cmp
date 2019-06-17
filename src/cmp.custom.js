import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/from';
import 'core-js/fn/object/keys';
import 'core-js/fn/set';
import {init} from './lib/init';
import {CMP_GLOBAL_NAME} from "./lib/cmp";
import renderCustomColor from "./lib/custom-color";

// Preserve any config options already set
const {config} = window[CMP_GLOBAL_NAME] || {};
const ndmCmpConfig = window.ndmCmpConfig || {};
const configUpdates = {
	globalConsentLocation: 'https://cmp.nextday.media/portal.html',
	storeConsentGlobally: false,
	simple: true,
	requiredVendors: [18, 32],
	...config,
	...ndmCmpConfig
};

renderCustomColor(ndmCmpConfig);

// Add stub
if (!window.__cmp) {
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
}

// Listen for postMessage events
const listen = window.attachEvent || window.addEventListener;
listen('message', event => {
	window.__cmp.receiveMessage(event);
}, false);

// Initialize CMP and then check if we need to ask for consent
init(configUpdates);
