import fs from 'fs';
import path from 'path';

class IsomorphicGetter {
	constructor() {
		this.fileRead = (style_path, depth) => {
			depth = (!depth || isNaN(depth))? 1 : ( (depth > stack.length - 2)? stack.length - 2 : depth );
			
			const local_root = path.dirname(_getCallerFile(depth));
			const local_style_path = style_path.replace(/^\.\//, '/');

			return fs.readFileSync(local_root + local_style_path, 'utf8').toString();
		};

		function _getCallerFile(depth) {
	    var pst, stack, file, frame;

	    pst = Error.prepareStackTrace;
	    Error.prepareStackTrace = function (_, stack) {
	        Error.prepareStackTrace = pst;
	        return stack;
	    };

	    stack = (new Error()).stack;
	    stack = stack.slice(depth + 1);

	    do {
	        frame = stack.shift();
	        file = frame && frame.getFileName();
	    } while (stack.length && file === 'module.js');

	    return file;
		}
	}
}

export default new IsomorphicGetter();