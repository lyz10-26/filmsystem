'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var makeInstaller = require('./make-installer');
var Components = require('./component');
var Plugins = require('./plugin');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var makeInstaller__default = /*#__PURE__*/_interopDefaultLegacy(makeInstaller);
var Components__default = /*#__PURE__*/_interopDefaultLegacy(Components);
var Plugins__default = /*#__PURE__*/_interopDefaultLegacy(Plugins);

var defaults = makeInstaller__default["default"]([...Components__default["default"], ...Plugins__default["default"]]);

exports["default"] = defaults;
