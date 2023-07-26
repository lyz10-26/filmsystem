import { getCurrentInstance, computed } from 'vue';
import fromPairs from 'lodash/fromPairs';
import { debugWarn } from 'element-plus/es/utils/error';
const DEFAULT_EXCLUDE_KEYS = ['class', 'style'];
const LISTENER_PREFIX = /^on[A-Z]/;
export default (params = {}) => {
    const { excludeListeners = false, excludeKeys = [] } = params;
    const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
    const instance = getCurrentInstance();
    if (!instance) {
        debugWarn('use-attrs', 'getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function');
        return computed(() => ({}));
    }
    return computed(() => {
        var _a;
        return fromPairs(Object.entries((_a = instance.proxy) === null || _a === void 0 ? void 0 : _a.$attrs).filter(([key]) => !allExcludeKeys.includes(key) &&
            !(excludeListeners && LISTENER_PREFIX.test(key))));
    });
};
