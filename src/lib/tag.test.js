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
});