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

		const {
			titleColor,
			textColor,
			linkColor
		} = Config.theme;

		return (
			<div class={style.intro}>
				<div class={style.title} style={{color: titleColor}}>
					<LocalLabel localizeKey='title' style={{color: titleColor}}/> {DOMAIN}
				</div>
				<div class={style.description}>
					<LocalLabel localizeKey='description' style={{color: textColor}}/>
				</div>
				{Config.privacyPolicy && (
					<div class={style.privacyPolicy} style={{color: textColor}}>
						<LocalLabel localizeKey='readOur' style={{color: textColor}}/>&nbsp;
						<a href={Config.privacyPolicy} class={style.link} target='_blank' style={{color: linkColor}}>
							<LocalLabel localizeKey='privacyPolicy' style={{color: linkColor}}/>
						</a>
					</div>
				)}
				<div class={style.options}>
					<Button
						class={style.acceptAll}
						className="primary"
						invert={true}
						onClick={onAcceptAll}
					>
						<LocalLabel localizeKey='acceptAll'/> &nbsp; ❯
					</Button>
					<Button
						class={style.rejectAll}
						light={true}
						onClick={onShowPurposes}
					>
						<LocalLabel localizeKey='showPurposes'/>
					</Button>
				</div>
			</div>
		);
	}
}
