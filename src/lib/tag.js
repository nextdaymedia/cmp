import Promise from "promise-polyfill";

const requirePostscribe = () => {
	return new Promise(resolve => {
		if (window.postscribe) {
			resolve(window.postscribe);
		} else {
			import('postscribe'/* webpackChunkName: "postscribe" */).then(postscribe => {
				window.postscribe = postscribe;
				resolve(postscribe);
			});
		}
	});
};

export default class Tag {
	constructor(options) {
		const {
			id,
			name,
			lazy = false
		} = options;

		if (id === undefined) {
			throw new Error('Missing id as option to defineTagSlot({ id: "id" })');
		}

		this.id = id;
		this.name = name;
		this.lazy = lazy;
		this.hasRendered = false;
	}

	getHTML() {
		return `<span>Tag Type implemented for tag with id: ${this.id}</span>`;
	}

	display() {
		this.render();
	}

	render() {
		let postscribe;
		requirePostscribe()
			.then(ps => postscribe = ps)
			.then(this.getHTML.bind(this))
			.then(html => {
				postscribe(`#${this.name}`, html, {
					done: () => {
						this.hasRendered = true;
					}
				});
			});
	}
}
