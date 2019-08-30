import { expect } from 'chai';
import NDMTag from './ndmtag';

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
});
