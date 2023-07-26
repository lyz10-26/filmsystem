"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRAP_FOCUS_HANDLER = exports.FOCUSABLE_CHILDREN = void 0;
const vue_1 = require("vue");
const dom_1 = require("element-plus/lib/utils/dom");
const aria_1 = require("element-plus/lib/utils/aria");
exports.FOCUSABLE_CHILDREN = '_trap-focus-children';
exports.TRAP_FOCUS_HANDLER = '_trap-focus-handler';
const FOCUS_STACK = [];
const FOCUS_HANDLER = (e) => {
    var _a;
    if (FOCUS_STACK.length === 0)
        return;
    const focusableElement = FOCUS_STACK[FOCUS_STACK.length - 1][exports.FOCUSABLE_CHILDREN];
    if (focusableElement.length > 0 && e.code === aria_1.EVENT_CODE.tab) {
        if (focusableElement.length === 1) {
            e.preventDefault();
            if (document.activeElement !== focusableElement[0]) {
                focusableElement[0].focus();
            }
            return;
        }
        const goingBackward = e.shiftKey;
        const isFirst = e.target === focusableElement[0];
        const isLast = e.target === focusableElement[focusableElement.length - 1];
        if (isFirst && goingBackward) {
            e.preventDefault();
            focusableElement[focusableElement.length - 1].focus();
        }
        if (isLast && !goingBackward) {
            e.preventDefault();
            focusableElement[0].focus();
        }
        if (process.env.NODE_ENV === 'test') {
            const index = focusableElement.findIndex((element) => element === e.target);
            if (index !== -1) {
                (_a = focusableElement[goingBackward ? index - 1 : index + 1]) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }
    }
};
const TrapFocus = {
    beforeMount(el) {
        el[exports.FOCUSABLE_CHILDREN] = (0, aria_1.obtainAllFocusableElements)(el);
        FOCUS_STACK.push(el);
        if (FOCUS_STACK.length <= 1) {
            (0, dom_1.on)(document, 'keydown', FOCUS_HANDLER);
        }
    },
    updated(el) {
        (0, vue_1.nextTick)(() => {
            el[exports.FOCUSABLE_CHILDREN] = (0, aria_1.obtainAllFocusableElements)(el);
        });
    },
    unmounted() {
        FOCUS_STACK.shift();
        if (FOCUS_STACK.length === 0) {
            (0, dom_1.off)(document, 'keydown', FOCUS_HANDLER);
        }
    },
};
exports.default = TrapFocus;
