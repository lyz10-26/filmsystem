'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var util = require('element-plus/lib/utils/util');
var error = require('element-plus/lib/utils/error');
var vue = require('vue');
var shared = require('@vue/shared');
var isServer = require('element-plus/lib/utils/isServer');
var memo = require('lodash/memoize');
var memoOne = require('memoize-one');
var raf = require('element-plus/lib/utils/raf');
var scrollbar = require('element-plus/lib/components/scrollbar');
var dom = require('element-plus/lib/utils/dom');
var props = require('element-plus/lib/utils/props');
var getScrollBarWidth = require('element-plus/lib/utils/scrollbar-width');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);
var memo__default = /*#__PURE__*/_interopDefaultLegacy(memo);
var memoOne__default = /*#__PURE__*/_interopDefaultLegacy(memoOne);
var getScrollBarWidth__default = /*#__PURE__*/_interopDefaultLegacy(getScrollBarWidth);

const useCache = () => {
  const vm = vue.getCurrentInstance();
  const props = vm.proxy.$props;
  return vue.computed(() => {
    const _getItemStyleCache = (_, __, ___) => ({});
    return props.perfMode ? memo__default["default"](_getItemStyleCache) : memoOne__default["default"](_getItemStyleCache);
  });
};

const DEFAULT_DYNAMIC_LIST_ITEM_SIZE = 50;
const ITEM_RENDER_EVT = "item-rendered";
const SCROLL_EVT = "scroll";
const FORWARD = "forward";
const BACKWARD = "backward";
const AUTO_ALIGNMENT = "auto";
const SMART_ALIGNMENT = "smart";
const START_ALIGNMENT = "start";
const CENTERED_ALIGNMENT = "center";
const END_ALIGNMENT = "end";
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";
const LTR = "ltr";
const RTL = "rtl";
const RTL_OFFSET_NAG = "negative";
const RTL_OFFSET_POS_ASC = "positive-ascending";
const RTL_OFFSET_POS_DESC = "positive-descending";
const ScrollbarDirKey = {
  [HORIZONTAL]: "left",
  [VERTICAL]: "top"
};
const SCROLLBAR_MIN_SIZE = 20;

const getScrollDir = (prev, cur) => prev < cur ? FORWARD : BACKWARD;
const isHorizontal = (dir) => dir === LTR || dir === RTL || dir === HORIZONTAL;
const isRTL = (dir) => dir === RTL;
let cachedRTLResult = null;
function getRTLOffsetType(recalculate = false) {
  if (cachedRTLResult === null || recalculate) {
    const outerDiv = document.createElement("div");
    const outerStyle = outerDiv.style;
    outerStyle.width = "50px";
    outerStyle.height = "50px";
    outerStyle.overflow = "scroll";
    outerStyle.direction = "rtl";
    const innerDiv = document.createElement("div");
    const innerStyle = innerDiv.style;
    innerStyle.width = "100px";
    innerStyle.height = "100px";
    outerDiv.appendChild(innerDiv);
    document.body.appendChild(outerDiv);
    if (outerDiv.scrollLeft > 0) {
      cachedRTLResult = RTL_OFFSET_POS_DESC;
    } else {
      outerDiv.scrollLeft = 1;
      if (outerDiv.scrollLeft === 0) {
        cachedRTLResult = RTL_OFFSET_NAG;
      } else {
        cachedRTLResult = RTL_OFFSET_POS_ASC;
      }
    }
    document.body.removeChild(outerDiv);
    return cachedRTLResult;
  }
  return cachedRTLResult;
}
function renderThumbStyle({ move, size, bar }, layout) {
  const style = {};
  const translate = `translate${bar.axis}(${move}px)`;
  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.webkitTransform = translate;
  if (layout === "horizontal") {
    style.height = "100%";
  } else {
    style.width = "100%";
  }
  return style;
}
const isFF = typeof navigator !== "undefined" && shared.isObject(navigator) && /Firefox/i.test(navigator.userAgent);

const LayoutKeys = {
  [HORIZONTAL]: "deltaX",
  [VERTICAL]: "deltaY"
};
const useWheel = ({ atEndEdge, atStartEdge, layout }, onWheelDelta) => {
  let frameHandle;
  let offset = 0;
  const hasReachedEdge = (offset2) => {
    const edgeReached = offset2 < 0 && atStartEdge.value || offset2 > 0 && atEndEdge.value;
    return edgeReached;
  };
  const onWheel = (e) => {
    raf.cAF(frameHandle);
    const newOffset = e[LayoutKeys[layout.value]];
    if (hasReachedEdge(offset) && hasReachedEdge(offset + newOffset))
      return;
    offset += newOffset;
    if (!isFF) {
      e.preventDefault();
    }
    frameHandle = raf.rAF(() => {
      onWheelDelta(offset);
      offset = 0;
    });
  };
  return {
    hasReachedEdge,
    onWheel
  };
};

var __defProp$3 = Object.defineProperty;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
const itemSize = props.buildProp({
  type: props.definePropType([Number, Function]),
  required: true
});
const estimatedItemSize = props.buildProp({
  type: Number
});
const cache = props.buildProp({
  type: Number,
  default: 2
});
const direction = props.buildProp({
  type: String,
  values: ["ltr", "rtl"],
  default: "ltr"
});
const initScrollOffset = props.buildProp({
  type: Number,
  default: 0
});
const total = props.buildProp({
  type: Number,
  required: true
});
const layout = props.buildProp({
  type: String,
  values: ["horizontal", "vertical"],
  default: VERTICAL
});
const virtualizedProps = props.buildProps({
  className: {
    type: String,
    default: ""
  },
  containerElement: {
    type: props.definePropType([String, Object]),
    default: "div"
  },
  data: {
    type: props.definePropType(Array),
    default: () => props.mutable([])
  },
  direction,
  height: {
    type: [String, Number],
    required: true
  },
  innerElement: {
    type: [String, Object],
    default: "div"
  },
  style: {
    type: props.definePropType([Object, String, Array])
  },
  useIsScrolling: {
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String],
    required: true
  },
  perfMode: {
    type: Boolean,
    default: true
  }
});
const virtualizedListProps = props.buildProps(__spreadValues$3({
  cache,
  estimatedItemSize,
  layout,
  initScrollOffset,
  total,
  itemSize
}, virtualizedProps));
const virtualizedGridProps = props.buildProps(__spreadValues$3({
  columnCache: cache,
  columnWidth: itemSize,
  estimatedColumnWidth: estimatedItemSize,
  estimatedRowHeight: estimatedItemSize,
  initScrollLeft: initScrollOffset,
  initScrollTop: initScrollOffset,
  rowCache: cache,
  rowHeight: itemSize,
  totalColumn: total,
  totalRow: total
}, virtualizedProps));
const virtualizedScrollbarProps = props.buildProps({
  layout,
  total,
  ratio: {
    type: Number,
    required: true
  },
  clientSize: {
    type: Number,
    required: true
  },
  scrollFrom: {
    type: Number,
    required: true
  },
  visible: Boolean
});

