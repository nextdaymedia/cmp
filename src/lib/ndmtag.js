import postscribe from 'postscribe';
import { CMP_GLOBAL_NAME } from './cmp';

class Tag {
	constructor(options) {
		const {
			id,
			target,
			lazy = false
		} = options;

		if (id === undefined) {
			throw new Error('Missing id as option to defineTagSlot({ id: "id" })');
		}
		if (target === undefined) {
			throw new Error('Missing id as option to defineTagSlot({ id: "id" })');
		}

		this.id = id;
		this.target = target;
		this.lazy = lazy;
		this.requiresConsent = false;
		this.hasRendered = false;
	}

	getHTML() {
		return `<span>Tag Type implemented for tag with id: ${this.id}</span>`;
	}

	getConsent() {
		throw new Error("not implemented");
	}

	display() {
		if (this.requiresConsent) {
			this.getConsent(this.render);
		} else {
			this.render();
		}
	}

	render() {
		postscribe(this.target, this.getHTML());
		this.hasRendered = true;
	}
}

class Appnexus extends Tag {
	constructor(options) {
		super(options);
		const {
			size,
			sizes,
			promoSizes = [],
			promoAlignment = '',
			// renderWithoutConsent = false
		} = options;

		if (size === undefined) {
			throw new Error('Missing size as option to defineTagSlot({ type: "appnexus", size: [970,250] })');
		}

		this.sizes = sizes;
		this.promoSizes = promoSizes;
		this.promoAlignment = promoAlignment;
		// this.renderWithoutConsent = renderWithoutConsent;

		this.consentData = '';
		this.requiresConsent = true;
	}

	getConsent(callback) {
		const cmp = window[CMP_GLOBAL_NAME];
		cmp('addEventListener', 'cmpReady', () => {
			cmp('getConsentData', null, data => {
				this.consentData = data;
				callback();
			});
		});
	}

	getHTML() {
		const cacheBuster = new Date().getTime() + Math.random();
		const size = this.size.join('x');
		let url = `https://secure.adnxs.com/ttj?id=${this.id}&size=${size}`;
		if (this.sizes) {
			const sizes = this.sizes.map(size => size.join('x')).join(',');
			url += `&sizes=${sizes}`;
		}
		if (this.promoSizes) {
			const sizes = this.sizes.map(size => size.join('x')).join(',');
			url += `&promo_sizes=${sizes}`;
		}
		if (this.promoAlignment) {
			url += `promo_alignment=${this.promoAlignment}`;
		}
		url += `&cb=${cacheBuster}`;
		return `<script src="${url}"></script>`;
	}
}

class Improve {
	constructor() {
		throw new Error('Improve is not yet implemented');
	}
}

export const NDMTAG_GLOBAL_NAME = 'ndmtag';

export default class NDMTag {
	constructor(commands) {
		this.cmd = {
			push: cmd => cmd()
		};
		this.isLoaded = false;
		this.isLoaded = true;

		this.adSlots = {};

		NDMTag.runQueuedCommands(commands);
	}

	static runQueuedCommands(commands) {
		commands.forEach(cmd => cmd());
	}

	defineAdSlot(options) {
		const {
			name,
			type
		} = options;
		if (!name) {
			throw new Error('Missing name as option to defineTagSlot({ name: "unique placement name" })');
		}
		if (!type) {
			throw new Error('Missing type as option to defineTagSlot({ type: "provider" })');
		}
		switch (type) {
			case "appnexus":
				this.adSlots[name] = Appnexus(options);
				break;
			case "improve":
				this.adSlots[name] = Improve(options);
				break;
			default:
				throw new Error(`Unsupported type: ${type}`);
		}
	}

	display(name) {
		const tag = this.adSlots[name];
		if (tag === undefined) {
			throw new Error(`No adSlot defined with name: ${name}`);
		} else if (tag.hasRendered) {
			throw new Error(`AdSlot with name: ${name} has already rendered`);
		}
		tag.display();
	}
}
