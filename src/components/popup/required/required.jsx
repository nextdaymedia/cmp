import { h, Component } from 'preact';
import style from './required.less';
import Label from '../../label/label';
import Switch from '../../switch/switch';
import Button from '../../button/button';
import Config from '../../../lib/config';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'required'
	};
}

export default class Required extends Component {
	handleSelectPurpose = ({ dataId, isSelected }) => {
		const { store } = this.props;
		store.selectPurpose(dataId, isSelected);
	};
	handleSelectVendor = ({ dataId, isSelected }) => {
		const { store } = this.props;
		store.selectVendor(dataId, isSelected);
	};
	onAcceptAll = () => {
		const { store, onSave, requiredPurposeConsent } = this.props;
		for (let i = 0; i < requiredPurposeConsent.length; i++) {
			store.selectPurpose(requiredPurposeConsent[i], true);
		}
		const { vendorList } = store;
		const { vendors = [] } = vendorList;
		const requiredVendors = vendors.filter(vendor => Config.requiredVendors.indexOf(vendor.id) !== -1);
		for (let i = 0; i < requiredVendors.length; i++) {
			store.selectVendor(requiredVendors[i].id, true);
		}
		setTimeout(() => {
			onSave();
		}, 500);
	};

	render(props, state) {
		const {
			store,
			requiredPurposeConsent
		} = props;

		const {
			vendorList = {},
			vendorConsentData,
		} = store;

		const { selectedPurposeIds, selectedVendorIds } = vendorConsentData;
		const { purposes = [], vendors = [] } = vendorList;
		const requiredVendors = vendors.filter(vendor => Config.requiredVendors.indexOf(vendor.id) !== -1);

		return (
			<div class={style.required}>
				<div class={style.body}>
					<div class={style.description}>
						<LocalLabel localizeKey='purposeDescription'>In order to run a successful website, we need a minimal
							consent of the following categories:</LocalLabel>
					</div>
					<div className={style.header}>
						<table className={style.list}>
							<thead>
								<tr>
									<th><LocalLabel localizeKey='purpose'>Purpose</LocalLabel></th>
									<th><Label localizeKey='vendors.offOn'>Allow</Label></th>
								</tr>
							</thead>
						</table>
					</div>
					<div className={style.content}>
						<table className={style.list}>
							<tbody>
								{requiredPurposeConsent.map((id, index) => {
									const selectedPurpose = purposes.filter(purpose => purpose.id === id)[0];
									const purposeIsActive = selectedPurposeIds.has(id);
									return (
										<tr key={id} class={index % 2 === 1 ? style.even : ''}>
											<td>
												<div className={style.name}>
													<Label
														localizeKey={`purposes.purpose${id}.title`}>{selectedPurpose.name}</Label>
												</div>
											</td>
											<td>
												<Switch
													dataId={id}
													isSelected={purposeIsActive}
													onClick={this.handleSelectPurpose}
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div class={style.description}>
						<LocalLabel localizeKey='vendorDescription'>And the following vendors:</LocalLabel>
					</div>
					<div class={style.header}>
						<table class={style.list}>
							<thead>
								<tr>
									<th><LocalLabel localizeKey='company'>Company</LocalLabel></th>
									<th><Label localizeKey='vendors.offOn'>Allow</Label></th>
								</tr>
							</thead>
						</table>
					</div>
					<div class={style.content}>
						<table class={style.list}>
							<tbody>
								{requiredVendors.map(({id, name}, index) => (
									<tr key={id} class={index % 2 === 1 ? style.even : ''}>
										<td>
											<div class={style.name}>{name}</div>
										</td>
										<td>
											<Switch
												dataId={id}
												isSelected={selectedVendorIds.has(id)}
												onClick={this.handleSelectVendor}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div class={style.footer}>
					<a className={style.cancel} onClick={this.props.handleBack}><LocalLabel
						localizeKey='back'>Back</LocalLabel></a>
					<Button class={style.save} onClick={this.onAcceptAll}><LocalLabel localizeKey='acceptAll'>Accept all</LocalLabel></Button>
				</div>
			</div>
		);
	}

}