var __defProp$2 = Object.defineProperty;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
const ScrollBar = vue.defineComponent({
  name: "ElVirtualScrollBar",
  props: virtualizedScrollbarProps,
  emits: ["scroll", "start-move", "stop-move"],
  setup(props, { emit }) {
    const GAP = 4;
    const trackRef = vue.ref();
    const thumbRef = vue.ref();
    let frameHandle = null;
    let onselectstartStore = null;
    const state = vue.reactive({
      isDragging: false,
      traveled: 0
    });
    const bar = vue.computed(() => scrollbar.BAR_MAP[props.layout]);
    const trackSize = vue.computed(() => props.clientSize - GAP);
    const trackStyle = vue.computed(() => __spreadValues$2({
      position: "absolute",
      width: HORIZONTAL === props.layout ? `${trackSize.value}px` : "6px",
      height: HORIZONTAL === props.layout ? "6px" : `${trackSize.value}px`,
      [ScrollbarDirKey[props.layout]]: "2px",
      right: "2px",
      bottom: "2px",
      borderRadius: "4px"
    }, props.visible ? {} : { display: "none" }));
    const thumbSize = vue.computed(() => {
      const ratio = props.ratio;
      const clientSize = props.clientSize;
      if (ratio >= 100) {
        return Number.POSITIVE_INFINITY;
      }
      if (ratio >= 50) {
        return ratio * clientSize / 100;
      }
      const SCROLLBAR_MAX_SIZE = clientSize / 3;
      return Math.floor(Math.min(Math.max(ratio * clientSize, SCROLLBAR_MIN_SIZE), SCROLLBAR_MAX_SIZE));
    });
    const thumbStyle = vue.computed(() => {
      if (!Number.isFinite(thumbSize.value)) {
        return {
          display: "none"
        };
      }
      const thumb = `${thumbSize.value}px`;
      const style = renderThumbStyle({
        bar: bar.value,
        size: thumb,
        move: state.traveled
      }, props.layout);
      return style;
    });
    const totalSteps = vue.computed(() => Math.floor(props.clientSize - thumbSize.value - GAP));
    const attachEvents = () => {
      dom.on(window, "mousemove", onMouseMove);
      dom.on(window, "mouseup", onMouseUp);
      const thumbEl = vue.unref(thumbRef);
      if (!thumbEl)
        return;
      onselectstartStore = document.onselectstart;
      document.onselectstart = () => false;
      dom.on(thumbEl, "touchmove", onMouseMove);
      dom.on(thumbEl, "touchend", onMouseUp);
    };
    const detachEvents = () => {
      dom.off(window, "mousemove", onMouseMove);
      dom.off(window, "mouseup", onMouseUp);
      document.onselectstart = onselectstartStore;
      onselectstartStore = null;
      const thumbEl = vue.unref(thumbRef);
      if (!thumbEl)
        return;
      dom.off(thumbEl, "touchmove", onMouseMove);
      dom.off(thumbEl, "touchend", onMouseUp);
    };
    const onThumbMouseDown = (e) => {
      e.stopImmediatePropagation();
      if (e.ctrlKey || [1, 2].includes(e.button)) {
        return;
      }
      state.isDragging = true;
      state[bar.value.axis] = e.currentTarget[bar.value.offset] - (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction]);
      emit("start-move");
      attachEvents();
    };
    const onMouseUp = () => {
      state.isDragging = false;
      state[bar.value.axis] = 0;
      emit("stop-move");
      detachEvents();
    };
    const onMouseMove = (e) => {
      const { isDragging } = state;
      if (!isDragging)
        return;
      if (!thumbRef.value || !trackRef.value)
        return;
      const prevPage = state[bar.value.axis];
      if (!prevPage)
        return;
      raf.cAF(frameHandle);
      const offset = (trackRef.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
      const thumbClickPosition = thumbRef.value[bar.value.offset] - prevPage;
      const distance = offset - thumbClickPosition;
      frameHandle = raf.rAF(() => {
        state.traveled = Math.max(0, Math.min(distance, totalSteps.value));
        emit("scroll", distance, totalSteps.value);
      });
    };
    const clickTrackHandler = (e) => {
      const offset = Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]);
      const thumbHalf = thumbRef.value[bar.value.offset] / 2;
      const distance = offset - thumbHalf;
      state.traveled = Math.max(0, Math.min(distance, totalSteps.value));
      emit("scroll", distance, totalSteps.value);
    };
    const onScrollbarTouchStart = (e) => e.preventDefault();
    vue.watch(() => props.scrollFrom, (v) => {
      if (state.isDragging)
        return;
      state.traveled = Math.ceil(v * totalSteps.value);
    });
    vue.onMounted(() => {
      if (isServer__default["default"])
        return;
      dom.on(trackRef.value, "touchstart", onScrollbarTouchStart);
      dom.on(thumbRef.value, "touchstart", onThumbMouseDown);
    });
    vue.onBeforeUnmount(() => {
      dom.off(trackRef.value, "touchstart", onScrollbarTouchStart);
      detachEvents();
    });
    return () => {
      return vue.h("div", {
        role: "presentation",
        ref: trackRef,
        class: "el-virtual-scrollbar",
        style: trackStyle.value,
        onMousedown: vue.withModifiers(clickTrackHandler, ["stop", "prevent"])
      }, vue.h("div", {
        ref: thumbRef,
        class: "el-scrollbar__thumb",
        style: thumbStyle.value,
        onMousedown: onThumbMouseDown
      }, []));
    };
  }
});

