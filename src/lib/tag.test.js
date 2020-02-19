import { expect } from 'chai';
import Tag from './tag';
import NDMTag from './ndmtag';

describe('tag', () => {
	it('should render', () => {
		const options = {
			id: 'foo',
			name: 'foo',
		};
		const ndmTag = new NDMTag();
		const tag = new Tag(options, ndmTag);
		tag.render();
	});

	it('should display directly when not using lazy loading', () => {
		const options = {
			id: 'foo',
			name: 'foo',
			lazy: false,
		};

		const lazyLoaderAddMock = jest.fn();
		const ndmTag = new NDMTag();
		ndmTag.lazyLoader = {add: lazyLoaderAddMock};
		const tag = new Tag(options, ndmTag);
		const doDisplayMock = jest.fn();
		tag.doDisplay = doDisplayMock;
		tag.display();

		expect(doDisplayMock.mock.calls.length).to.equal(1);
		expect(lazyLoaderAddMock.mock.calls.length).to.equal(0);
	});

	it('should not display directly when using lazy loading', () => {
		const options = {
			id: 'foo',
			name: 'foo',
			lazy: true,
		};

		const lazyLoaderAddMock = jest.fn();
		const ndmTag = new NDMTag();
		ndmTag.lazyLoader = {add: lazyLoaderAddMock};
		const tag = new Tag(options, ndmTag);
		const doDisplayMock = jest.fn();
		tag.doDisplay = doDisplayMock;
		tag.display();

		expect(doDisplayMock.mock.calls.length).to.equal(0);
		expect(lazyLoaderAddMock.mock.calls.length).to.equal(1);
		expect(lazyLoaderAddMock.mock.calls[0][0]).to.equal('foo');
	});
});
