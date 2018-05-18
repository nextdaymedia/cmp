import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/from';
import 'core-js/fn/set';
import color from 'color';
import log from './lib/log';
import { init } from './lib/init';
import { CMP_GLOBAL_NAME } from "./lib/cmp";

function handleConsentResult(cmp, vendorList = {}, consent = {}) {
	let {vendorListVersion: listVersion} = vendorList;
	let {created, vendorListVersion} = consent;
	if (configUpdates.privacyPolicy && window.location.href === configUpdates.privacyPolicy) {
		// Do not show popup on privacy policy page
		return;
	}
	if (!created) {
		log.debug('No consent data found. Showing consent tool');
		cmp('showConsentTool');
	}
	else if (!listVersion) {
		log.debug('Could not determine vendor list version. Not showing consent tool');
	}
	else if (vendorListVersion !== listVersion) {
		log.debug(`Consent found for version ${vendorListVersion}, but received vendor list version ${listVersion}. Showing consent tool`);
		cmp('showConsentTool');
	}
	else {
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
			cmp('showConsentTool');
		}
		log.debug('Consent found. Not showing consent tool');
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
	storeConsentGlobally: true,
	simple: true,
	requiredVendors: [18, 32],
	...config,
	...ndmCmpConfig
};

// Custom styling
if (ndmCmpConfig.customColor) {
	let lighterColor = color(ndmCmpConfig.customColor).lighten(0.2).hex();
	let customStyle = `
		body div.intro_Ntqks .intro_KRr-J span {
			color: ${ndmCmpConfig.customColor};
		}
	 	body button.button_lgX0P.button_1bse9:hover, body input[type=button].button_lgX0P.button_1bse9:hover {
            background: #fff;
        }
        body button.button_lgX0P.button_1bse9:hover span, body input[type=button].button_lgX0P.button_1bse9:hover span {
            color: ${lighterColor};
        }
        body button.button_lgX0P.button_1bse9, body input[type=button].button_lgX0P.button_1bse9 {
            border-color: ${ndmCmpConfig.customColor};
            color: #499ec9;
        }
        body button.button_lgX0P:hover, body input[type=button].button_lgX0P:hover {
            background: ${lighterColor};
        }
        body button.button_lgX0P.button_1bse9 span, body input[type=button].button_lgX0P.button_1bse9 span {
        	color: ${ndmCmpConfig.customColor};
        }
        body button.button_lgX0P, body input[type=button].button_lgX0P {
            background-color: ${ndmCmpConfig.customColor};
        }
        body .switch_YfiyU.switch_17KWm .switch_1u7wB {
            background-color: ${ndmCmpConfig.customColor};
        }
        body .switch_YfiyU .switch_3N7Vv {
            background-color: ${ndmCmpConfig.customColor};
        }
        `;
	const head = document.head || document.getElementsByTagName('head')[0];
	const style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = customStyle;
	} else {
		style.appendChild(document.createTextNode(customStyle));
	}
	head.appendChild(style);
}

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
