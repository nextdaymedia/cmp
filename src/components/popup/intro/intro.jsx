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

const locale = Config.forceLocale || (window.ndmCmpConfig && window.ndmCmpConfig.forceLocale);

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
					<LocalLabel localizeKey='title' style={{color: titleColor}}>Thanks for visiting</LocalLabel> {!['fr', 'de'].includes(locale) && (DOMAIN)}
				</div>
				<div class={style.description} >
					<LocalLabel localizeKey='description' style={{color: textColor}}>Under the General Data Protection Regulation, cookies are considered personal data. Cookies are used on this website. You can find more information about this in the privacy statement. You are hereby requested to accept the use of these cookies.</LocalLabel>
				</div>
				{Config.privacyPolicy && (
					<div class={style.privacyPolicy} style={{color: textColor}}>
						<LocalLabel localizeKey='readOur' style={{color: textColor}}>Read our </LocalLabel>
						<a href={Config.privacyPolicy} class={style.link} target='_blank' style={{color: linkColor}}>
							<LocalLabel localizeKey='privacyPolicy' style={{color: linkColor}}>privacy policy</LocalLabel>
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
						<LocalLabel localizeKey='acceptAll'>Accept all</LocalLabel> &nbsp; ❯
					</Button>
					<Button
						class={style.rejectAll}
						light={true}
						onClick={onShowPurposes}
					>
						<LocalLabel localizeKey='showPurposes'>Manage your choices</LocalLabel>
					</Button>
				</div>
			</div>
		);
	}
}
