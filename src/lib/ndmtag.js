import Appnexus from "./appnexus";
import LazyLoad from './lazy-load';
import log from './log';

class Settings {
	constructor() {
		this.defaults = {
			lazyLoad: false
		};
		Object.keys(this.defaults).forEach(setting => {
			this[setting] = this.defaults[setting];
		});
	}

	set(setting, value) {
		if (this.defaults[setting] === undefined) {
			throw new Error(`not a valid setting: ${setting}`);
		}
		this[setting] = value;
	}

	get(setting) {
		return this[setting];
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
		this.settings = new Settings();

		this.queuedCommands = commands;
		this.lazyLoader = new LazyLoad();
	}

	defineAdSlot(name, options) {
		const { type } = options;
		if (!name) {
			return log.error('Missing name as option to defineAdSlot("unique placement name", options)');
		}
		if (this.adSlots[name] !== undefined) {
			return log.error(`Ad slot with name: ${name} already exists, make sure it's unique`);
		}
		if (!type) {
			return log.error('Missing type as option to defineAdSlot(name, { type: "provider" })');
		}
		options.name = name;
		if (options.lazy === undefined) {
			options.lazy = this.settings.get('lazyLoad');
		}
		switch (type) {
			case "appnexus":
				this.adSlots[name] = new Appnexus(options, this);
				break;
			default:
				throw new Error(`Unsupported type: ${type}`);
		}
	}

	display(name) {
		const tag = this.adSlots[name];
		if (tag === undefined) {
			return log.error(`No adSlot defined with name: ${name}`);
		}
		if (!document.getElementById(name)) {
			return log.error(`Missing element to render in for ad slot with name: ${name}`);
		}
		tag.display();
	}

	clear(name) {
		const tag = document.getElementById(name);
		if (!tag) {
			return log.error(`Element with id: ${name} does not exist`);
		}
		while (tag.firstChild) {
			tag.removeChild(tag.firstChild);
		}
		this.lazyLoader.remove(name);
	}

	refresh(name) {
		this.clear(name);
		this.display(name);
	}

	processCommands() {
		const commands = this.queuedCommands;
		commands.forEach(cmd => cmd());
		delete this.queuedCommands;
	}
}
