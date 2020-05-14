import { expect } from 'chai';
import Appnexus from './appnexus';

function htmlToSrc(html) {
	html = html.replace(/^[^"]+"([^"]+)"[^"]+$/, '$1'); // remove script tag
	return html.replace(/^(.*)&cb=.*$/, '$1'); // remove cache buster query parameter
}

describe('appnexus', () => {
	it('can generate script tag without consent', () => {
		const appnexus = new Appnexus({
			id: '123',
			size: [234, 789],
			sizes: [[112, 223], [445, 667]],
			promoSizes: [[531, 642], [753, 865]],
			promoAlignment: 'foo',
		}, null);

		return appnexus.getHTML().
			then(html => {
				const src = htmlToSrc(html);
				expect(src).to.equal('https://secure.adnxs.com/ttj?id=123&size=234x789&sizes=112x223,445x667&promo_sizes=531x642,753x865&promo_alignment=foo');
			});

	});

	it('can generate script tag with custom query params', () => {
		const appnexus = new Appnexus({
			id: '123',
			size: [234, 789],
			promoSizes: [[531, 642], [753, 865]],
			customParams: {foo: 'bar'},
		}, null);

		return appnexus.getHTML().
			then(html => {
				const src = htmlToSrc(html);
				expect(src).to.equal('https://secure.adnxs.com/ttj?id=123&size=234x789&promo_sizes=531x642,753x865&foo=bar');
			});
	});

	it('can get cmp consent from __tcfapi or __cmp', () => {
		const tcfapi = jest.fn();
		window.__tcfapi = tcfapi;

		const cmp = jest.fn();
		window.__cmp = cmp;

		const appnexus = new Appnexus({
			id: '123',
			size: [234, 789],
		}, {});
		appnexus.getConsent(() => {});

		expect(tcfapi.mock.calls.length).to.equal(1);
		expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
		expect(tcfapi.mock.calls[0][1]).to.equal(2);
		expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

		expect(cmp.mock.calls.length).to.equal(1);
		expect(cmp.mock.calls[0][0]).to.equal('getConsentData');
		expect(cmp.mock.calls[0][1]).to.equal(null);
		expect(typeof(cmp.mock.calls[0][2])).to.equal('function');
	});
});