var __defProp$1 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
const createList = ({
  name,
  getOffset,
  getItemSize,
  getItemOffset,
  getEstimatedTotalSize,
  getStartIndexForOffset,
  getStopIndexForStartIndex,
  initCache,
  clearCache,
  validateProps
}) => {
  return vue.defineComponent({
    name: name != null ? name : "ElVirtualList",
    props: virtualizedListProps,
    emits: [ITEM_RENDER_EVT, SCROLL_EVT],
    setup(props, { emit, expose }) {
      validateProps(props);
      const instance = vue.getCurrentInstance();
      const dynamicSizeCache = vue.ref(initCache(props, instance));
      const getItemStyleCache = useCache();
      const windowRef = vue.ref();
      const innerRef = vue.ref();
      const scrollbarRef = vue.ref();
      const states = vue.ref({
        isScrolling: false,
        scrollDir: "forward",
        scrollOffset: util.isNumber(props.initScrollOffset) ? props.initScrollOffset : 0,
        updateRequested: false,
        isScrollbarDragging: false
      });
      const itemsToRender = vue.computed(() => {
        const { total, cache } = props;
        const { isScrolling, scrollDir, scrollOffset } = vue.unref(states);
        if (total === 0) {
          return [0, 0, 0, 0];
        }
        const startIndex = getStartIndexForOffset(props, scrollOffset, vue.unref(dynamicSizeCache));
        const stopIndex = getStopIndexForStartIndex(props, startIndex, scrollOffset, vue.unref(dynamicSizeCache));
        const cacheBackward = !isScrolling || scrollDir === BACKWARD ? Math.max(1, cache) : 1;
        const cacheForward = !isScrolling || scrollDir === FORWARD ? Math.max(1, cache) : 1;
        return [
          Math.max(0, startIndex - cacheBackward),
          Math.max(0, Math.min(total - 1, stopIndex + cacheForward)),
          startIndex,
          stopIndex
        ];
      });
      const estimatedTotalSize = vue.computed(() => getEstimatedTotalSize(props, vue.unref(dynamicSizeCache)));
      const _isHorizontal = vue.computed(() => isHorizontal(props.layout));
      const windowStyle = vue.computed(() => [
        {
          position: "relative",
          overflow: "hidden",
          WebkitOverflowScrolling: "touch",
          willChange: "transform"
        },
        {
          direction: props.direction,
          height: util.isNumber(props.height) ? `${props.height}px` : props.height,
          width: util.isNumber(props.width) ? `${props.width}px` : props.width
        },
        props.style
      ]);
      const innerStyle = vue.computed(() => {
        const size = vue.unref(estimatedTotalSize);
        const horizontal = vue.unref(_isHorizontal);
        return {
          height: horizontal ? "100%" : `${size}px`,
          pointerEvents: vue.unref(states).isScrolling ? "none" : void 0,
          width: horizontal ? `${size}px` : "100%"
        };
      });
      const clientSize = vue.computed(() => _isHorizontal.value ? props.width : props.height);
      const { onWheel } = useWheel({
        atStartEdge: vue.computed(() => states.value.scrollOffset <= 0),
        atEndEdge: vue.computed(() => states.value.scrollOffset >= estimatedTotalSize.value),
        layout: vue.computed(() => props.layout)
      }, (offset) => {
        var _a, _b;
        (_b = (_a = scrollbarRef.value).onMouseUp) == null ? void 0 : _b.call(_a);
        scrollTo(Math.min(states.value.scrollOffset + offset, estimatedTotalSize.value - clientSize.value));
      });
      const emitEvents = () => {
        const { total } = props;
        if (total > 0) {
          const [cacheStart, cacheEnd, visibleStart, visibleEnd] = vue.unref(itemsToRender);
          emit(ITEM_RENDER_EVT, cacheStart, cacheEnd, visibleStart, visibleEnd);
        }
        const { scrollDir, scrollOffset, updateRequested } = vue.unref(states);
        emit(SCROLL_EVT, scrollDir, scrollOffset, updateRequested);
      };
      const scrollVertically = (e) => {
        const { clientHeight, scrollHeight, scrollTop } = e.currentTarget;
        const _states = vue.unref(states);
        if (_states.scrollOffset === scrollTop) {
          return;
        }
        const scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
        states.value = __spreadProps$1(__spreadValues$1({}, _states), {
          isScrolling: true,
          scrollDir: getScrollDir(_states.scrollOffset, scrollOffset),
          scrollOffset,
          updateRequested: false
        });
        vue.nextTick(resetIsScrolling);
      };
      const scrollHorizontally = (e) => {
        const { clientWidth, scrollLeft, scrollWidth } = e.currentTarget;
        const _states = vue.unref(states);
        if (_states.scrollOffset === scrollLeft) {
          return;
        }
        const { direction } = props;
        let scrollOffset = scrollLeft;
        if (direction === RTL) {
          switch (getRTLOffsetType()) {
            case RTL_OFFSET_NAG: {
              scrollOffset = -scrollLeft;
              break;
            }
            case RTL_OFFSET_POS_DESC: {
              scrollOffset = scrollWidth - clientWidth - scrollLeft;
              break;
            }
          }
        }
        scrollOffset = Math.max(0, Math.min(scrollOffset, scrollWidth - clientWidth));
        states.value = __spreadProps$1(__spreadValues$1({}, _states), {
          isScrolling: true,
          scrollDir: getScrollDir(_states.scrollOffset, scrollOffset),
          scrollOffset,
          updateRequested: false
        });
        vue.nextTick(resetIsScrolling);
      };
      const onScroll = (e) => {
        vue.unref(_isHorizontal) ? scrollHorizontally(e) : scrollVertically(e);
        emitEvents();
      };
      const onScrollbarScroll = (distanceToGo, totalSteps) => {
        const offset = (estimatedTotalSize.value - clientSize.value) / totalSteps * distanceToGo;
        scrollTo(Math.min(estimatedTotalSize.value - clientSize.value, offset));
      };
      const scrollTo = (offset) => {
        offset = Math.max(offset, 0);
        if (offset === vue.unref(states).scrollOffset) {
          return;
        }
        states.value = __spreadProps$1(__spreadValues$1({}, vue.unref(states)), {
          scrollOffset: offset,
          scrollDir: getScrollDir(vue.unref(states).scrollOffset, offset),
          updateRequested: true
        });
        vue.nextTick(resetIsScrolling);
      };
      const scrollToItem = (idx, alignment = AUTO_ALIGNMENT) => {
        const { scrollOffset } = vue.unref(states);
        idx = Math.max(0, Math.min(idx, props.total - 1));
        scrollTo(getOffset(props, idx, alignment, scrollOffset, vue.unref(dynamicSizeCache)));
      };
      const getItemStyle = (idx) => {
        const { direction, itemSize, layout } = props;
        const itemStyleCache = getItemStyleCache.value(clearCache && itemSize, clearCache && layout, clearCache && direction);
        let style;
        if (shared.hasOwn(itemStyleCache, String(idx))) {
          style = itemStyleCache[idx];
        } else {
          const offset = getItemOffset(props, idx, vue.unref(dynamicSizeCache));
          const size = getItemSize(props, idx, vue.unref(dynamicSizeCache));
          const horizontal = vue.unref(_isHorizontal);
          const isRtl = direction === RTL;
          const offsetHorizontal = horizontal ? offset : 0;
          itemStyleCache[idx] = style = {
            position: "absolute",
            left: isRtl ? void 0 : `${offsetHorizontal}px`,
            right: isRtl ? `${offsetHorizontal}px` : void 0,
            top: !horizontal ? `${offset}px` : 0,
            height: !horizontal ? `${size}px` : "100%",
            width: horizontal ? `${size}px` : "100%"
          };
        }
        return style;
      };
      const resetIsScrolling = () => {
        states.value.isScrolling = false;
        vue.nextTick(() => {
          getItemStyleCache.value(-1, null, null);
        });
      };
      const resetScrollTop = () => {
        const window = windowRef.value;
        if (window) {
          window.scrollTop = 0;
        }
      };
      vue.onMounted(() => {
        if (isServer__default["default"])
          return;
        const { initScrollOffset } = props;
        const windowElement = vue.unref(windowRef);
        if (util.isNumber(initScrollOffset) && windowElement) {
          if (vue.unref(_isHorizontal)) {
            windowElement.scrollLeft = initScrollOffset;
          } else {
            windowElement.scrollTop = initScrollOffset;
          }
        }
        emitEvents();
      });
      vue.onUpdated(() => {
        const { direction, layout } = props;
        const { scrollOffset, updateRequested } = vue.unref(states);
        const windowElement = vue.unref(windowRef);
        if (updateRequested && windowElement) {
          if (layout === HORIZONTAL) {
            if (direction === RTL) {
              switch (getRTLOffsetType()) {
                case "negative": {
                  windowElement.scrollLeft = -scrollOffset;
                  break;
                }
                case "positive-ascending": {
                  windowElement.scrollLeft = scrollOffset;
                  break;
                }
                default: {
                  const { clientWidth, scrollWidth } = windowElement;
                  windowElement.scrollLeft = scrollWidth - clientWidth - scrollOffset;
                  break;
                }
              }
            } else {
              windowElement.scrollLeft = scrollOffset;
            }
          } else {
            windowElement.scrollTop = scrollOffset;
          }
        }
      });
      const api = {
        clientSize,
        estimatedTotalSize,
        windowStyle,
        windowRef,
        innerRef,
        innerStyle,
        itemsToRender,
        scrollbarRef,
        states,
        getItemStyle,
        onScroll,
        onScrollbarScroll,
        onWheel,
        scrollTo,
        scrollToItem,
        resetScrollTop
      };
      expose({
        windowRef,
        innerRef,
        getItemStyleCache,
        scrollTo,
        scrollToItem,
        resetScrollTop,
        states
      });
      return api;
    },
    render(ctx) {
      var _a;
      const {
        $slots,
        className,
        clientSize,
        containerElement,
        data,
        getItemStyle,
        innerElement,
        itemsToRender,
        innerStyle,
        layout,
        total,
        onScroll,
        onScrollbarScroll,
        onWheel,
        states,
        useIsScrolling,
        windowStyle
      } = ctx;
      const [start, end] = itemsToRender;
      const Container = vue.resolveDynamicComponent(containerElement);
      const Inner = vue.resolveDynamicComponent(innerElement);
      const children = [];
      if (total > 0) {
        for (let i = start; i <= end; i++) {
          children.push((_a = $slots.default) == null ? void 0 : _a.call($slots, {
            data,
            key: i,
            index: i,
            isScrolling: useIsScrolling ? states.isScrolling : void 0,
            style: getItemStyle(i)
          }));
        }
      }
      const InnerNode = [
        vue.h(Inner, {
          style: innerStyle,
          ref: "innerRef"
        }, !util.isString(Inner) ? {
          default: () => children
        } : children)
      ];
      const scrollbar = vue.h(ScrollBar, {
        ref: "scrollbarRef",
        clientSize,
        layout,
        onScroll: onScrollbarScroll,
        ratio: clientSize * 100 / this.estimatedTotalSize,
        scrollFrom: states.scrollOffset / (this.estimatedTotalSize - clientSize),
        total,
        visible: true
      });
      const listContainer = vue.h(Container, {
        class: className,
        style: windowStyle,
        onScroll,
        onWheel,
        ref: "windowRef",
        key: 0
      }, !util.isString(Container) ? { default: () => [InnerNode] } : [InnerNode]);
      return vue.h("div", {
        key: 0,
        class: "el-vl__wrapper"
      }, [listContainer, scrollbar]);
    }
  });
};

