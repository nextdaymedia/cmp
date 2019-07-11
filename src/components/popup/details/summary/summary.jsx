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
			dividerColor,
			textLinkColor
		} = theme;

		return (
			<div class={style.summary}>
				<div class={detailsStyle.title} style={{color: textColor}}>
					<SummaryLabel localizeKey='title'/>
				</div>
				<div class={detailsStyle.description}>
					<SummaryLabel localizeKey='description'/>
				</div>
				<div class={style.purposeItems}>
					{purposes.map((purposeItem, index) => (
						<div class={style.purposeItem} style={{borderColor: dividerColor}}>
							<span class={style.purposeTitle}>
								<PurposesLabel localizeKey={`purpose${purposeItem.id}.menu`}>{purposeItem.name}</PurposesLabel>
							</span>
							<a class={style.learnMore} onClick={this.handlePurposeItemClick(purposeItem)} style={{color: textLinkColor}}>
								<SummaryLabel localizeKey='detailLink'/>
							</a>
						</div>
					))}
				</div>
				<div class={detailsStyle.title} style={{color: textColor}}>
					<SummaryLabel localizeKey='who.title'/>
				</div>
				<div class={detailsStyle.description}>
					<SummaryLabel localizeKey='who.description'/>&nbsp;
					<a onClick={onVendorListClick} style={{color: textLinkColor}}>
						<SummaryLabel localizeKey='who.link'/>
					</a>
				</div>
				<div class={detailsStyle.title} style={{color: textColor}}>
					<SummaryLabel localizeKey='what.title'/>
				</div>
				<div class={detailsStyle.description}>
					<SummaryLabel localizeKey='what.description'/>&nbsp;
					<a onClick={onPurposeListClick} style={{color: textLinkColor}}>
						<SummaryLabel localizeKey='what.link'/>
					</a>
				</div>
			</div>
		);
	}
}
