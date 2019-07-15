import { h, Component } from 'preact';
import style from './summary.less';
import detailsStyle from '../details.less';
import Label from "../../../label/label";

class SummaryLabel extends Label {
	static defaultProps = {
		prefix: 'summary'
	};
}
class PurposesLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class Summary extends Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		vendors: [],
	};

	handlePurposeItemClick = purposeItem => {
		return () => {
			this.props.onPurposeClick(purposeItem);
		};
	};

	render(props, state)
	{
		const {
			purposes,
			onVendorListClick,
			onPurposeListClick,
			theme,
		} = props;

		const {
			textColor,
			titleColor,
			linkColor
		} = theme;

		return (
			<div class={style.summary}>
				<div class={detailsStyle.title} style={{color: titleColor}}>
					<SummaryLabel localizeKey='title'>Learn more about how information is being used?</SummaryLabel>
				</div>
				<div class={detailsStyle.description}>
					<SummaryLabel localizeKey='description' style={{color: textColor}}>
					We and select companies may access and use your information for the below purposes. You may
					customize your choices below or continue using our site if you're OK with the purposes.
					</SummaryLabel>
				</div>
				<div class={style.purposeItems}>
					{purposes.map((purposeItem, index) => (
						<div class={style.purposeItem}>
							<span class={style.purposeTitle}><PurposesLabel localizeKey={`purpose${purposeItem.id}.menu`}>{purposeItem.name}</PurposesLabel></span>
							<a class={style.learnMore} onClick={this.handlePurposeItemClick(purposeItem)} style={{color: linkColor}}>
								<SummaryLabel localizeKey='detailLink'>Learn More & Set Preferences</SummaryLabel>
							</a>
						</div>
					))}
				</div>
				<div class={detailsStyle.title} style={{color: titleColor}}>
					<SummaryLabel localizeKey='who.title'>Who is using this information?</SummaryLabel>
				</div>
				<div class={detailsStyle.description} style={{color: textColor}}>
					<SummaryLabel localizeKey='who.description'>
						We and pre-selected companies will use your information. You can see each company in
						the links above or
					</SummaryLabel>&nbsp;
					<a onClick={onVendorListClick} style={{color: linkColor}}><SummaryLabel localizeKey='who.link'>see the complete list here.</SummaryLabel></a>
				</div>
				<div class={detailsStyle.title} style={{color: titleColor}}>
					<SummaryLabel localizeKey='what.title'>What information is being used?</SummaryLabel>
				</div>
				<div class={detailsStyle.description} style={{color: textColor}}>
					<SummaryLabel localizeKey='what.description'>
						Different companies use different information,
					</SummaryLabel>&nbsp;
					<a onClick={onPurposeListClick} style={{color: linkColor}}><SummaryLabel localizeKey='what.link'>see the complete list here.</SummaryLabel></a>
				</div>
			</div>
		);
	}
}