const FixedSizeList = createList({
  name: "ElFixedSizeList",
  getItemOffset: ({ itemSize }, index) => index * itemSize,
  getItemSize: ({ itemSize }) => itemSize,
  getEstimatedTotalSize: ({ total, itemSize }) => itemSize * total,
  getOffset: ({ height, total, itemSize, layout, width }, index, alignment, scrollOffset) => {
    const size = isHorizontal(layout) ? width : height;
    if (process.env.NODE_ENV !== "production" && util.isString(size)) {
      error.throwError("[ElVirtualList]", `
        You should set
          width/height
        to number when your layout is
          horizontal/vertical
      `);
    }
    const lastItemOffset = Math.max(0, total * itemSize - size);
    const maxOffset = Math.min(lastItemOffset, index * itemSize);
    const minOffset = Math.max(0, (index + 1) * itemSize - size);
    if (alignment === SMART_ALIGNMENT) {
      if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
        alignment = AUTO_ALIGNMENT;
      } else {
        alignment = CENTERED_ALIGNMENT;
      }
    }
    switch (alignment) {
      case START_ALIGNMENT: {
        return maxOffset;
      }
      case END_ALIGNMENT: {
        return minOffset;
      }
      case CENTERED_ALIGNMENT: {
        const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
        if (middleOffset < Math.ceil(size / 2)) {
          return 0;
        } else if (middleOffset > lastItemOffset + Math.floor(size / 2)) {
          return lastItemOffset;
        } else {
          return middleOffset;
        }
      }
      case AUTO_ALIGNMENT:
      default: {
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset;
        } else if (scrollOffset < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }
      }
    }
  },
  getStartIndexForOffset: ({ total, itemSize }, offset) => Math.max(0, Math.min(total - 1, Math.floor(offset / itemSize))),
  getStopIndexForStartIndex: ({ height, total, itemSize, layout, width }, startIndex, scrollOffset) => {
    const offset = startIndex * itemSize;
    const size = isHorizontal(layout) ? width : height;
    const numVisibleItems = Math.ceil((size + scrollOffset - offset) / itemSize);
    return Math.max(0, Math.min(total - 1, startIndex + numVisibleItems - 1));
  },
  initCache() {
    return void 0;
  },
  clearCache: true,
  validateProps() {
  }
});

const SCOPE$2 = "ElDynamicSizeList";
const getItemFromCache$1 = (props, index, listCache) => {
  const { itemSize } = props;
  const { items, lastVisitedIndex } = listCache;
  if (index > lastVisitedIndex) {
    let offset = 0;
    if (lastVisitedIndex >= 0) {
      const item = items[lastVisitedIndex];
      offset = item.offset + item.size;
    }
    for (let i = lastVisitedIndex + 1; i <= index; i++) {
      const size = itemSize(i);
      items[i] = {
        offset,
        size
      };
      offset += size;
    }
    listCache.lastVisitedIndex = index;
  }
  return items[index];
};
const findItem$1 = (props, listCache, offset) => {
  const { items, lastVisitedIndex } = listCache;
  const lastVisitedOffset = lastVisitedIndex > 0 ? items[lastVisitedIndex].offset : 0;
  if (lastVisitedOffset >= offset) {
    return bs$1(props, listCache, 0, lastVisitedIndex, offset);
  }
  return es$1(props, listCache, Math.max(0, lastVisitedIndex), offset);
};
const bs$1 = (props, listCache, low, high, offset) => {
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    const currentOffset = getItemFromCache$1(props, mid, listCache).offset;
    if (currentOffset === offset) {
      return mid;
    } else if (currentOffset < offset) {
      low = mid + 1;
    } else if (currentOffset > offset) {
      high = mid - 1;
    }
  }
  return Math.max(0, low - 1);
};
const es$1 = (props, listCache, index, offset) => {
  const { total } = props;
  let exponent = 1;
  while (index < total && getItemFromCache$1(props, index, listCache).offset < offset) {
    index += exponent;
    exponent *= 2;
  }
  return bs$1(props, listCache, Math.floor(index / 2), Math.min(index, total - 1), offset);
};
const getEstimatedTotalSize = ({ total }, { items, estimatedItemSize, lastVisitedIndex }) => {
  let totalSizeOfMeasuredItems = 0;
  if (lastVisitedIndex >= total) {
    lastVisitedIndex = total - 1;
  }
  if (lastVisitedIndex >= 0) {
    const item = items[lastVisitedIndex];
    totalSizeOfMeasuredItems = item.offset + item.size;
  }
  const numUnmeasuredItems = total - lastVisitedIndex - 1;
  const totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedItemSize;
  return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems;
};
const DynamicSizeList = createList({
  name: "ElDynamicSizeList",
  getItemOffset: (props, index, listCache) => getItemFromCache$1(props, index, listCache).offset,
  getItemSize: (_, index, { items }) => items[index].size,
  getEstimatedTotalSize,
  getOffset: (props, index, alignment, scrollOffset, listCache) => {
    const { height, layout, width } = props;
    const size = isHorizontal(layout) ? width : height;
    const item = getItemFromCache$1(props, index, listCache);
    const estimatedTotalSize = getEstimatedTotalSize(props, listCache);
    const maxOffset = Math.max(0, Math.min(estimatedTotalSize - size, item.offset));
    const minOffset = Math.max(0, item.offset - size + item.size);
    if (alignment === SMART_ALIGNMENT) {
      if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
        alignment = AUTO_ALIGNMENT;
      } else {
        alignment = CENTERED_ALIGNMENT;
      }
    }
    switch (alignment) {
      case START_ALIGNMENT: {
        return maxOffset;
      }
      case END_ALIGNMENT: {
        return minOffset;
      }
      case CENTERED_ALIGNMENT: {
        return Math.round(minOffset + (maxOffset - minOffset) / 2);
      }
      case AUTO_ALIGNMENT:
      default: {
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset;
        } else if (scrollOffset < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }
      }
    }
  },
  getStartIndexForOffset: (props, offset, listCache) => findItem$1(props, listCache, offset),
  getStopIndexForStartIndex: (props, startIndex, scrollOffset, listCache) => {
    const { height, total, layout, width } = props;
    const size = isHorizontal(layout) ? width : height;
    const item = getItemFromCache$1(props, startIndex, listCache);
    const maxOffset = scrollOffset + size;
    let offset = item.offset + item.size;
    let stopIndex = startIndex;
    while (stopIndex < total - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemFromCache$1(props, stopIndex, listCache).size;
    }
    return stopIndex;
  },
  initCache({ estimatedItemSize = DEFAULT_DYNAMIC_LIST_ITEM_SIZE }, instance) {
    const cache = {
      items: {},
      estimatedItemSize,
      lastVisitedIndex: -1
    };
    cache.clearCacheAfterIndex = (index, forceUpdate = true) => {
      var _a, _b;
      cache.lastVisitedIndex = Math.min(cache.lastVisitedIndex, index - 1);
      (_a = instance.exposed) == null ? void 0 : _a.getItemStyleCache(-1);
      if (forceUpdate) {
        (_b = instance.proxy) == null ? void 0 : _b.$forceUpdate();
      }
    };
    return cache;
  },
  clearCache: false,
  validateProps: ({ itemSize }) => {
    if (process.env.NODE_ENV !== "production") {
      if (typeof itemSize !== "function") {
        error.throwError(SCOPE$2, `
          itemSize is required as function, but the given value was ${typeof itemSize}
        `);
      }
    }
  }
});

