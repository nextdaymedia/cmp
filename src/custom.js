import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/from';
import 'core-js/fn/set';
import log from './lib/log';
import {init} from './lib/init';
import {CMP_GLOBAL_NAME} from "./lib/cmp";
import renderCustomColor from "./lib/custom-color";

function handleConsentResult(cmp, vendorList = {}, consent = {}) {
	let {created} = consent;
	if (created) {
		let hasRequiredConsent = true;
		let requiredPurposes = [];
		let {requiredVendors} = configUpdates;
		if (!requiredVendors) {
			requiredVendors = [];
		}
		for (let i = 0; i < requiredVendors.length; i++) {
			if (!consent.vendorConsents[requiredVendors[i]]) {
				hasRequiredConsent = false;
				break;
			}
			let vendors = vendorList.vendors.filter(vendor => vendor.id === requiredVendors[i]);
			if (vendors.length) {
				requiredPurposes = requiredPurposes.concat(vendors[0].purposeIds);
			}
		}
		for (let i = 0; i < requiredPurposes.length; i++) {
			if (!consent.purposeConsents[requiredPurposes[i]]) {
				hasRequiredConsent = false;
				break;
			}
		}
		if (!hasRequiredConsent) {
			log.debug('Missing required consent, showing consent tool');
			cmp('showConsentTool');
		} else {
			log.debug('Consent found. Not showing consent tool');
		}
	}
}

function checkConsent(cmp) {
	if (!cmp) {
		log.error('CMP failed to load');
	}
	else if (!window.navigator.cookieEnabled) {
		log.warn('Cookies are disabled. Ignoring CMP consent check');
	}
	else {
		cmp('getVendorList', null, vendorList => {
			const timeout = setTimeout(() => {
				handleConsentResult(cmp, vendorList);
			}, 100);

			cmp('getVendorConsents', null, vendorConsents => {
				clearTimeout(timeout);
				handleConsentResult(cmp, vendorList, vendorConsents);
			});
		});
	}
}

// Preserve any config options already set
const {config} = window[CMP_GLOBAL_NAME] || {};
const ndmCmpConfig = window.ndmCmpConfig || {};
const configUpdates = {
	globalConsentLocation: 'https://cmp.nextday.media/portal.html',
	globalVendorListLocation: 'https://cmp.nextday.media/vendorlist.json',
	storeConsentGlobally: false,
	simple: true,
	requiredVendors: [18, 32],
	...config,
	...ndmCmpConfig
};

renderCustomColor(ndmCmpConfig);

// Add locator frame
function addLocatorFrame() {
	if (!window.frames['__cmpLocator']) {
		if (document.body) {
			const frame = document.createElement('iframe');
			frame.style.display = 'none';
			frame.name = '__cmpLocator';
			document.body.appendChild(frame);
		}
		else {
			setTimeout(addLocatorFrame, 5);
		}
	}
}

addLocatorFrame();

// Add stub
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

// Listen for postMessage events
const listen = window.attachEvent || window.addEventListener;
listen('message', event => {
	window.__cmp.receiveMessage(event);
}, false);

// Initialize CMP and then check if we need to ask for consent
init(configUpdates).then(() => checkConsent(window.__cmp));
