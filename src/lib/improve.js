import Tag from "./tag";
import {CMP_GLOBAL_NAME} from "./cmp";
import log from './log';

export default class Improve extends Tag {
	constructor(options) {
		super(options);
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
		this.hasConsent = false;
	}

	getConsent(callback) {
		const cmp = window[CMP_GLOBAL_NAME];
		cmp('addEventListener', 'cmpReady', () => {
			cmp('getConsentData', null, data => {
				this.consent = data;
				cmp('validateConsentFor', 253, hasConsent => {
					this.hasConsent = hasConsent;
					callback();
				});
			});
		});
	}

	display() {
		this.getConsent(this.render.bind(this));
	}

	getHTML() {
		const tz = new Date().getTimezoneOffset();
		const width = this.size[0];
		const height = this.size[1];
		let url = `https://ad.360yield.com/adj?p=${this.id}&w=${width}&h=${height}&tz=${tz}`;
		if (this.consent) {
			url += `&GDPR=${this.hasConsent ? 1 : 0}`;

		}
		return `<script src="${url}"></script>`;
	}
}
