"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeResizeListener = exports.addResizeListener = void 0;
const resize_observer_polyfill_1 = __importDefault(require("resize-observer-polyfill"));
const isServer_1 = __importDefault(require("./isServer"));
const resizeHandler = function (entries) {
    for (const entry of entries) {
        const listeners = entry.target.__resizeListeners__ || [];
        if (listeners.length) {
            listeners.forEach((fn) => {
                fn();
            });
        }
    }
};
const addResizeListener = function (element, fn) {
    if (isServer_1.default || !element)
        return;
    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = [];
        element.__ro__ = new resize_observer_polyfill_1.default(resizeHandler);
        element.__ro__.observe(element);
    }
    element.__resizeListeners__.push(fn);
};
exports.addResizeListener = addResizeListener;
const removeResizeListener = function (element, fn) {
    var _a;
    if (!element || !element.__resizeListeners__)
        return;
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
        (_a = element.__ro__) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
};
exports.removeResizeListener = removeResizeListener;
