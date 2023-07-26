import { isRef, watch } from 'vue';
export default (toggle, initialFocus) => {
    let previousActive;
    watch(() => toggle.value, (val) => {
        var _a, _b;
        if (val) {
            previousActive = document.activeElement;
            if (isRef(initialFocus)) {
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
