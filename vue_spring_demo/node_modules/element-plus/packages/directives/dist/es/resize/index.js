import { addResizeListener, removeResizeListener, } from 'element-plus/es/utils/resize-event';
const Resize = {
    beforeMount(el, binding) {
        el._handleResize = () => {
            var _a;
            el && ((_a = binding.value) === null || _a === void 0 ? void 0 : _a.call(binding, el));
        };
        addResizeListener(el, el._handleResize);
    },
    beforeUnmount(el) {
        removeResizeListener(el, el._handleResize);
    },
};
export default Resize;
