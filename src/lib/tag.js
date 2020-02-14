import log from './log';
import requirePostscribe from './require-postscribe';

export default class Tag {
	constructor(options, ndmtag) {
		const {
			id,
			name,
			lazy = false
		} = options;

		if (id === undefined) {
			return log.error('Missing id as option to defineTagSlot({ id: "id" })');
		}

		this.id = id;
		this.name = name;
		this.lazy = lazy;
		this.ndmtag = ndmtag;
	}

	getHTML() {
		return `<span>Tag Type implemented for tag with id: ${this.id}</span>`;
	}

	display() {
		if (this.lazy) {
			this.ndmtag.lazyLoader.add(this.name, () => {
				this.doDisplay();
			}, 0);
		} else {
			this.doDisplay();
		}
	}

	doDisplay() {
		this.render();
	}

	render() {
		let postscribe;
		requirePostscribe()
			.then(ps => postscribe = ps)
			.then(this.getHTML.bind(this))
			.then(html => {
				postscribe(`#${this.name}`, html, {});
			});
	}
}
