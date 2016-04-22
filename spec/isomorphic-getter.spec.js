import isoGetter from '../lib';

describe('IsomorphicGetter', () => {
	it('loads files locally when server-side', () => {
		expect(typeof isoGetter.fileRead('./fixtures/dummy.styles.css')).toEqual('string');
	});

	it('loads requires files when browser', () => {
		// This should fail specifically because only Webpack (or else) setup with the
		// correct loaders for the file in question should be able to read it.

		// In this case we're getting a Syntax error because Node can't read css files.

		// We're also checking error displays correct path to file based on this file
		// being the isoGetter's `parent`.
		expect(() => {isoGetter.fileRequire('./fixtures/dummy.styles.css')})
			.toThrowError(/^(?=.*\b\/spec\/fixtures\/dummy\.styles\.css\b)(?=.*\btoken \(1\:0\)).*$/g);
	});
});