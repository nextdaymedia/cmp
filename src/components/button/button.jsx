import { h, Component } from 'preact';
import style from './button.less';

export default class Button extends Component {

	static defaultProps = {
		onClick: () => {},
		invert: false
	};


	render(props) {
		const {
			children,
			onClick,
			styling,
			invert,
			clear,
			light,
			className
		} = props;

		return (
			<button
				class={[style.button, props.class, invert ? style.invert : '', light ? style.light : '', clear ? style.clear : '', className].join(' ')}
				onClick={onClick} style={styling}>
				{children}
			</button>
		);
	}
}
