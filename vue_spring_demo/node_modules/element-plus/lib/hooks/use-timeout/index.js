"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
function default_1() {
    let timeoutHandle;
    (0, vue_1.onBeforeUnmount)(() => {
        clearTimeout(timeoutHandle);
    });
    return {
        registerTimeout: (fn, delay) => {
            clearTimeout(timeoutHandle);
            timeoutHandle = setTimeout(fn, delay);
        },
        cancelTimeout: () => {
            clearTimeout(timeoutHandle);
        },
    };
}
exports.default = default_1;
