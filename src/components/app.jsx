import { h, Component } from 'preact';
import style from './app.less';
import Popup from './popup/popup';
import Footer from './footer/footer';
import { SECTION_PURPOSE_LIST, SECTION_VENDORS } from './popup/details/details';

export default class App extends Component {
	static defaultProps = {
		theme: {}
	};

	state = {
		store: this.props.store,
		selectedDetailsPanelIndex: SECTION_PURPOSE_LIST,
		visitedPurposes: {},
	};

	onSave = () => {
		const { store, notify } = this.props;
		store.persist();
		notify('onSubmit');
		store.toggleConsentToolShowing(false);
	};

	onChangeDetailsPanel = panelIndex => {
		this.props.store.toggleConsentToolShowing(true);
		this.setState({
			selectedDetailsPanelIndex: Math.max(0, panelIndex)
		});
	};

	onSelectPurpose = purposeItem => {
		const { visitedPurposes } = this.state;
		const { store } = this.props;
		const {
			selectAllVendors,
			vendorConsentData: { created }
		} = store;

		// If this is the user's first visit according to their cookie data
		// our workflow is to default all vendor consents to disallow for
		// each purpose they inspect.
		if (!created &&
			!visitedPurposes[purposeItem.id]) {
			selectAllVendors(false, purposeItem.id);
		}
		this.setState({
			visitedPurposes: {
				...visitedPurposes,
				[purposeItem.id]: true
			}
		});

		store.toggleConsentToolShowing(true);
		this.setState({
			selectedPurposeDetails: purposeItem,
			selectedDetailsPanelIndex: SECTION_VENDORS
		});
	};


	updateState = (store) => {
		this.setState({ store });
	};

	componentWillMount() {
		const { store } = this.props;
		store.subscribe(this.updateState);
	}

	render(props, state) {

		const {
			store,
			selectedDetailsPanelIndex,
			selectedPurposeDetails,
		} = state;
		const {
			theme,
		} = props;

		return (
			<div class={style.gdpr}>
				<Popup store={store}
					   onSave={this.onSave}
					   theme={theme}
					   onChangeDetailsPanel={this.onChangeDetailsPanel}
					   selectedDetailsPanelIndex={selectedDetailsPanelIndex}
					   onSelectPurpose={this.onSelectPurpose}
					   selectedPurposeDetails={selectedPurposeDetails}
				/>
				<Footer store={store} />
			</div>
		);
	}
}
