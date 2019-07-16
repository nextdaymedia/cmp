import { h, Component } from 'preact';
import style from './intro.less';
import Button from '../../button/button';
import Label from '../../label/label';
import Config from '../../../lib/config';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'intro'
	};
}

const HOST_PARTS = ((window && window.location && window.location.hostname) || '').split('.');
const DOMAIN = HOST_PARTS.length > 0 ? HOST_PARTS.slice(-2).join('.') : '';

const locale = Config.forceLocale || (window && window.ndmCmpConfig && window.ndmCmpConfig.forceLocale);

export default class Intro extends Component {

	static defaultProps = {};

	render(props, state) {

		const {
			onAcceptAll,
			onShowPurposes
		} = props;

		return (
			<div class={style.intro}>
				<div class={style.title}>
					<LocalLabel localizeKey='title'/> {!['fr', 'de'].includes(locale) && (DOMAIN)}
				</div>
				<div class={style.description}>
					<LocalLabel localizeKey='description'/>
				</div>
				{Config.privacyPolicy && (
					<div class={style.privacyPolicy}>
						<LocalLabel localizeKey='readOur'/>&nbsp;
						<a href={Config.privacyPolicy} class={style.link} target='_blank'>
							<LocalLabel localizeKey='privacyPolicy'/>
						</a>
					</div>
				)}
				<div class={style.options}>
					<Button
						class={style.rejectAll}
						invert={true}
						onClick={onShowPurposes}
					>
						<LocalLabel localizeKey='showPurposes'/>
					</Button>
					<Button
						class={style.acceptAll}
						onClick={onAcceptAll}
					>
						<LocalLabel localizeKey='acceptAll'/>
					</Button>
				</div>
			</div>
		);
	}
}
