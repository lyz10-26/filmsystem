"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSameTarget = void 0;
const shared_1 = require("@vue/shared");
const useSameTarget = (handleClick) => {
    if (!handleClick) {
        return { onClick: shared_1.NOOP, onMousedown: shared_1.NOOP, onMouseup: shared_1.NOOP };
    }
    let mousedownTarget = false;
    let mouseupTarget = false;
    const onClick = (e) => {
        if (mousedownTarget && mouseupTarget) {
            handleClick(e);
        }
        mousedownTarget = mouseupTarget = false;
    };
    const onMousedown = (e) => {
        mousedownTarget = e.target === e.currentTarget;
    };
    const onMouseup = (e) => {
        mouseupTarget = e.target === e.currentTarget;
    };
    return { onClick, onMousedown, onMouseup };
};
exports.useSameTarget = useSameTarget;
