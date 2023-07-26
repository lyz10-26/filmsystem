"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeVars = exports.useCssVar = exports.themeVarsKey = void 0;
const vue_1 = require("vue");
const VAR_PREFIX = '--el-';
const setVars = (target, val) => {
    Object.keys(val).forEach((key) => {
        if (key.startsWith(VAR_PREFIX)) {
            target === null || target === void 0 ? void 0 : target.style.setProperty(key, val[key]);
        }
        else {
            target === null || target === void 0 ? void 0 : target.style.setProperty(VAR_PREFIX + key, val[key]);
        }
    });
};
exports.themeVarsKey = 'themeVars';
function useCssVar(vars, target) {
    let stopWatchCssVar = null;
    const elRef = (0, vue_1.computed)(() => { var _a; return (0, vue_1.unref)(target) || ((_a = window === null || window === void 0 ? void 0 : window.document) === null || _a === void 0 ? void 0 : _a.documentElement); });
    const themeVars = (0, exports.useThemeVars)();
    const customVars = Object.assign(Object.assign({}, themeVars), (0, vue_1.unref)(vars));
    (0, vue_1.provide)(exports.themeVarsKey, (0, vue_1.ref)(customVars));
    (0, vue_1.onMounted)(() => {
        (0, vue_1.isRef)(vars)
            ? (stopWatchCssVar = (0, vue_1.watch)(vars, (val) => {
                setVars(elRef.value, Object.assign(Object.assign({}, (0, vue_1.unref)(themeVars)), val));
            }, {
                immediate: true,
                deep: true,
            }))
            : setVars(elRef.value, Object.assign(Object.assign({}, (0, vue_1.unref)(themeVars)), vars));
    });
    (0, vue_1.onUnmounted)(() => stopWatchCssVar && stopWatchCssVar());
}
exports.useCssVar = useCssVar;
const useThemeVars = () => {
    const themeVars = (0, vue_1.inject)(exports.themeVarsKey, {});
    return themeVars;
};
exports.useThemeVars = useThemeVars;
