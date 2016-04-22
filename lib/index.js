'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IsomorphicGetter = function IsomorphicGetter() {
	_classCallCheck(this, IsomorphicGetter);

	this.fileRead = function (style_path, depth) {
		depth = _fixDepth(depth);

		var local_root = _path2.default.dirname(_getCallerFile(depth));
		var local_style_path = style_path.replace(/^\.\//, '/');

		return _fs2.default.readFileSync(local_root + local_style_path, 'utf8').toString();
	};

	this.fileRequire = function (style_path, depth) {
		depth = _fixDepth(depth);

		var parent = module.parent;

		for (var i = depth; i > 1; i--) {
			parent = parent.parent;
		}

		return function () {
			return parent.require(style_path);
		}();
	};

	function _fixDepth(depth) {
		return !depth || isNaN(depth) ? 1 : depth > stack.length - 2 ? stack.length - 2 : depth;
	}

	function _getCallerFile(depth) {
		var pst, stack, file, frame;

		pst = Error.prepareStackTrace;
		Error.prepareStackTrace = function (_, stack) {
			Error.prepareStackTrace = pst;
			return stack;
		};

		stack = new Error().stack;
		stack = stack.slice(depth + 1);

		do {
			frame = stack.shift();
			file = frame && frame.getFileName();
		} while (stack.length && file === 'module.js');

		return file;
	}
};

exports.default = new IsomorphicGetter();