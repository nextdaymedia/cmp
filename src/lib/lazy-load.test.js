import { expect } from 'chai';
import LazyLoad from './lazy-load';

describe('lazy-load', () => {
	it('can add a callback', () => {
		document.body.innerHTML = `<div id="test-id">Hello world</div>`;

		const lazyLoad = new LazyLoad();
		lazyLoad.updateElementPosition = jest.fn();
		lazyLoad.onScroll = jest.fn();

		lazyLoad.add('test-id', () => {}, 10);

		expect(lazyLoad.updateElementPosition.mock.calls.length).to.equal(1);
		expect(lazyLoad.updateElementPosition.mock.calls[0][0]).to.equal('test-id');
		expect(lazyLoad.onScroll.mock.calls.length).to.equal(1);
		expect(lazyLoad.onScroll.mock.calls[0][0]).to.equal(true);
		expect(lazyLoad.onScroll.mock.calls[0][1]).to.equal(0);
	});
});
