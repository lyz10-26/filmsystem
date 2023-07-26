"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("element-plus/lib/utils/dom");
exports.default = {
    beforeMount(el, binding) {
        let interval = null;
        let startTime;
        const handler = () => binding.value && binding.value();
        const clear = () => {
            if (Date.now() - startTime < 100) {
                handler();
            }
            clearInterval(interval);
            interval = null;
        };
        (0, dom_1.on)(el, 'mousedown', (e) => {
            if (e.button !== 0)
                return;
            startTime = Date.now();
            (0, dom_1.once)(document, 'mouseup', clear);
            clearInterval(interval);
            interval = setInterval(handler, 100);
        });
    },
};
