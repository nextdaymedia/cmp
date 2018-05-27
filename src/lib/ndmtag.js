import Appnexus from "./appnexus";
import Improve from "./improve";

export const NDMTAG_GLOBAL_NAME = 'ndmtag';

export default class NDMTag {
	constructor(commands) {
		this.cmd = {
			push: cmd => cmd()
		};
		this.isLoaded = false;
		this.isLoaded = true;

		this.adSlots = {};

		this.queuesCommands = commands;
	}

	defineAdSlot(name, options) {
		const { type } = options;
		if (!name) {
			throw new Error('Missing name as option to defineAdSlot("unique placement name", options)');
		}
		if (this.adSlots[name] !== undefined) {
			throw new Error(`Ad slot with name: ${name} already exists, make sure it's unique`);
		}
		if (!type) {
			throw new Error('Missing type as option to defineAdSlot(name, { type: "provider" })');
		}
		options.name = name;
		switch (type) {
			case "appnexus":
				this.adSlots[name] = new Appnexus(options);
				break;
			case "improve":
				this.adSlots[name] = new Improve(options);
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

	processCommands() {
		const commands = this.queuesCommands;
		commands.forEach(cmd => cmd());
		delete this.queuesCommands;
	}
}