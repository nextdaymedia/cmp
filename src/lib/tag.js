import postscribe from "postscribe";

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
		postscribe(`#${this.name}`, this.getHTML(), {
			done: () => {
				this.hasRendered = true;
			}
		});
	}
}
