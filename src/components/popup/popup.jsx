import { h, Component } from 'preact';
import style from './popup.less';
import Intro from './intro/intro';
import Details from './details/details';
import Panel from '../panel/panel';
import Config from '../../lib/config';
import classNames from 'classnames';

const SECTION_INTRO = 0;
const SECTION_DETAILS = 1;

export default class Popup extends Component {
	state = {
		selectedPanelIndex: SECTION_INTRO,
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

	render(props, state) {
		const {
			store,
			onSave,
			theme,
			selectedPurposeDetails,
			onChangeDetailsPanel,
			onSelectPurpose,
			selectedDetailsPanelIndex,
		} = props;
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
					<Panel selectedIndex={selectedPanelIndex} style={{display: 'flex'}}>
						<Intro
							onAcceptAll={this.onAcceptAll}
							onShowPurposes={this.handleShowDetails}
							onClose={this.handleClose}
						/>
						<Details
							onSave={onSave}
							onCancel={this.onCancel}
							store={this.props.store}
							onClose={this.handleClose}
							theme={theme}
							onChangeDetailsPanel={onChangeDetailsPanel}
							onSelectPurpose={onSelectPurpose}
							selectedPurposeDetails={selectedPurposeDetails}
							selectedPanelIndex={selectedDetailsPanelIndex}
						/>
					</Panel>
				</div>
			</div>
		);
	}
}
