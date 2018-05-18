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
					<LocalLabel localizeKey='title'>Thanks for visiting</LocalLabel> {DOMAIN}
				</div>
				<div class={style.description}>
					<LocalLabel localizeKey='description'>In order to run a successful website, we and certain third parties are setting cookies and accessing and storing information on your device for various purposes. Various third parties are also collecting data to show you personalized content and ads. Some third parties require your consent to collect data to serve you personalized content and ads.</LocalLabel>
				</div>
				{Config.privacyPolicy && (
					<div class={style.privacyPolicy}>
						<LocalLabel localizeKey='readOur'>Read our </LocalLabel>
						<a href={Config.privacyPolicy} class={style.link} target='_blank'>
							<LocalLabel localizeKey='privacyPolicy'>privacy policy</LocalLabel>
						</a>
					</div>
				)}
				<div class={style.options}>
					{!Config.simple && (
						<Button
							class={style.rejectAll}
							invert={true}
							onClick={onShowPurposes}
						>
							<LocalLabel localizeKey='showPurposes'>Manage your choices</LocalLabel>
						</Button>
					)}
					<Button
						class={style.acceptAll}
						onClick={onAcceptAll}
					>
						<LocalLabel localizeKey='acceptAll'>Accept all</LocalLabel>
					</Button>
				</div>
			</div>
		);
	}
}
