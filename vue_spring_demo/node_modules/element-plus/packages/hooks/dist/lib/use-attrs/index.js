"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const fromPairs_1 = __importDefault(require("lodash/fromPairs"));
const error_1 = require("element-plus/lib/utils/error");
const DEFAULT_EXCLUDE_KEYS = ['class', 'style'];
const LISTENER_PREFIX = /^on[A-Z]/;
exports.default = (params = {}) => {
    const { excludeListeners = false, excludeKeys = [] } = params;
    const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
    const instance = (0, vue_1.getCurrentInstance)();
    if (!instance) {
        (0, error_1.debugWarn)('use-attrs', 'getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function');
        return (0, vue_1.computed)(() => ({}));
    }
    return (0, vue_1.computed)(() => {
        var _a;
        return (0, fromPairs_1.default)(Object.entries((_a = instance.proxy) === null || _a === void 0 ? void 0 : _a.$attrs).filter(([key]) => !allExcludeKeys.includes(key) &&
            !(excludeListeners && LISTENER_PREFIX.test(key))));
    });
};
