/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import Store from '../../../../lib/store';

import PurposeList from './purposeList';

describe('PurposeList', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render', () => {
		const store = new Store();

		render(<PurposeList
			store={store}
			theme={{}}
		/>, scratch);
	});
});
