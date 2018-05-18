import { h, Component } from 'preact';
import style from './popup.less';
import Intro from './intro/intro';
import Details from './details/details';
import Required from './required/required';
import Panel from '../panel/panel';
import Config from '../../lib/config';
import classNames from 'classnames';

const SECTION_INTRO = 0;
const SECTION_DETAILS = 1;
const SECTION_REQUIRED = 2;

export default class Popup extends Component {
	state = {
		selectedPanelIndex: SECTION_INTRO,
		requiredPurposeConsent: []
	};

	onAcceptAll = () => {
		const { store, onSave } = this.props;
		store.selectAllVendors(true);
		store.selectAllPurposes(true);
		store.selectAllCustomPurposes(true);
		onSave();
	};

	onCancel = () => {
		this.setState({
			selectedPanelIndex: SECTION_INTRO
		});
	};

	handleShowDetails = () => {
		this.setState({
			selectedPanelIndex: SECTION_DETAILS
		});
	};

	handleClose = () => {
		const { store, onSave } = this.props;
		onSave();
		store.toggleFooterShowing(true);
	};

	onSave = () => {
		const { store } = this.props;
		store.persist();

		const allConsentGiven = this.hasRequiredConsent();
		if (!allConsentGiven) {
			this.setState({
				selectedPanelIndex: SECTION_REQUIRED,
				requiredPurposeConsent: this.requiredPurposeConsent()
			});
		} else {
			this.props.onSave();
		}
	};

	hasRequiredConsent = () => {
		const { store } = this.props;
		const requiredPurposeConsent = this.requiredPurposeConsent();
		const consent = store.getVendorConsentsObject(Config.requiredVendors);
		for (let i = 0; i < requiredPurposeConsent.length; i++) {
			if (!consent.purposeConsents[requiredPurposeConsent[i]]) {
				return false;
			}
		}
		for (let i = 0; i < Config.requiredVendors.length; i++) {
			if (!consent.vendorConsents[Config.requiredVendors[i]]) {
				return false;
			}
		}
		return true;
	};

	requiredPurposeConsent = () => {
		const { store } = this.props;
		// new Set() for unique, [].concat for flatten
		return Array.from(new Set([].concat(...Config.requiredVendors.map(id => {
			return store.vendorList.vendors.filter(vendor => vendor.id === id)[0].purposeIds;
		}))));
	};

	render(props, state) {
		const { store } = props;
		const { selectedPanelIndex } = state;
		const { isConsentToolShowing } = store;

		let classes = style.content;
		if (Config.simple) {
			classes = classNames(style.content, style.simple);
		}

		return (
			<div
				class={style.popup}
				style={{ display: isConsentToolShowing ? 'flex' : 'none' }}
			>
				<div
					class={style.overlay}
				/>
				<div class={classes}>
					<Panel selectedIndex={selectedPanelIndex}>
						<Intro
							onAcceptAll={this.onAcceptAll}
							onShowPurposes={this.handleShowDetails}
							onClose={this.handleClose}
						/>
						<Details
							onSave={this.onSave}
							onCancel={this.onCancel}
							store={this.props.store}
							onClose={this.handleClose}
						/>
						<Required
							onSave={this.onSave}
							store={this.props.store}
							requiredPurposeConsent={this.state.requiredPurposeConsent}
							handleBack={this.handleShowDetails}
						/>
					</Panel>
				</div>
			</div>
		);
	}
}
