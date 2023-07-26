'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var installer = require('./defaults');
var components = require('element-plus/lib/components');
var directives = require('element-plus/lib/directives');
var hooks = require('element-plus/lib/hooks');
var tokens = require('element-plus/lib/tokens');
var makeInstaller = require('./make-installer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var installer__default = /*#__PURE__*/_interopDefaultLegacy(installer);
var makeInstaller__default = /*#__PURE__*/_interopDefaultLegacy(makeInstaller);

const install = installer__default["default"].install;
const version = installer__default["default"].version;

Object.defineProperty(exports, 'default', {
	enumerable: true,
	get: function () { return installer__default["default"]; }
});
Object.defineProperty(exports, 'makeInstaller', {
	enumerable: true,
	get: function () { return makeInstaller__default["default"]; }
});
exports.install = install;
exports.version = version;
Object.keys(components).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return components[k]; }
	});
});
Object.keys(directives).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return directives[k]; }
	});
});
Object.keys(hooks).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return hooks[k]; }
	});
});
Object.keys(tokens).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return tokens[k]; }
	});
});
