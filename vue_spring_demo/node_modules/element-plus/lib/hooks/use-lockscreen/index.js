"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const scrollbar_width_1 = __importDefault(require("element-plus/lib/utils/scrollbar-width"));
const error_1 = require("element-plus/lib/utils/error");
const dom_1 = require("element-plus/lib/utils/dom");
exports.default = (trigger) => {
    if (!(0, vue_1.isRef)(trigger)) {
        (0, error_1.throwError)('[useLockScreen]', 'You need to pass a ref param to this function');
    }
    let scrollBarWidth = 0;
    let withoutHiddenClass = false;
    let bodyPaddingRight = '0';
    let computedBodyPaddingRight = 0;
    (0, vue_1.onUnmounted)(() => {
        cleanup();
    });
    const cleanup = () => {
        (0, dom_1.removeClass)(document.body, 'el-popup-parent--hidden');
        if (withoutHiddenClass) {
            document.body.style.paddingRight = bodyPaddingRight;
        }
    };
    (0, vue_1.watch)(trigger, (val) => {
        if (val) {
            withoutHiddenClass = !(0, dom_1.hasClass)(document.body, 'el-popup-parent--hidden');
            if (withoutHiddenClass) {
                bodyPaddingRight = document.body.style.paddingRight;
                computedBodyPaddingRight = parseInt((0, dom_1.getStyle)(document.body, 'paddingRight'), 10);
            }
            scrollBarWidth = (0, scrollbar_width_1.default)();
            const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
            const bodyOverflowY = (0, dom_1.getStyle)(document.body, 'overflowY');
            if (scrollBarWidth > 0 &&
                (bodyHasOverflow || bodyOverflowY === 'scroll') &&
                withoutHiddenClass) {
                document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarWidth}px`;
            }
            (0, dom_1.addClass)(document.body, 'el-popup-parent--hidden');
        }
        else {
            cleanup();
        }
    });
};
