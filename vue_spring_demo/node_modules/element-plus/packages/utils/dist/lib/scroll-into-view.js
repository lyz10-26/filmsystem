"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isServer_1 = __importDefault(require("./isServer"));
function scrollIntoView(container, selected) {
    if (isServer_1.default)
        return;
    if (!selected) {
        container.scrollTop = 0;
        return;
    }
    const offsetParents = [];
    let pointer = selected.offsetParent;
    while (pointer !== null &&
        container !== pointer &&
        container.contains(pointer)) {
        offsetParents.push(pointer);
        pointer = pointer.offsetParent;
    }
    const top = selected.offsetTop +
        offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0);
    const bottom = top + selected.offsetHeight;
    const viewRectTop = container.scrollTop;
    const viewRectBottom = viewRectTop + container.clientHeight;
    if (top < viewRectTop) {
        container.scrollTop = top;
    }
    else if (bottom > viewRectBottom) {
        container.scrollTop = bottom - container.clientHeight;
    }
}
exports.default = scrollIntoView;
