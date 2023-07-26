"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cAF = exports.rAF = void 0;
const isServer_1 = __importDefault(require("./isServer"));
let rAF = (fn) => setTimeout(fn, 16);
exports.rAF = rAF;
let cAF = (handle) => clearTimeout(handle);
exports.cAF = cAF;
if (!isServer_1.default) {
    exports.rAF = rAF = (fn) => window.requestAnimationFrame(fn);
    exports.cAF = cAF = (handle) => window.cancelAnimationFrame(handle);
}