const useGridWheel = ({ atXEndEdge, atXStartEdge, atYEndEdge, atYStartEdge }, onWheelDelta) => {
  let frameHandle = null;
  let xOffset = 0;
  let yOffset = 0;
  const hasReachedEdge = (x, y) => {
    const xEdgeReached = x < 0 && atXStartEdge.value || x > 0 && atXEndEdge.value;
    const yEdgeReached = y < 0 && atYStartEdge.value || y > 0 && atYEndEdge.value;
    return xEdgeReached && yEdgeReached;
  };
  const onWheel = (e) => {
    raf.cAF(frameHandle);
    const x = e.deltaX;
    const y = e.deltaY;
    if (hasReachedEdge(xOffset, yOffset) && hasReachedEdge(xOffset + x, yOffset + y))
      return;
    xOffset += x;
    yOffset += y;
    if (!isFF) {
      e.preventDefault();
    }
    frameHandle = raf.rAF(() => {
      onWheelDelta(xOffset, yOffset);
      xOffset = 0;
      yOffset = 0;
    });
  };
  return {
    hasReachedEdge,
    onWheel
  };
};

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const createGrid = ({
  name,
  clearCache,
  getColumnPosition,
  getColumnStartIndexForOffset,
  getColumnStopIndexForStartIndex,
  getEstimatedTotalHeight,
  getEstimatedTotalWidth,
  getColumnOffset,
  getRowOffset,
  getRowPosition,
  getRowStartIndexForOffset,
  getRowStopIndexForStartIndex,
  initCache,
  validateProps
}) => {
  return vue.defineComponent({
    name: name != null ? name : "ElVirtualList",
    props: virtualizedGridProps,
    emits: [ITEM_RENDER_EVT, SCROLL_EVT],
    setup(props, { emit, expose, slots }) {
      validateProps(props);
      const instance = vue.getCurrentInstance();
      const cache = vue.ref(initCache(props, instance));
      const windowRef = vue.ref();
      const hScrollbar = vue.ref();
      const vScrollbar = vue.ref();
      const innerRef = vue.ref(null);
      const states = vue.ref({
        isScrolling: false,
        scrollLeft: util.isNumber(props.initScrollLeft) ? props.initScrollLeft : 0,
        scrollTop: util.isNumber(props.initScrollTop) ? props.initScrollTop : 0,
        updateRequested: false,
        xAxisScrollDir: FORWARD,
        yAxisScrollDir: FORWARD
      });
      const getItemStyleCache = useCache();
      const parsedHeight = vue.computed(() => parseInt(`${props.height}`, 10));
      const parsedWidth = vue.computed(() => parseInt(`${props.width}`, 10));
      const columnsToRender = vue.computed(() => {
        const { totalColumn, totalRow, columnCache } = props;
        const { isScrolling, xAxisScrollDir, scrollLeft } = vue.unref(states);
        if (totalColumn === 0 || totalRow === 0) {
          return [0, 0, 0, 0];
        }
        const startIndex = getColumnStartIndexForOffset(props, scrollLeft, vue.unref(cache));
        const stopIndex = getColumnStopIndexForStartIndex(props, startIndex, scrollLeft, vue.unref(cache));
        const cacheBackward = !isScrolling || xAxisScrollDir === BACKWARD ? Math.max(1, columnCache) : 1;
        const cacheForward = !isScrolling || xAxisScrollDir === FORWARD ? Math.max(1, columnCache) : 1;
        return [
          Math.max(0, startIndex - cacheBackward),
          Math.max(0, Math.min(totalColumn - 1, stopIndex + cacheForward)),
          startIndex,
          stopIndex
        ];
      });
      const rowsToRender = vue.computed(() => {
        const { totalColumn, totalRow, rowCache } = props;
        const { isScrolling, yAxisScrollDir, scrollTop } = vue.unref(states);
        if (totalColumn === 0 || totalRow === 0) {
          return [0, 0, 0, 0];
        }
        const startIndex = getRowStartIndexForOffset(props, scrollTop, vue.unref(cache));
        const stopIndex = getRowStopIndexForStartIndex(props, startIndex, scrollTop, vue.unref(cache));
        const cacheBackward = !isScrolling || yAxisScrollDir === BACKWARD ? Math.max(1, rowCache) : 1;
        const cacheForward = !isScrolling || yAxisScrollDir === FORWARD ? Math.max(1, rowCache) : 1;
        return [
          Math.max(0, startIndex - cacheBackward),
          Math.max(0, Math.min(totalRow - 1, stopIndex + cacheForward)),
          startIndex,
          stopIndex
        ];
      });
      const estimatedTotalHeight = vue.computed(() => getEstimatedTotalHeight(props, vue.unref(cache)));
      const estimatedTotalWidth = vue.computed(() => getEstimatedTotalWidth(props, vue.unref(cache)));
      const windowStyle = vue.computed(() => {
        var _a;
        return [
          {
            position: "relative",
            overflow: "hidden",
            WebkitOverflowScrolling: "touch",
            willChange: "transform"
          },
          {
            direction: props.direction,
            height: util.isNumber(props.height) ? `${props.height}px` : props.height,
            width: util.isNumber(props.width) ? `${props.width}px` : props.width
          },
          (_a = props.style) != null ? _a : {}
        ];
      });
      const innerStyle = vue.computed(() => {
        const width = `${vue.unref(estimatedTotalWidth)}px`;
        const height = `${vue.unref(estimatedTotalHeight)}px`;
        return {
          height,
          pointerEvents: vue.unref(states).isScrolling ? "none" : void 0,
          width
        };
      });
      const emitEvents = () => {
        const { totalColumn, totalRow } = props;
        if (totalColumn > 0 && totalRow > 0) {
          const [
            columnCacheStart,
            columnCacheEnd,
            columnVisibleStart,
            columnVisibleEnd
          ] = vue.unref(columnsToRender);
          const [rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd] = vue.unref(rowsToRender);
          emit(ITEM_RENDER_EVT, columnCacheStart, columnCacheEnd, rowCacheStart, rowCacheEnd, columnVisibleStart, columnVisibleEnd, rowVisibleStart, rowVisibleEnd);
        }
        const {
          scrollLeft,
          scrollTop,
          updateRequested,
          xAxisScrollDir,
          yAxisScrollDir
        } = vue.unref(states);
        emit(SCROLL_EVT, xAxisScrollDir, scrollLeft, yAxisScrollDir, scrollTop, updateRequested);
      };
      const onScroll = (e) => {
        const {
          clientHeight,
          clientWidth,
          scrollHeight,
          scrollLeft,
          scrollTop,
          scrollWidth
        } = e.currentTarget;
        const _states = vue.unref(states);
        if (_states.scrollTop === scrollTop && _states.scrollLeft === scrollLeft) {
          return;
        }
        let _scrollLeft = scrollLeft;
        if (isRTL(props.direction)) {
          switch (getRTLOffsetType()) {
            case RTL_OFFSET_NAG:
              _scrollLeft = -scrollLeft;
              break;
            case RTL_OFFSET_POS_DESC:
              _scrollLeft = scrollWidth - clientWidth - scrollLeft;
              break;
          }
        }
        states.value = __spreadProps(__spreadValues({}, _states), {
          isScrolling: true,
          scrollLeft: _scrollLeft,
          scrollTop: Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight)),
          updateRequested: false,
          xAxisScrollDir: getScrollDir(_states.scrollLeft, _scrollLeft),
          yAxisScrollDir: getScrollDir(_states.scrollTop, scrollTop)
        });
        vue.nextTick(resetIsScrolling);
        emitEvents();
      };
      const onVerticalScroll = (distance, totalSteps) => {
        const height = vue.unref(parsedHeight);
        const offset = (estimatedTotalHeight.value - height) / totalSteps * distance;
        scrollTo({
          scrollTop: Math.min(estimatedTotalHeight.value - height, offset)
        });
      };
      const onHorizontalScroll = (distance, totalSteps) => {
        const width = vue.unref(parsedWidth);
        const offset = (estimatedTotalWidth.value - width) / totalSteps * distance;
        scrollTo({
          scrollLeft: Math.min(estimatedTotalWidth.value - width, offset)
        });
      };
      const { onWheel } = useGridWheel({
        atXStartEdge: vue.computed(() => states.value.scrollLeft <= 0),
        atXEndEdge: vue.computed(() => states.value.scrollLeft >= estimatedTotalWidth.value),
        atYStartEdge: vue.computed(() => states.value.scrollTop <= 0),
        atYEndEdge: vue.computed(() => states.value.scrollTop >= estimatedTotalHeight.value)
      }, (x, y) => {
        var _a, _b, _c, _d;
        (_b = (_a = hScrollbar.value) == null ? void 0 : _a.onMouseUp) == null ? void 0 : _b.call(_a);
        (_d = (_c = hScrollbar.value) == null ? void 0 : _c.onMouseUp) == null ? void 0 : _d.call(_c);
        const width = vue.unref(parsedWidth);
        const height = vue.unref(parsedHeight);
        scrollTo({
          scrollLeft: Math.min(states.value.scrollLeft + x, estimatedTotalWidth.value - width),
          scrollTop: Math.min(states.value.scrollTop + y, estimatedTotalHeight.value - height)
        });
      });
      const scrollTo = ({
        scrollLeft = states.value.scrollLeft,
        scrollTop = states.value.scrollTop
      }) => {
        scrollLeft = Math.max(scrollLeft, 0);
        scrollTop = Math.max(scrollTop, 0);
        const _states = vue.unref(states);
        if (scrollTop === _states.scrollTop && scrollLeft === _states.scrollLeft) {
          return;
        }
        states.value = __spreadProps(__spreadValues({}, _states), {
          xAxisScrollDir: getScrollDir(_states.scrollLeft, scrollLeft),
          yAxisScrollDir: getScrollDir(_states.scrollTop, scrollTop),
          scrollLeft,
          scrollTop,
          updateRequested: true
        });
        vue.nextTick(resetIsScrolling);
      };
      const scrollToItem = (rowIndex = 0, columnIdx = 0, alignment = AUTO_ALIGNMENT) => {
        const _states = vue.unref(states);
        columnIdx = Math.max(0, Math.min(columnIdx, props.totalColumn - 1));
        rowIndex = Math.max(0, Math.min(rowIndex, props.totalRow - 1));
        const scrollBarWidth = getScrollBarWidth__default["default"]();
        const _cache = vue.unref(cache);
        const estimatedHeight = getEstimatedTotalHeight(props, _cache);
        const estimatedWidth = getEstimatedTotalWidth(props, _cache);
        scrollTo({
          scrollLeft: getColumnOffset(props, columnIdx, alignment, _states.scrollLeft, _cache, estimatedWidth > props.width ? scrollBarWidth : 0),
          scrollTop: getRowOffset(props, rowIndex, alignment, _states.scrollTop, _cache, estimatedHeight > props.height ? scrollBarWidth : 0)
        });
      };
      const getItemStyle = (rowIndex, columnIndex) => {
        const { columnWidth, direction, rowHeight } = props;
        const itemStyleCache = getItemStyleCache.value(clearCache && columnWidth, clearCache && rowHeight, clearCache && direction);
        const key = `${rowIndex},${columnIndex}`;
        if (shared.hasOwn(itemStyleCache, key)) {
          return itemStyleCache[key];
        } else {
          const [, left] = getColumnPosition(props, columnIndex, vue.unref(cache));
          const _cache = vue.unref(cache);
          const rtl = isRTL(direction);
          const [height, top] = getRowPosition(props, rowIndex, _cache);
          const [width] = getColumnPosition(props, columnIndex, _cache);
          itemStyleCache[key] = {
            position: "absolute",
            left: rtl ? void 0 : `${left}px`,
            right: rtl ? `${left}px` : void 0,
            top: `${top}px`,
            height: `${height}px`,
            width: `${width}px`
          };
          return itemStyleCache[key];
        }
      };
      const resetIsScrolling = () => {
        states.value.isScrolling = false;
        vue.nextTick(() => {
          getItemStyleCache.value(-1, null, null);
        });
      };
      vue.onMounted(() => {
        if (isServer__default["default"])
          return;
        const { initScrollLeft, initScrollTop } = props;
        const windowElement = vue.unref(windowRef);
        if (windowElement) {
          if (util.isNumber(initScrollLeft)) {
            windowElement.scrollLeft = initScrollLeft;
          }
          if (util.isNumber(initScrollTop)) {
            windowElement.scrollTop = initScrollTop;
          }
        }
        emitEvents();
      });
      vue.onUpdated(() => {
        const { direction } = props;
        const { scrollLeft, scrollTop, updateRequested } = vue.unref(states);
        const windowElement = vue.unref(windowRef);
        if (updateRequested && windowElement) {
          if (direction === RTL) {
            switch (getRTLOffsetType()) {
              case RTL_OFFSET_NAG: {
                windowElement.scrollLeft = -scrollLeft;
                break;
              }
              case RTL_OFFSET_POS_ASC: {
                windowElement.scrollLeft = scrollLeft;
                break;
              }
              default: {
                const { clientWidth, scrollWidth } = windowElement;
                windowElement.scrollLeft = scrollWidth - clientWidth - scrollLeft;
                break;
              }
            }
          } else {
            windowElement.scrollLeft = Math.max(0, scrollLeft);
          }
          windowElement.scrollTop = Math.max(0, scrollTop);
        }
      });
      expose({
        windowRef,
        innerRef,
        getItemStyleCache,
        scrollTo,
        scrollToItem,
        states
      });
      const renderScrollbars = () => {
        const { totalColumn, totalRow } = props;
        const width = vue.unref(parsedWidth);
        const height = vue.unref(parsedHeight);
        const estimatedWidth = vue.unref(estimatedTotalWidth);
        const estimatedHeight = vue.unref(estimatedTotalHeight);
        const { scrollLeft, scrollTop } = vue.unref(states);
        const horizontalScrollbar = vue.h(ScrollBar, {
          ref: hScrollbar,
          clientSize: width,
          layout: "horizontal",
          onScroll: onHorizontalScroll,
          ratio: width * 100 / estimatedWidth,
          scrollFrom: scrollLeft / (estimatedWidth - width),
          total: totalRow,
          visible: true
        });
        const verticalScrollbar = vue.h(ScrollBar, {
          ref: vScrollbar,
          clientSize: height,
          layout: "vertical",
          onScroll: onVerticalScroll,
          ratio: height * 100 / estimatedHeight,
          scrollFrom: scrollTop / (estimatedHeight - height),
          total: totalColumn,
          visible: true
        });
        return {
          horizontalScrollbar,
          verticalScrollbar
        };
      };
      const renderItems = () => {
        var _a;
        const [columnStart, columnEnd] = vue.unref(columnsToRender);
        const [rowStart, rowEnd] = vue.unref(rowsToRender);
        const { data, totalColumn, totalRow, useIsScrolling } = props;
        const children = [];
        if (totalRow > 0 && totalColumn > 0) {
          for (let row = rowStart; row <= rowEnd; row++) {
            for (let column = columnStart; column <= columnEnd; column++) {
              children.push((_a = slots.default) == null ? void 0 : _a.call(slots, {
                columnIndex: column,
                data,
                key: column,
                isScrolling: useIsScrolling ? vue.unref(states).isScrolling : void 0,
                style: getItemStyle(row, column),
                rowIndex: row
              }));
            }
          }
        }
        return children;
      };
      const renderInner = () => {
        const Inner = vue.resolveDynamicComponent(props.innerElement);
        const children = renderItems();
        return [
          vue.h(Inner, {
            style: vue.unref(innerStyle),
            ref: innerRef
          }, !util.isString(Inner) ? {
            default: () => children
          } : children)
        ];
      };
      const renderWindow = () => {
        const Container = vue.resolveDynamicComponent(props.containerElement);
        const { horizontalScrollbar, verticalScrollbar } = renderScrollbars();
        const Inner = renderInner();
        return vue.h("div", {
          key: 0,
          class: "el-vg__wrapper"
        }, [
          vue.h(Container, {
            class: props.className,
            style: vue.unref(windowStyle),
            onScroll,
            onWheel,
            ref: windowRef
          }, !util.isString(Container) ? { default: () => Inner } : Inner),
          horizontalScrollbar,
          verticalScrollbar
        ]);
      };
      return renderWindow;
    }
  });
};

