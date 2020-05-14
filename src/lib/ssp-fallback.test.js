import { expect } from 'chai';
import listener from './ssp-fallback';

describe('ssp-fallback', () => {
	it('closes if type is unknown', () => {
		document.body.innerHTML = `<div id="test-id">Hello world</div>`;
		listener({
			origin: 'https://cmp.nextday.media',
			data: {
				container_id: 'test-id',
				type: 'foo',
			},
		});

		const div = document.getElementById('test-id');
		expect(div.style.display).to.equal('none');
	});

	it('closes if type if close', () => {
		document.body.innerHTML = `<div id="test-id">Hello world</div>`;
		listener({
			origin: 'https://cmp.nextday.media',
			data: {
				container_id: 'test-id',
				type: 'close',
			},
		});

		const div = document.getElementById('test-id');
		expect(div.style.display).to.equal('none');
	});

	it('closes if response is empty', () => {
		document.body.innerHTML = `<div id="test-id">Hello world</div>`;
		const xhrMock = {
			open: jest.fn(),
			send: jest.fn(),
		};
		window.XMLHttpRequest = jest.fn(() => xhrMock);

		listener({
			origin: 'https://cmp.nextday.media',
			data: {
				container_id: 'test-id',
				type: 'script',
				script_url: 'https://fallback.nextday.media',
			},
		});

		const onreadystatechange = xhrMock.onreadystatechange.bind({
			readyState: 4,
			status: 200,
			responseText: '',
		});
		onreadystatechange();

		const div = document.getElementById('test-id');
		expect(div.style.display).to.equal('none');
	});
});
