import { h, Component } from 'preact';
import style from './vendorList.less';
import detailsStyle from '../details.less';
import ExternalLinkIcon from '../../../externallinkicon/externallinkicon';
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'vendors'
	};
}

export default class VendorList extends Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		vendors: [],
	};

	render(props, state) {

		const {
			vendors,
			onBack,
			theme,
		} = props;

		const {
			titleColor,
			textColor,
			linkColor
		} = theme;

		return (
			<div class={style.vendorList}>
				<div class={style.header}>
					<div class={detailsStyle.title} style={{color: titleColor}}>
						<LocalLabel localizeKey='title'/>
					</div>
				</div>
				<div class={detailsStyle.description} style={{color: textColor}}>
					<LocalLabel localizeKey='description'/>
				</div>
				<a onClick={onBack} style={{color: linkColor}} class={style.customize}>
					<LocalLabel localizeKey='back'/>
				</a>
				<table>
					{vendors.map(({name, policyUrl}, index) => (
						<tr class={index % 2 === 0 ? style.even : style.odd}>
							<td>
								<div class={style.company} style={{color: textColor}}>
									<span>{name}</span>
									<a href={policyUrl} className={style.policy} style={{color: linkColor}} target='_blank'>
										<ExternalLinkIcon color={linkColor} />
									</a>
								</div>
							</td>
						</tr>
					))}
				</table>
			</div>
		);
	}
}
