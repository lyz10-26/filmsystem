"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
function default_1(loading, throttle = 0) {
    if (throttle === 0)
        return loading;
    const throttled = (0, vue_1.ref)(false);
    let timeoutHandle = 0;
    const dispatchThrottling = () => {
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
        }
        timeoutHandle = window.setTimeout(() => {
            throttled.value = loading.value;
        }, throttle);
    };
    (0, vue_1.onMounted)(dispatchThrottling);
    (0, vue_1.watch)(() => loading.value, (val) => {
        if (val) {
            dispatchThrottling();
        }
        else {
            throttled.value = val;
        }
    });
    return throttled;
}
exports.default = default_1;
