import log from './log';

const defaultConfig = {
	customPurposeListLocation: './purposes.json',
	globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
	globalConsentLocation: './portal.html',
	storeConsentGlobally: false,
	storePublisherData: false,
	logging: false,
	forceLocale: null,
	gdprApplies: true,
	allowedVendorIds: null,
	simple: false,
	privacyPolicy: null,
	usePubVendorList: false,
	customCookieDomain: null,
	fallback: {
		listenDomain: 'https://cmp.nextday.media',
		scriptURL: 'https://fallback.nextday.media'
	},
	theme: {},
	geolocation: {
		domain: 'https://geolocation.nextday.media',
		timeout: 1000, // ms
	}
};

class Config {
	constructor() {
		this.update(defaultConfig);
	}

	update = (updates) => {
		if (updates && typeof updates === 'object') {
			const validKeys = Object.keys(defaultConfig);
			const { validUpdates, invalidKeys } = Object.keys(updates).reduce((acc, key) => {
				if (validKeys.indexOf(key) > -1) {
					acc.validUpdates = {
						...acc.validUpdates,
						[key]: updates[key]
					};
				}
				else {
					acc.invalidKeys.push(key);
				}
				return acc;
			}, { validUpdates: {}, invalidKeys: [] });

			Object.assign(this, validUpdates);
			if (invalidKeys.length) {
				log.warn(`Invalid CMP config values not applied: ${invalidKeys.join(', ')}`);
			}

		}
	};
}

export default new Config();
