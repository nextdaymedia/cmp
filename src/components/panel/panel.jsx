import { h, Component } from 'preact';


export default class Panel extends Component {
	constructor(props) {
		super(props);
		this.sectionRef = null;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectedIndex !== this.props.selectedIndex) {
			if (this.sectionRef) {
				this.sectionRef.scrollIntoView({block: 'start', behavior: 'auto'});
			}
		}
	}

	render(props) {
		const { children=[], selectedIndex, style } = props;
		const section = children.length && selectedIndex < children.length ? children[selectedIndex] : null;

		return (
			<div ref={ref => this.sectionRef = ref} style={style}>
				{section}
			</div>
		);
	}
}

