import log from './log';

export default class LazyLoad {
	constructor() {
		this.positions = {};
		this.positionKeys = [];
		this.hasScrolled = false;
		this.scrollingElement = document.scrollingElement || document.documentElement || document.body;
		this.lastRun = Date.now();
		this.position = null;
		this.threshold = null;
		this.elements = {};

		this.positioning();
		setInterval(this.positioning.bind(this), 1000);

		window.addEventListener('scroll', () => {
			this.onScroll();
		});
	}

	add(id, callback, threshold = 0) {
		if (this.elements[id]) {
			return log.error(`Element with id ${id} already exists`);
		}

		let element = document.getElementById(id);
		if (!element) {
			return log.error(`Element with id: ${id} does not exist`);
		}
		if (typeof callback !== 'function') {
			return log.error(`Callback passed to add(id:string, callback:function, threshold:int=0) is not of type function`);
		}
		this.elements[id] = {
			dom: element,
			callback,
			threshold
		};

		this.updateElementPosition(id);
		this.positionKeys.push(id);
		this.onScroll(true, this.positionKeys.length - 1);
	}

	remove(id) {
		delete this.elements[id];
		delete this.positions[id];
		const keysIndex = this.positionKeys.indexOf(id);
		if (keysIndex > -1) {
			this.positionKeys.splice(keysIndex, 1);
		}
	}

	updateElementPosition(id) {
		let element = this.elements[id];
		let rect = element.dom.getBoundingClientRect();
		let top = rect.top + this.scrollingElement.scrollTop;

		let position = this.positions[id] || {
			element: element.dom,
			threshold: element.threshold,
			loaded: false,
			callback: element.callback
		};

		position.top = top;
		this.positions[id] = position;
	}

	positioning() {
		this.viewportHeight = window.innerHeight;

		Object.keys(this.elements).forEach(this.updateElementPosition.bind(this));
		this.positionKeys = Object.keys(this.positions);

		if (!this.hasScrolled) {
			this.onScroll();
		}
	}

	onScroll(force = false, i = 0) {
		// Run once every 50 ms
		if (Date.now() - this.lastRun < 50 && !force) {
			return;
		}

		let scrollTop = this.scrollingElement.scrollTop;
		let position;
		for (i; i < this.positionKeys.length; i++) {
			position = this.positions[this.positionKeys[i]];
			if (position.loaded) {
				continue;
			}
			if (position.top - position.threshold < scrollTop + this.viewportHeight && position.top - position.threshold >= scrollTop) {
				position.callback();
				position.loaded = true;
			}
		}

		this.lastRun = Date.now();

		if (!this.hasScrolled) {
			this.hasScrolled = true;
		}
	}
}
