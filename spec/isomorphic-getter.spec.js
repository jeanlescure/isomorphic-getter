import isoGetter from '../lib';

describe('IsomorphicGetter', () => {
	it('loads files locally when server-side', () => {
		expect(typeof isoGetter.fileRead('./fixtures/dummy.styles.css')).toEqual('string');
	});
});