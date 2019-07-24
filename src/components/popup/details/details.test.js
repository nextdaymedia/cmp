/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import Store from '../../../lib/store';

import Details from './details';

describe('Details', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render', () => {
		const store = new Store();

		render(<Details
			store={store}
			theme={{}}
		/>, scratch);
	});
});
