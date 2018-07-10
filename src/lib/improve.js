import Tag from "./tag";
import {CMP_GLOBAL_NAME} from "./cmp";
import log from './log';

export default class Improve extends Tag {
	constructor(options, ndmtag) {
		super(options, ndmtag);
		const {
			size,
			renderWithoutConsent = true
		} = options;

		if (size === undefined) {
			return log.error('Missing size as option to defineAdSlot(name, { type: "improve", size: [970,250] })');
		}

		this.size = size;
		this.renderWithoutConsent = renderWithoutConsent;

		this.consent = {};
	}

	getConsent(callback) {
		const cmp = window[CMP_GLOBAL_NAME];
		cmp('getConsentData', null, data => {
			this.consent = data;
			if (this.renderWithoutConsent) {
				callback();
			} else {
				cmp('addEventListener', 'cmpReady', () => {
					cmp('validateConsentFor', 253, hasConsent => {
						if (hasConsent) {
							callback();
						}
					});
				});
			}
		});
	}

	doDisplay() {
		this.getConsent(this.render.bind(this));
	}

	getHTML() {
		const tz = new Date().getTimezoneOffset();
		const width = this.size[0];
		const height = this.size[1];
		let url = `https://ad.360yield.com/adj?p=${this.id}&w=${width}&h=${height}&tz=${tz}`;
		if (this.consent) {
			url += `&GDPR=${this.consent.consentData}`;

		}
		return `<script src="${url}"></script>`;
	}
}
