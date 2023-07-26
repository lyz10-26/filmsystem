"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (el) => {
    return {
        focus: () => {
            var _a, _b;
            (_b = (_a = el.value) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
        },
    };
};
