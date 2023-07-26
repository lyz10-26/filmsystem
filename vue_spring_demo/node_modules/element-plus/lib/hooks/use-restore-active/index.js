"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (toggle, initialFocus) => {
    let previousActive;
    (0, vue_1.watch)(() => toggle.value, (val) => {
        var _a, _b;
        if (val) {
            previousActive = document.activeElement;
            if ((0, vue_1.isRef)(initialFocus)) {
                (_b = (_a = initialFocus.value).focus) === null || _b === void 0 ? void 0 : _b.call(_a);
            }
        }
        else {
            if (process.env.NODE_ENV === 'testing') {
                previousActive.focus.call(previousActive);
            }
            else {
                previousActive.focus();
            }
        }
    });
};
