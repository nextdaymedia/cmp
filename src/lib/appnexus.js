import Tag from "./tag";
import Promise from "promise-polyfill";
import log from './log';
import { getTCData } from "./cmp";

const requireURLSearchParams = () => {
	if (window.URLSearchParams) {
		return window.URLSearchParams;
	}
	return import('url-search-params'/* webpackChunkName: "urlsearchparams" */)
		.then(URLSearchParams => window.URLSearchParams = URLSearchParams);
};

export default class Appnexus extends Tag {
	constructor(options, ndmtag) {
		super(options, ndmtag);
		const {
			size,
			sizes,
			promoSizes = [],
			promoAlignment = '',
			customParams = null,
		} = options;

		if (size === undefined && customParams === null) {
			return log.error('Missing size as option to defineAdSlot(name, { type: "appnexus", size: [970,250] })');
		}

		this.size = size;
		this.sizes = sizes;
		this.promoSizes = promoSizes;
		this.promoAlignment = promoAlignment;
		this.customParams = customParams;

		this.consent = {};
	}

	getConsent(callback) {
		getTCData(window, (data, success) => {
			if (!success) {
				return log.error('getTCData was not successful');
			}
			this.consent = data;
			callback();
		});
	}

	doDisplay() {
		this.getConsent(this.render.bind(this));
	}

	getHTML() {
		return Promise.resolve(true)
			.then(() => {
				if (this.customParams) {
					return requireURLSearchParams();
				}
			})
			.then(URLSearchParams => {
				const cacheBuster = new Date().getTime() + Math.random();
				let url = `https://secure.adnxs.com/ttj?id=${this.id}`;
				if (this.size) {
					const size = this.size.join('x');
					url += `&size=${size}`;
				}
				if (this.sizes !== undefined) {
					const sizes = this.sizes.map(size => size.join('x')).join(',');
					url += `&sizes=${sizes}`;
				}
				if (this.promoSizes !== undefined) {
					const promoSizes = this.promoSizes.map(size => size.join('x')).join(',');
					url += `&promo_sizes=${promoSizes}`;
				}
				if (this.promoAlignment) {
					url += `&promo_alignment=${this.promoAlignment}`;
				}
				if (this.consent) {
					url += `&gdpr=${this.consent.gdprApplies ? '1' : '0'}`;
					if (this.consent.tcString) {
						url += `&gdpr_consent=${this.consent.tcString}`;
					}
				}
				if (this.customParams) {
					let params = new URLSearchParams();
					Object.keys(this.customParams).forEach(key => {
						params.append(key, this.customParams[key]);
					});
					url += '&' + params.toString();
				}
				url += `&cb=${cacheBuster}`;
				return `<script src="${url}"></script>`;
			});
	}
}
