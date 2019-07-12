import { h, Component } from 'preact';
import {Localize} from '../../lib/localize';

const lookup = new Localize().lookup;

function replaceAll(str, mapObj){
	const keys = Object.keys(mapObj);
	for (const key of keys) {
		str = str.replace(key, mapObj[key]);
	}
	return str;
}

export default class Label extends Component {
	static defaultProps = {
		prefix: ''
	};

	render(props, state) {
		const { prefix, localizeKey, className, replacements, children } = props;
		const key = prefix ? `${prefix}.${localizeKey}` : localizeKey;
		let localizedContent = lookup(key);

		if (replacements) {
			localizedContent = replaceAll(localizedContent, replacements);
		}
		// TODO apply replacements for src/components/popup/details/vendors/vendors.jsx:81

		// TODO remove '!'. It used to see which items are translated and which are not
		return (
			<span
				class={props.class || className}
				dangerouslySetInnerHTML={localizedContent && {__html: '!' + localizedContent}}>
				{!localizedContent && children}
			</span>
		);
	}
}
