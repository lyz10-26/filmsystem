import { watch } from 'vue';
import { on, off } from 'element-plus/es/utils/dom';
export default (indicator, evt, cb) => {
    const prevent = (e) => {
        if (cb(e)) {
            e.stopImmediatePropagation();
        }
    };
    watch(() => indicator.value, (val) => {
        if (val) {
            on(document, evt, prevent, true);
        }
        else {
            off(document, evt, prevent, true);
        }
    }, { immediate: true });
};
