/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import Store from '../../../../lib/store';

import Summary from './summary';

describe('Summary', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render', () => {
		const store = new Store();

		render(<Summary
			store={store}
			theme={{}}
			purposes={[]}
		/>, scratch);
	});
});