const SCOPE$1 = "ElFixedSizeGrid";
const FixedSizeGrid$1 = createGrid({
  name: "ElFixedSizeGrid",
  getColumnPosition: ({ columnWidth }, index) => [
    columnWidth,
    index * columnWidth
  ],
  getRowPosition: ({ rowHeight }, index) => [
    rowHeight,
    index * rowHeight
  ],
  getEstimatedTotalHeight: ({ totalRow, rowHeight }) => rowHeight * totalRow,
  getEstimatedTotalWidth: ({ totalColumn, columnWidth }) => columnWidth * totalColumn,
  getColumnOffset: ({ totalColumn, columnWidth, width }, columnIndex, alignment, scrollLeft, _, scrollBarWidth) => {
    width = Number(width);
    const lastColumnOffset = Math.max(0, totalColumn * columnWidth - width);
    const maxOffset = Math.min(lastColumnOffset, columnIndex * columnWidth);
    const minOffset = Math.max(0, columnIndex * columnWidth - width + scrollBarWidth + columnWidth);
    if (alignment === "smart") {
      if (scrollLeft >= minOffset - width && scrollLeft <= maxOffset + width) {
        alignment = AUTO_ALIGNMENT;
      } else {
        alignment = CENTERED_ALIGNMENT;
      }
    }
    switch (alignment) {
      case START_ALIGNMENT:
        return maxOffset;
      case END_ALIGNMENT:
        return minOffset;
      case CENTERED_ALIGNMENT: {
        const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
        if (middleOffset < Math.ceil(width / 2)) {
          return 0;
        } else if (middleOffset > lastColumnOffset + Math.floor(width / 2)) {
          return lastColumnOffset;
        } else {
          return middleOffset;
        }
      }
      case AUTO_ALIGNMENT:
      default:
        if (scrollLeft >= minOffset && scrollLeft <= maxOffset) {
          return scrollLeft;
        } else if (minOffset > maxOffset) {
          return minOffset;
        } else if (scrollLeft < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }
    }
  },
  getRowOffset: ({ rowHeight, height, totalRow }, rowIndex, align, scrollTop, _, scrollBarWidth) => {
    height = Number(height);
    const lastRowOffset = Math.max(0, totalRow * rowHeight - height);
    const maxOffset = Math.min(lastRowOffset, rowIndex * rowHeight);
    const minOffset = Math.max(0, rowIndex * rowHeight - height + scrollBarWidth + rowHeight);
    if (align === SMART_ALIGNMENT) {
      if (scrollTop >= minOffset - height && scrollTop <= maxOffset + height) {
        align = AUTO_ALIGNMENT;
      } else {
        align = CENTERED_ALIGNMENT;
      }
    }
    switch (align) {
      case START_ALIGNMENT:
        return maxOffset;
      case END_ALIGNMENT:
        return minOffset;
      case CENTERED_ALIGNMENT: {
        const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
        if (middleOffset < Math.ceil(height / 2)) {
          return 0;
        } else if (middleOffset > lastRowOffset + Math.floor(height / 2)) {
          return lastRowOffset;
        } else {
          return middleOffset;
        }
      }
      case AUTO_ALIGNMENT:
      default:
        if (scrollTop >= minOffset && scrollTop <= maxOffset) {
          return scrollTop;
        } else if (minOffset > maxOffset) {
          return minOffset;
        } else if (scrollTop < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }
    }
  },
  getColumnStartIndexForOffset: ({ columnWidth, totalColumn }, scrollLeft) => Math.max(0, Math.min(totalColumn - 1, Math.floor(scrollLeft / columnWidth))),
  getColumnStopIndexForStartIndex: ({ columnWidth, totalColumn, width }, startIndex, scrollLeft) => {
    const left = startIndex * columnWidth;
    const visibleColumnsCount = Math.ceil((width + scrollLeft - left) / columnWidth);
    return Math.max(0, Math.min(totalColumn - 1, startIndex + visibleColumnsCount - 1));
  },
  getRowStartIndexForOffset: ({ rowHeight, totalRow }, scrollTop) => Math.max(0, Math.min(totalRow - 1, Math.floor(scrollTop / rowHeight))),
  getRowStopIndexForStartIndex: ({ rowHeight, totalRow, height }, startIndex, scrollTop) => {
    const top = startIndex * rowHeight;
    const numVisibleRows = Math.ceil((height + scrollTop - top) / rowHeight);
    return Math.max(0, Math.min(totalRow - 1, startIndex + numVisibleRows - 1));
  },
  initCache: () => void 0,
  clearCache: true,
  validateProps: ({ columnWidth, rowHeight }) => {
    if (process.env.NODE_ENV !== "production") {
      if (!util.isNumber(columnWidth)) {
        error.throwError(SCOPE$1, `
          "columnWidth" must be passed as number,
            instead ${typeof columnWidth} was given.
        `);
      }
      if (!util.isNumber(rowHeight)) {
        error.throwError(SCOPE$1, `
          "columnWidth" must be passed as number,
            instead ${typeof rowHeight} was given.
        `);
      }
    }
  }
});

