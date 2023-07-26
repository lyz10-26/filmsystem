import isServer from './isServer';
let scrollBarWidth;
export default function () {
    var _a;
    if (isServer)
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
