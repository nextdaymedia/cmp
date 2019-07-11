import { h, Component } from 'preact';
import style from './details.less';
import Button from '../../button/button';
import Panel from '../../panel/panel';
import Label from "../../label/label";
import PurposeList from './purposeList/purposeList';
import Summary from './summary/summary';
import VendorList from './vendorList/vendorList';
import Vendors from './vendors/vendors';

export const SECTION_PURPOSES = 0;
export const SECTION_VENDOR_LIST = 1;
export const SECTION_PURPOSE_LIST = 2;
export const SECTION_VENDORS = 3;

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'details'
	};
}

export default class Details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultSelectedPanelIndex: props.selectedPanelIndex,
		};
	}

	handlePanelClick = panelIndex => {
		return () => {
			this.props.onChangeDetailsPanel(Math.max(0, panelIndex));
		};
	};

	handleBack = () => {
		if (this.props.selectedPanelIndex === SECTION_PURPOSES) {
			this.props.onChangeDetailsPanel(SECTION_PURPOSE_LIST);
		} else {
			this.props.onChangeDetailsPanel(SECTION_PURPOSES);
		}
	};

	handlePurposeClick = purposeItem => {
		const {
			onChangeDetailsPanel,
			onSelectPurpose,
		} = this.props;

		onChangeDetailsPanel(SECTION_VENDORS);
		onSelectPurpose(purposeItem);
	};

	render(props, state) {
		const {
			onSave,
			store,
			theme,
			selectedPurposeDetails,
			selectedPanelIndex,
		} = props;
		const {
			backgroundColor,
			textLightColor,
			dividerColor,
			secondaryColor,
			secondaryTextColor,
			primaryColor,
			primaryTextColor,
		} = theme;
		const { defaultSelectedPanelIndex } = state;

		const {
			vendorList = {},
			customPurposeList = {},
			vendorConsentData,
			publisherConsentData,
			selectAllVendors,
			selectVendor
		} = store;
		const { selectedPurposeIds, selectedVendorIds } = vendorConsentData;
		const { selectedCustomPurposeIds } = publisherConsentData;
		const { purposes = [], vendors = [] } = vendorList;
		const { purposes: customPurposes = [] } = customPurposeList;

		const formattedVendors = vendors
			.map(vendor => ({
				...vendor,
				policyUrl: vendor.policyUrl.indexOf('://') > -1 ? vendor.policyUrl : `http://${vendor.policyUrl}`
			}))
			.sort(({ name: n1 }, { name: n2 }) => n1.toLowerCase() === n2.toLowerCase() ? 0 : n1.toLowerCase() > n2.toLowerCase() ? 1 : -1);

		return (
			<div class={style.details} style={{
				backgroundColor,
				color: textLightColor
			}}>
				<div class={style.body}>
					<Panel selectedIndex={selectedPanelIndex}>
						<Summary
							purposes={purposes}
							onPurposeClick={this.handlePurposeClick}
							onVendorListClick={this.handlePanelClick(SECTION_VENDOR_LIST)}
							onPurposeListClick={this.handlePanelClick(SECTION_PURPOSE_LIST)}
							theme={theme}
						/>
						<VendorList
							vendors={formattedVendors}
							onBack={this.handleBack}
							theme={theme}
						/>
						<PurposeList
							onBack={this.handleBack}
							theme={theme}
							onPurposesClick={this.handlePanelClick(SECTION_PURPOSES)}
						/>
						<Vendors
							vendors={formattedVendors}
							purposes={purposes}
							selectVendor={selectVendor}
							selectAllVendors={selectAllVendors}
							selectedVendorIds={selectedVendorIds}
							selectedPurposeDetails={selectedPurposeDetails}
							theme={theme}
						/>
					</Panel>
				</div>
				<div class={style.footer} style={{ borderColor: dividerColor }}>
					{selectedPanelIndex !== defaultSelectedPanelIndex &&
					<Button
						class={style.back}
						onClick={this.handleBack}
						backgroundColor={secondaryColor}
						textColor={secondaryTextColor}
					>&lt; <LocalLabel localizeKey='back'/></Button>
					}
					<Button
						class={style.save}
						onClick={onSave}
						backgroundColor={primaryColor}
						textColor={primaryTextColor}
					><LocalLabel localizeKey='save'/></Button>
				</div>
			</div>
		);
	}
}
