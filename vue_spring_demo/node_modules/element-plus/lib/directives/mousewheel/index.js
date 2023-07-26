"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_wheel_es_1 = __importDefault(require("normalize-wheel-es"));
const isFirefox = typeof navigator !== 'undefined' &&
    navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const mousewheel = function (element, callback) {
    if (element && element.addEventListener) {
        const fn = function (event) {
            const normalized = (0, normalize_wheel_es_1.default)(event);
            callback && callback.apply(this, [event, normalized]);
        };
        if (isFirefox) {
            element.addEventListener('DOMMouseScroll', fn);
        }
        else {
            element.onmousewheel = fn;
        }
    }
};
const Mousewheel = {
    beforeMount(el, binding) {
        mousewheel(el, binding.value);
    },
};
exports.default = Mousewheel;
