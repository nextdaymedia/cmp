import { h, Component } from 'preact';
import style from './vendors.less';
import detailsStyle from '../details.less';
import Switch from '../../../switch/switch';
import Label from "../../../label/label";
import ExternalLinkIcon from '../../../externallinkicon/externallinkicon';

class VendorsLabel extends Label {
	static defaultProps = {
		prefix: 'vendors'
	};
}
class PurposesLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class Vendors extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSelectAll: true
		};
	}

	static defaultProps = {
		vendors: [],
		selectedVendorIds: new Set(),
		selectVendor: () => {},
		selectAllVendors: () => {},
		selectedPurposeDetails: {}
	};

	handleToggleAll = () => {
		const { id: selectedPurposeId } = this.props.selectedPurposeDetails;
		const {isSelectAll} = this.state;
		this.props.selectAllVendors(isSelectAll, selectedPurposeId);
		this.setState({isSelectAll: !isSelectAll});
	};

	handleSelectVendor = ({dataId, isSelected}) => {
		this.props.selectVendor(dataId, isSelected);
	};

	render(props, state) {

		const { isSelectAll } = state;
		const {
			vendors,
			selectedVendorIds,
			selectedPurposeDetails,
			theme,
		} = props;

		const {
			titleColor,
			textColor,
			linkColor,
			primaryColor
		} = theme;

		const {
			id: selectedPurposeId,
			name,
			description
		} = selectedPurposeDetails;

		const validVendors = vendors
			.filter(({legIntPurposeIds = [], purposeIds = []}) => legIntPurposeIds.indexOf(selectedPurposeId) > -1 || purposeIds.indexOf(selectedPurposeId) > -1);

		return (
			<div class={style.vendors}>
				<div class={style.header}>
					<div class={detailsStyle.title} style={{color: titleColor}}>
						<PurposesLabel localizeKey={`purpose${selectedPurposeId}.title`}>{name}</PurposesLabel>
					</div>
				</div>
				<div class={detailsStyle.description} style={{color: textColor}}>
					<p><PurposesLabel localizeKey={`purpose${selectedPurposeId}.description`}>{description}</PurposesLabel></p>
					<p><PurposesLabel localizeKey='optoutdDescription'>
						Depending on the type of data they collect, use,
						and process and other factors including privacy by design, certain partners rely on your consent while others require you to opt-out.
						For information on each vendor and to exercise your choices, see below.
						Or to opt-out, visit the <a href='http://optout.networkadvertising.org/?c=1#!/' target='_blank' style={{color: linkColor}}>NAI</a>
						, <a href='http://optout.aboutads.info/?c=2#!/' target='_blank' style={{color: linkColor}}>DAA</a>
						, or <a href='http://youronlinechoices.eu/' target='_blank' style={{color: linkColor}}>EDAA</a> sites.
					</PurposesLabel></p>
				</div>
				<a class={style.toggleAll} onClick={this.handleToggleAll} style={{color: linkColor}}>
					{isSelectAll ?
						<VendorsLabel localizeKey='acceptAll'>Allow All</VendorsLabel> :
						<VendorsLabel localizeKey='acceptNone'>Disallow All</VendorsLabel>
					}
				</a>
				<div class={style.vendorContent}>
					<table class={style.vendorList}>
						<tbody>
							{validVendors.map(({id, name, purposeIds, policyUrl}, index) => (
								<tr key={id} class={index % 2 === 0 ? style.even : ''}>
									<td>
										<div class={style.vendorName}>
											{name}
											<a href={policyUrl} class={style.policy} style={{ color: linkColor}} target='_blank'>
												<ExternalLinkIcon color={linkColor} />
											</a>
										</div>
									</td>
									<td class={style.allowColumn}>
										{purposeIds.indexOf(selectedPurposeDetails.id) > -1 ?
											<span class={style.allowSwitch}>
												<VendorsLabel localizeKey='accept' style={{color: textColor}}>Allow</VendorsLabel>
												<Switch
													dataId={id}
													isSelected={selectedVendorIds.has(id)}
													onClick={this.handleSelectVendor}
												/>
											</span> :
											<VendorsLabel localizeKey='optOut' style={{color: textColor}}>requires opt-out</VendorsLabel>
										}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