const { max, min, floor } = Math;
const SCOPE = "ElDynamicSizeGrid";
const ACCESS_SIZER_KEY_MAP = {
  column: "columnWidth",
  row: "rowHeight"
};
const ACCESS_LAST_VISITED_KEY_MAP = {
  column: "lastVisitedColumnIndex",
  row: "lastVisitedRowIndex"
};
const getItemFromCache = (props, index, gridCache, type) => {
  const [cachedItems, sizer, lastVisited] = [
    gridCache[type],
    props[ACCESS_SIZER_KEY_MAP[type]],
    gridCache[ACCESS_LAST_VISITED_KEY_MAP[type]]
  ];
  if (index > lastVisited) {
    let offset = 0;
    if (lastVisited >= 0) {
      const item = cachedItems[lastVisited];
      offset = item.offset + item.size;
    }
    for (let i = lastVisited + 1; i <= index; i++) {
      const size = sizer(i);
      cachedItems[i] = {
        offset,
        size
      };
      offset += size;
    }
    gridCache[ACCESS_LAST_VISITED_KEY_MAP[type]] = index;
  }
  return cachedItems[index];
};
const bs = (props, gridCache, low, high, offset, type) => {
  while (low <= high) {
    const mid = low + floor((high - low) / 2);
    const currentOffset = getItemFromCache(props, mid, gridCache, type).offset;
    if (currentOffset === offset) {
      return mid;
    } else if (currentOffset < offset) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return max(0, low - 1);
};
const es = (props, gridCache, idx, offset, type) => {
  const total = type === "column" ? props.totalColumn : props.totalRow;
  let exponent = 1;
  while (idx < total && getItemFromCache(props, idx, gridCache, type).offset < offset) {
    idx += exponent;
    exponent *= 2;
  }
  return bs(props, gridCache, floor(idx / 2), min(idx, total - 1), offset, type);
};
const findItem = (props, gridCache, offset, type) => {
  const [cache, lastVisitedIndex] = [
    gridCache[type],
    gridCache[ACCESS_LAST_VISITED_KEY_MAP[type]]
  ];
  const lastVisitedItemOffset = lastVisitedIndex > 0 ? cache[lastVisitedIndex].offset : 0;
  if (lastVisitedItemOffset >= offset) {
    return bs(props, gridCache, 0, lastVisitedIndex, offset, type);
  }
  return es(props, gridCache, max(0, lastVisitedIndex), offset, type);
};
const getEstimatedTotalHeight = ({ totalRow }, { estimatedRowHeight, lastVisitedRowIndex, row }) => {
  let sizeOfVisitedRows = 0;
  if (lastVisitedRowIndex >= totalRow) {
    lastVisitedRowIndex = totalRow - 1;
  }
  if (lastVisitedRowIndex >= 0) {
    const item = row[lastVisitedRowIndex];
    sizeOfVisitedRows = item.offset + item.size;
  }
  const unvisitedItems = totalRow - lastVisitedRowIndex - 1;
  const sizeOfUnvisitedItems = unvisitedItems * estimatedRowHeight;
  return sizeOfVisitedRows + sizeOfUnvisitedItems;
};
const getEstimatedTotalWidth = ({ totalColumn }, { column, estimatedColumnWidth, lastVisitedColumnIndex }) => {
  let sizeOfVisitedColumns = 0;
  if (lastVisitedColumnIndex > totalColumn) {
    lastVisitedColumnIndex = totalColumn - 1;
  }
  if (lastVisitedColumnIndex >= 0) {
    const item = column[lastVisitedColumnIndex];
    sizeOfVisitedColumns = item.offset + item.size;
  }
  const unvisitedItems = totalColumn - lastVisitedColumnIndex - 1;
  const sizeOfUnvisitedItems = unvisitedItems * estimatedColumnWidth;
  return sizeOfVisitedColumns + sizeOfUnvisitedItems;
};
const ACCESS_ESTIMATED_SIZE_KEY_MAP = {
  column: getEstimatedTotalWidth,
  row: getEstimatedTotalHeight
};
const getOffset = (props, index, alignment, scrollOffset, cache, type, scrollBarWidth) => {
  const [size, estimatedSizeAssociates] = [
    type === "row" ? props.height : props.width,
    ACCESS_ESTIMATED_SIZE_KEY_MAP[type]
  ];
  const item = getItemFromCache(props, index, cache, type);
  const estimatedSize = estimatedSizeAssociates(props, cache);
  const maxOffset = max(0, min(estimatedSize - size, item.offset));
  const minOffset = max(0, item.offset - size + scrollBarWidth + item.size);
  if (alignment === SMART_ALIGNMENT) {
    if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
      alignment = AUTO_ALIGNMENT;
    } else {
      alignment = CENTERED_ALIGNMENT;
    }
  }
  switch (alignment) {
    case START_ALIGNMENT: {
      return maxOffset;
    }
    case END_ALIGNMENT: {
      return minOffset;
    }
    case CENTERED_ALIGNMENT: {
      return Math.round(minOffset + (maxOffset - minOffset) / 2);
    }
    case AUTO_ALIGNMENT:
    default: {
      if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
        return scrollOffset;
      } else if (minOffset > maxOffset) {
        return minOffset;
      } else if (scrollOffset < minOffset) {
        return minOffset;
      } else {
        return maxOffset;
      }
    }
  }
};
const FixedSizeGrid = createGrid({
  name: "ElDynamicSizeGrid",
  getColumnPosition: (props, idx, cache) => {
    const item = getItemFromCache(props, idx, cache, "column");
    return [item.size, item.offset];
  },
  getRowPosition: (props, idx, cache) => {
    const item = getItemFromCache(props, idx, cache, "row");
    return [item.size, item.offset];
  },
  getColumnOffset: (props, columnIndex, alignment, scrollLeft, cache, scrollBarWidth) => getOffset(props, columnIndex, alignment, scrollLeft, cache, "column", scrollBarWidth),
  getRowOffset: (props, rowIndex, alignment, scrollTop, cache, scrollBarWidth) => getOffset(props, rowIndex, alignment, scrollTop, cache, "row", scrollBarWidth),
  getColumnStartIndexForOffset: (props, scrollLeft, cache) => findItem(props, cache, scrollLeft, "column"),
  getColumnStopIndexForStartIndex: (props, startIndex, scrollLeft, cache) => {
    const item = getItemFromCache(props, startIndex, cache, "column");
    const maxOffset = scrollLeft + props.width;
    let offset = item.offset + item.size;
    let stopIndex = startIndex;
    while (stopIndex < props.totalColumn - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemFromCache(props, startIndex, cache, "column").size;
    }
    return stopIndex;
  },
  getEstimatedTotalHeight,
  getEstimatedTotalWidth,
  getRowStartIndexForOffset: (props, scrollTop, cache) => findItem(props, cache, scrollTop, "row"),
  getRowStopIndexForStartIndex: (props, startIndex, scrollTop, cache) => {
    const { totalRow, height } = props;
    const item = getItemFromCache(props, startIndex, cache, "row");
    const maxOffset = scrollTop + height;
    let offset = item.size + item.offset;
    let stopIndex = startIndex;
    while (stopIndex < totalRow - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemFromCache(props, stopIndex, cache, "row").size;
    }
    return stopIndex;
  },
  initCache: ({
    estimatedColumnWidth = DEFAULT_DYNAMIC_LIST_ITEM_SIZE,
    estimatedRowHeight = DEFAULT_DYNAMIC_LIST_ITEM_SIZE
  }) => {
    const cache = {
      column: {},
      estimatedColumnWidth,
      estimatedRowHeight,
      lastVisitedColumnIndex: -1,
      lastVisitedRowIndex: -1,
      row: {}
    };
    return cache;
  },
  clearCache: true,
  validateProps: ({ columnWidth, rowHeight }) => {
    if (process.env.NODE_ENV !== "production") {
      if (!shared.isFunction(columnWidth)) {
        error.throwError(SCOPE, `
          "columnWidth" must be passed as function,
            instead ${typeof columnWidth} was given.
        `);
      }
      if (!shared.isFunction(rowHeight)) {
        error.throwError(SCOPE, `
          "columnWidth" must be passed as function,
            instead ${typeof rowHeight} was given.
        `);
      }
    }
  }
});

exports.DynamicSizeGrid = FixedSizeGrid;
exports.DynamicSizeList = DynamicSizeList;
exports.FixedSizeGrid = FixedSizeGrid$1;
exports.FixedSizeList = FixedSizeList;
exports.virtualizedGridProps = virtualizedGridProps;
exports.virtualizedListProps = virtualizedListProps;
exports.virtualizedProps = virtualizedProps;
exports.virtualizedScrollbarProps = virtualizedScrollbarProps;
