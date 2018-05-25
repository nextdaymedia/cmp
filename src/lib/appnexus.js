import {CMP_GLOBAL_NAME} from "./cmp";
import Tag from "./tag";

export default class Appnexus extends Tag {
	constructor(options) {
		super(options);
		const {
			size,
			sizes,
			promoSizes = [],
			promoAlignment = '',
			renderWithoutConsent = true
		} = options;

		if (size === undefined) {
			throw new Error('Missing size as option to defineAdSlot(name, { type: "appnexus", size: [970,250] })');
		}

		this.size = size;
		this.sizes = sizes;
		this.promoSizes = promoSizes;
		this.promoAlignment = promoAlignment;
		this.renderWithoutConsent = renderWithoutConsent;

		this.consent = {};
	}

	getConsent(callback) {
		const cmp = window[CMP_GLOBAL_NAME];
		cmp('addEventListener', 'cmpReady', () => {
			cmp('getConsentData', null, data => {
				this.consent = data;
				if (this.renderWithoutConsent) {
					callback();
				} else {
					cmp('validateConsentFor', 32, hasConsent => {
						if (hasConsent) {
							callback();
						}
					});
				}
			});
		});
	}

	display() {
		this.getConsent(this.render.bind(this));
	}

	getHTML() {
		const cacheBuster = new Date().getTime() + Math.random();
		const size = this.size.join('x');
		// let url = `http://ib.adnxs.com/ttj?id=${this.id}&size=${size}`;
		let url = `https://secure.adnxs.com/ttj?id=${this.id}&size=${size}`;
		if (this.sizes !== undefined) {
			const sizes = this.sizes.map(size => size.join('x')).join(',');
			url += `&sizes=${sizes}`;
		}
		if (this.promoSizes !== undefined) {
			const promoSizes = this.promoSizes.map(size => size.join('x')).join(',');
			url += `&promo_sizes=${promoSizes}`;
		}
		if (this.promoAlignment) {
			url += `promo_alignment=${this.promoAlignment}`;
		}
		if (this.consent) {
			url += `&gdpr=${this.consent.gdprApplies ? '1' : '0'}`;
			if (this.consent.consentData) {
				url += `&gdpr_consent=${this.consent.consentData}`;
			}
		}
		url += `&cb=${cacheBuster}`;
		return `<script src="${url}"></script>`;
	}
}
