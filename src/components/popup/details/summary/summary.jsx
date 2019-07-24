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
					<SummaryLabel localizeKey='title' style={{color: textColor}}/>
				</div>
				<div class={detailsStyle.description}>
					<SummaryLabel localizeKey='description'/>
				</div>
				<div class={style.purposeItems}>
					{purposes.map((purposeItem, index) => (
						<div class={style.purposeItem}>
							<span class={style.purposeTitle}>
								<PurposesLabel localizeKey={`purpose${purposeItem.id}.title`}>{purposeItem.name}</PurposesLabel>
							</span>
							<a class={style.learnMore} onClick={this.handlePurposeItemClick(purposeItem)} style={{color: linkColor}}>
								<SummaryLabel localizeKey='detailLink'/>
							</a>
						</div>
					))}
				</div>
				<div class={detailsStyle.title} style={{color: titleColor}}>
					<SummaryLabel localizeKey='who.title'/>
				</div>
				<div class={detailsStyle.description} style={{color: textColor}}>
					<SummaryLabel localizeKey='who.description'/>&nbsp;
					<a onClick={onVendorListClick} style={{color: linkColor}}>
						<SummaryLabel localizeKey='who.link'/>
					</a>
				</div>
				<div class={detailsStyle.title} style={{color: titleColor}}>
					<SummaryLabel localizeKey='what.title'/>
				</div>
				<div class={detailsStyle.description} style={{color: textColor}}>
					<SummaryLabel localizeKey='what.description'/>&nbsp;
					<a onClick={onPurposeListClick} style={{color: linkColor}}>
						<SummaryLabel localizeKey='what.link'/>
					</a>
				</div>
			</div>
		);
	}
}
