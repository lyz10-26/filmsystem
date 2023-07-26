"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isServer_1 = __importDefault(require("./isServer"));
let scrollBarWidth;
function default_1() {
    var _a;
    if (isServer_1.default)
        return 0;
    if (scrollBarWidth !== undefined)
        return scrollBarWidth;
    const outer = document.createElement('div');
    outer.className = 'el-scrollbar__wrap';
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';
    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    (_a = outer.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(outer);
    scrollBarWidth = widthNoScroll - widthWithScroll;
    return scrollBarWidth;
}
exports.default = default_1;
