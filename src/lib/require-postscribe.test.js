import { expect } from 'chai';
import requirePostscribe from './require-postscribe';

describe('require-postscribe', () => {
	it('returns postscribe from window if set', () => {
		window.postscribe = {foo: 'bar'};

		return requirePostscribe().
			then(postscribe => {
				expect(postscribe.foo).to.equal('bar');
			});
	});

	it('imports postscribe if not set', () => {
		delete window.postscribe;

		return requirePostscribe().
			then(postscribe => {
				expect(typeof(postscribe)).to.equal('function');
			});
	});
});
