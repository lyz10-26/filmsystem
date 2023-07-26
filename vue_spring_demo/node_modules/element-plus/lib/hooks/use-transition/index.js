"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransition = exports.useTransitionProps = void 0;
const vue_1 = require("vue");
exports.useTransitionProps = {
    transitionDuration: {
        type: Number,
        default: 0.3,
    },
    transitionShow: String,
    transitionHide: String,
};
const useTransition = (props, indicator) => {
    const transitionState = (0, vue_1.ref)(indicator.value);
    (0, vue_1.watch)(indicator, (val) => {
        (0, vue_1.nextTick)(() => (transitionState.value = val));
    });
    return {
        transition: (0, vue_1.computed)(() => {
            return `el-transition--${transitionState.value ? props.transitionShow : props.transitionHide}`;
        }),
        transitionStyle: (0, vue_1.computed)(() => `--el-transition-duration: ${props.transitionDuration}s`),
    };
};
exports.useTransition = useTransition;
