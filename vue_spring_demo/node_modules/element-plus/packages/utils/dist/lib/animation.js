"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easeInOutCubic = exports.cubic = void 0;
const cubic = (value) => Math.pow(value, 3);
exports.cubic = cubic;
const easeInOutCubic = (value) => value < 0.5 ? (0, exports.cubic)(value * 2) / 2 : 1 - (0, exports.cubic)((1 - value) * 2) / 2;
exports.easeInOutCubic = easeInOutCubic;
