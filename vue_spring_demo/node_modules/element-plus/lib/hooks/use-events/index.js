"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const dom_1 = require("element-plus/lib/utils/dom");
exports.default = (el, events) => {
    (0, vue_1.watch)(el, (val) => {
        if (val) {
            events.forEach(({ name, handler }) => {
                (0, dom_1.on)(el.value, name, handler);
            });
        }
        else {
            events.forEach(({ name, handler }) => {
                (0, dom_1.off)(el.value, name, handler);
            });
        }
    });
};
