"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resize_event_1 = require("element-plus/lib/utils/resize-event");
const Resize = {
    beforeMount(el, binding) {
        el._handleResize = () => {
            var _a;
            el && ((_a = binding.value) === null || _a === void 0 ? void 0 : _a.call(binding, el));
        };
        (0, resize_event_1.addResizeListener)(el, el._handleResize);
    },
    beforeUnmount(el) {
        (0, resize_event_1.removeResizeListener)(el, el._handleResize);
    },
};
exports.default = Resize;
