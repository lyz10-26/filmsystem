import { watch, isRef, onMounted, computed, unref, inject, onUnmounted, provide, ref, } from 'vue';
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
export const themeVarsKey = 'themeVars';
export function useCssVar(vars, target) {
    let stopWatchCssVar = null;
    const elRef = computed(() => { var _a; return unref(target) || ((_a = window === null || window === void 0 ? void 0 : window.document) === null || _a === void 0 ? void 0 : _a.documentElement); });
    const themeVars = useThemeVars();
    const customVars = Object.assign(Object.assign({}, themeVars), unref(vars));
    provide(themeVarsKey, ref(customVars));
    onMounted(() => {
        isRef(vars)
            ? (stopWatchCssVar = watch(vars, (val) => {
                setVars(elRef.value, Object.assign(Object.assign({}, unref(themeVars)), val));
            }, {
                immediate: true,
                deep: true,
            }))
            : setVars(elRef.value, Object.assign(Object.assign({}, unref(themeVars)), vars));
    });
    onUnmounted(() => stopWatchCssVar && stopWatchCssVar());
}
export const useThemeVars = () => {
    const themeVars = inject(themeVarsKey, {});
    return themeVars;
};
