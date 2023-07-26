"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const dom_1 = require("element-plus/lib/utils/dom");
exports.default = (indicator, evt, cb) => {
    const prevent = (e) => {
        if (cb(e)) {
            e.stopImmediatePropagation();
        }
    };
    (0, vue_1.watch)(() => indicator.value, (val) => {
        if (val) {
            (0, dom_1.on)(document, evt, prevent, true);
        }
        else {
            (0, dom_1.off)(document, evt, prevent, true);
        }
    }, { immediate: true });
};
