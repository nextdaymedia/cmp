/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import Store from '../../../../lib/store';

import VendorList from './vendorList';

describe('VendorList', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render', () => {
		const store = new Store();

		render(<VendorList
			store={store}
			theme={{}}
		/>, scratch);
	});
});
