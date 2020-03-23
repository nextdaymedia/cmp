import { expect } from 'chai';
import NDMTag from './ndmtag';
import log from './log';

describe('ndmtag', () => {
	it('can display a tag', () => {
		document.body.innerHTML = `<div id="test-id">Hello world</div>`;

		const ndmTag = new NDMTag([]);
		ndmTag.defineAdSlot('test-id', {
			id: 123,
			type: 'appnexus',
			size: [234, 789],
		});
		const displayMock = jest.fn();
		ndmTag.adSlots['test-id'].display = displayMock;

		ndmTag.display('test-id');

		expect(displayMock.mock.calls.length).to.equal(1);
	});

	it('can clear a tag', () => {
		document.body.innerHTML = `<div id="test-id"><p>1</p><p>2</p><p>3</p></div>`;

		const ndmTag = new NDMTag([]);
		const lazyLoaderRemoveMock = jest.fn();
		ndmTag.lazyLoader = {remove: lazyLoaderRemoveMock};

		ndmTag.clear('test-id');

		expect(lazyLoaderRemoveMock.mock.calls.length).to.equal(1);
		expect(lazyLoaderRemoveMock.mock.calls[0][0]).to.equal('test-id');
		expect(document.getElementById('test-id').childElementCount).to.equal(0);
	});

	it('cannot clear a tag that does not exist', () => {
		log.logLevel = false;
		document.body.innerHTML = `<div id="test-id"><p>1</p><p>2</p><p>3</p></div>`;

		const ndmTag = new NDMTag([]);
		const lazyLoaderRemoveMock = jest.fn();
		ndmTag.lazyLoader = {remove: lazyLoaderRemoveMock};

		ndmTag.clear('test-id-not-found');

		expect(lazyLoaderRemoveMock.mock.calls.length).to.equal(0);
		expect(document.getElementById('test-id').childElementCount).to.equal(3);
	});

	it('can refresh a tag', () => {
		const ndmTag = new NDMTag([]);
		const clearMock = jest.fn();
		const displayMock = jest.fn();
		ndmTag.clear = clearMock;
		ndmTag.display = displayMock;

		ndmTag.refresh('test-id');

		expect(clearMock.mock.calls.length).to.equal(1);
		expect(clearMock.mock.calls[0][0]).to.equal('test-id');
		expect(displayMock.mock.calls.length).to.equal(1);
		expect(displayMock.mock.calls[0][0]).to.equal('test-id');
	});

	it('can precess commands', () => {
		const commandMock = jest.fn();
		const ndmTag = new NDMTag([commandMock, commandMock]);

		expect(ndmTag.queuedCommands.length).to.equal(2);

		ndmTag.processCommands();

		expect(typeof ndmTag.queuedCommands).to.equal('undefined');
		expect(commandMock.mock.calls.length).to.equal(2);
	});
});
