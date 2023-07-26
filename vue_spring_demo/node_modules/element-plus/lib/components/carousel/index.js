'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var throttle = require('lodash/throttle');
var resizeEvent = require('element-plus/lib/utils/resize-event');
var error = require('element-plus/lib/utils/error');
var util = require('element-plus/lib/utils/util');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var throttle__default = /*#__PURE__*/_interopDefaultLegacy(throttle);

var script$1 = vue.defineComponent({
  name: "ElCarousel",
  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: { type: String, default: "" },
    trigger: {
      type: String,
      default: "hover"
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3e3
    },
    indicatorPosition: { type: String, default: "" },
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: "hover"
    },
    type: { type: String, default: "" },
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].includes(val);
      }
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    }
  },
  emits: ["change"],
  setup(props, { emit }) {
    const data = vue.reactive({
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    });
    const root = vue.ref(null);
    const items = vue.ref([]);
    const arrowDisplay = vue.computed(() => props.arrow !== "never" && props.direction !== "vertical");
    const hasLabel = vue.computed(() => {
      return items.value.some((item) => item.label.toString().length > 0);
    });
    const carouselClasses = vue.computed(() => {
      const classes = ["el-carousel", `el-carousel--${props.direction}`];
      if (props.type === "card") {
        classes.push("el-carousel--card");
      }
      return classes;
    });
    const indicatorsClasses = vue.computed(() => {
      const classes = [
        "el-carousel__indicators",
        `el-carousel__indicators--${props.direction}`
      ];
      if (hasLabel.value) {
        classes.push("el-carousel__indicators--labels");
      }
      if (props.indicatorPosition === "outside" || props.type === "card") {
        classes.push("el-carousel__indicators--outside");
      }
      return classes;
    });
    const throttledArrowClick = throttle__default["default"]((index) => {
      setActiveItem(index);
    }, 300, { trailing: true });
    const throttledIndicatorHover = throttle__default["default"]((index) => {
      handleIndicatorHover(index);
    }, 300);
    function pauseTimer() {
      if (data.timer) {
        clearInterval(data.timer);
        data.timer = null;
      }
    }
    function startTimer() {
      if (props.interval <= 0 || !props.autoplay || data.timer)
        return;
      data.timer = setInterval(() => playSlides(), props.interval);
    }
    const playSlides = () => {
      if (data.activeIndex < items.value.length - 1) {
        data.activeIndex = data.activeIndex + 1;
      } else if (props.loop) {
        data.activeIndex = 0;
      }
    };
    function setActiveItem(index) {
      if (typeof index === "string") {
        const filteredItems = items.value.filter((item) => item.name === index);
        if (filteredItems.length > 0) {
          index = items.value.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        error.debugWarn("Carousel", "index must be an integer.");
        return;
      }
      const length = items.value.length;
      const oldIndex = data.activeIndex;
      if (index < 0) {
        data.activeIndex = props.loop ? length - 1 : 0;
      } else if (index >= length) {
        data.activeIndex = props.loop ? 0 : length - 1;
      } else {
        data.activeIndex = index;
      }
      if (oldIndex === data.activeIndex) {
        resetItemPosition(oldIndex);
      }
    }
    function resetItemPosition(oldIndex) {
      items.value.forEach((item, index) => {
        item.translateItem(index, data.activeIndex, oldIndex);
      });
    }
    function addItem(item) {
      items.value.push(item);
    }
    function removeItem(uid) {
      const index = items.value.findIndex((item) => item.uid === uid);
      if (index !== -1) {
        items.value.splice(index, 1);
        if (data.activeIndex === index)
          next();
      }
    }
    function itemInStage(item, index) {
      const length = items.value.length;
      if (index === length - 1 && item.inStage && items.value[0].active || item.inStage && items.value[index + 1] && items.value[index + 1].active) {
        return "left";
      } else if (index === 0 && item.inStage && items.value[length - 1].active || item.inStage && items.value[index - 1] && items.value[index - 1].active) {
        return "right";
      }
      return false;
    }
    function handleMouseEnter() {
      data.hover = true;
      if (props.pauseOnHover) {
        pauseTimer();
      }
    }
    function handleMouseLeave() {
      data.hover = false;
      startTimer();
    }
    function handleButtonEnter(arrow) {
      if (props.direction === "vertical")
        return;
      items.value.forEach((item, index) => {
        if (arrow === itemInStage(item, index)) {
          item.hover = true;
        }
      });
    }
    function handleButtonLeave() {
      if (props.direction === "vertical")
        return;
      items.value.forEach((item) => {
        item.hover = false;
      });
    }
    function handleIndicatorClick(index) {
      data.activeIndex = index;
    }
    function handleIndicatorHover(index) {
      if (props.trigger === "hover" && index !== data.activeIndex) {
        data.activeIndex = index;
      }
    }
    function prev() {
      setActiveItem(data.activeIndex - 1);
    }
    function next() {
      setActiveItem(data.activeIndex + 1);
    }
    vue.watch(() => data.activeIndex, (current, prev2) => {
      resetItemPosition(prev2);
      if (prev2 > -1) {
        emit("change", current, prev2);
      }
    });
    vue.watch(() => props.autoplay, (current) => {
      current ? startTimer() : pauseTimer();
    });
    vue.watch(() => props.loop, () => {
      setActiveItem(data.activeIndex);
    });
    vue.onMounted(() => {
      vue.nextTick(() => {
        resizeEvent.addResizeListener(root.value, resetItemPosition);
        if (props.initialIndex < items.value.length && props.initialIndex >= 0) {
          data.activeIndex = props.initialIndex;
        }
        startTimer();
      });
    });
    vue.onBeforeUnmount(() => {
      if (root.value)
        resizeEvent.removeResizeListener(root.value, resetItemPosition);
      pauseTimer();
    });
    vue.provide("injectCarouselScope", {
      root,
      direction: props.direction,
      type: props.type,
      items,
      loop: props.loop,
      addItem,
      removeItem,
      setActiveItem
    });
    return {
      data,
      props,
      items,
      arrowDisplay,
      carouselClasses,
      indicatorsClasses,
      hasLabel,
      handleMouseEnter,
      handleMouseLeave,
      handleIndicatorClick,
      throttledArrowClick,
      throttledIndicatorHover,
      handleButtonEnter,
      handleButtonLeave,
      prev,
      next,
      setActiveItem,
      root
    };
  }
});

const _hoisted_1$1 = /* @__PURE__ */ vue.createElementVNode("i", { class: "el-icon-arrow-left" }, null, -1);
const _hoisted_2 = [
  _hoisted_1$1
];
const _hoisted_3 = /* @__PURE__ */ vue.createElementVNode("i", { class: "el-icon-arrow-right" }, null, -1);
const _hoisted_4 = [
  _hoisted_3
];
const _hoisted_5 = ["onMouseenter", "onClick"];
const _hoisted_6 = { class: "el-carousel__button" };
const _hoisted_7 = { key: 0 };
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    ref: "root",
    class: vue.normalizeClass(_ctx.carouselClasses),
    onMouseenter: _cache[6] || (_cache[6] = vue.withModifiers((...args) => _ctx.handleMouseEnter && _ctx.handleMouseEnter(...args), ["stop"])),
    onMouseleave: _cache[7] || (_cache[7] = vue.withModifiers((...args) => _ctx.handleMouseLeave && _ctx.handleMouseLeave(...args), ["stop"]))
  }, [
    vue.createElementVNode("div", {
      class: "el-carousel__container",
      style: vue.normalizeStyle({ height: _ctx.height })
    }, [
      _ctx.arrowDisplay ? (vue.openBlock(), vue.createBlock(vue.Transition, {
        key: 0,
        name: "carousel-arrow-left"
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode("button", {
            type: "button",
            class: "el-carousel__arrow el-carousel__arrow--left",
            onMouseenter: _cache[0] || (_cache[0] = ($event) => _ctx.handleButtonEnter("left")),
            onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.handleButtonLeave && _ctx.handleButtonLeave(...args)),
            onClick: _cache[2] || (_cache[2] = vue.withModifiers(($event) => _ctx.throttledArrowClick(_ctx.data.activeIndex - 1), ["stop"]))
          }, _hoisted_2, 544), [
            [
              vue.vShow,
              (_ctx.arrow === "always" || _ctx.data.hover) && (_ctx.props.loop || _ctx.data.activeIndex > 0)
            ]
          ])
        ]),
        _: 1
      })) : vue.createCommentVNode("v-if", true),
      _ctx.arrowDisplay ? (vue.openBlock(), vue.createBlock(vue.Transition, {
        key: 1,
        name: "carousel-arrow-right"
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode("button", {
            type: "button",
            class: "el-carousel__arrow el-carousel__arrow--right",
            onMouseenter: _cache[3] || (_cache[3] = ($event) => _ctx.handleButtonEnter("right")),
            onMouseleave: _cache[4] || (_cache[4] = (...args) => _ctx.handleButtonLeave && _ctx.handleButtonLeave(...args)),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers(($event) => _ctx.throttledArrowClick(_ctx.data.activeIndex + 1), ["stop"]))
          }, _hoisted_4, 544), [
            [
              vue.vShow,
              (_ctx.arrow === "always" || _ctx.data.hover) && (_ctx.props.loop || _ctx.data.activeIndex < _ctx.items.length - 1)
            ]
          ])
        ]),
        _: 1
      })) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default")
    ], 4),
    _ctx.indicatorPosition !== "none" ? (vue.openBlock(), vue.createElementBlock("ul", {
      key: 0,
      class: vue.normalizeClass(_ctx.indicatorsClasses)
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.items, (item, index) => {
        return vue.openBlock(), vue.createElementBlock("li", {
          key: index,
          class: vue.normalizeClass([
            "el-carousel__indicator",
            "el-carousel__indicator--" + _ctx.direction,
            { "is-active": index === _ctx.data.activeIndex }
          ]),
          onMouseenter: ($event) => _ctx.throttledIndicatorHover(index),
          onClick: vue.withModifiers(($event) => _ctx.handleIndicatorClick(index), ["stop"])
        }, [
          vue.createElementVNode("button", _hoisted_6, [
            _ctx.hasLabel ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7, vue.toDisplayString(item.label), 1)) : vue.createCommentVNode("v-if", true)
          ])
        ], 42, _hoisted_5);
      }), 128))
    ], 2)) : vue.createCommentVNode("v-if", true)
  ], 34);
}

script$1.render = render$1;
script$1.__file = "packages/components/carousel/src/main.vue";

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
const CARD_SCALE = 0.83;
var script = vue.defineComponent({
  name: "ElCarouselItem",
  props: {
    name: { type: String, default: "" },
    label: {
      type: [String, Number],
      default: ""
    }
  },
  setup(props) {
    const instance = vue.getCurrentInstance();
    instance.uid;
    const data = vue.reactive({
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    });
    const injectCarouselScope = vue.inject("injectCarouselScope");
    const parentDirection = vue.computed(() => {
      return injectCarouselScope.direction;
    });
    const itemStyle = vue.computed(() => {
      const translateType = parentDirection.value === "vertical" ? "translateY" : "translateX";
      const value = `${translateType}(${data.translate}px) scale(${data.scale})`;
      const style = {
        transform: value
      };
      return util.autoprefixer(style);
    });
    function processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    }
    function calcCardTranslate(index, activeIndex) {
      var _a;
      const parentWidth = ((_a = injectCarouselScope.root.value) == null ? void 0 : _a.offsetWidth) || 0;
      if (data.inStage) {
        return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
      } else if (index < activeIndex) {
        return -(1 + CARD_SCALE) * parentWidth / 4;
      } else {
        return (3 + CARD_SCALE) * parentWidth / 4;
      }
    }
    function calcTranslate(index, activeIndex, isVertical) {
      var _a, _b;
      const distance = (isVertical ? (_a = injectCarouselScope.root.value) == null ? void 0 : _a.offsetHeight : (_b = injectCarouselScope.root.value) == null ? void 0 : _b.offsetWidth) || 0;
      return distance * (index - activeIndex);
    }
    const translateItem = (index, activeIndex, oldIndex) => {
      const parentType = injectCarouselScope.type;
      const length = injectCarouselScope.items.value.length;
      if (parentType !== "card" && oldIndex !== void 0) {
        data.animating = index === activeIndex || index === oldIndex;
      }
      if (index !== activeIndex && length > 2 && injectCarouselScope.loop) {
        index = processIndex(index, activeIndex, length);
      }
      if (parentType === "card") {
        if (parentDirection.value === "vertical") {
          error.debugWarn("Carousel", "vertical direction is not supported in card mode");
        }
        data.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        data.active = index === activeIndex;
        data.translate = calcCardTranslate(index, activeIndex);
        data.scale = data.active ? 1 : CARD_SCALE;
      } else {
        data.active = index === activeIndex;
        const isVertical = parentDirection.value === "vertical";
        data.translate = calcTranslate(index, activeIndex, isVertical);
      }
      data.ready = true;
    };
    function handleItemClick() {
      if (injectCarouselScope && injectCarouselScope.type === "card") {
        const index = injectCarouselScope.items.value.map((d) => d.uid).indexOf(instance.uid);
        injectCarouselScope.setActiveItem(index);
      }
    }
    vue.onMounted(() => {
      if (injectCarouselScope.addItem) {
        injectCarouselScope.addItem(__spreadProps(__spreadValues(__spreadValues({
          uid: instance.uid
        }, props), vue.toRefs(data)), {
          translateItem
        }));
      }
    });
    vue.onUnmounted(() => {
      if (injectCarouselScope.removeItem) {
        injectCarouselScope.removeItem(instance.uid);
      }
    });
    return {
      data,
      itemStyle,
      translateItem,
      type: injectCarouselScope.type,
      handleItemClick
    };
  }
});

const _hoisted_1 = {
  key: 0,
  class: "el-carousel__mask"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["el-carousel__item", {
      "is-active": _ctx.data.active,
      "el-carousel__item--card": _ctx.type === "card",
      "is-in-stage": _ctx.data.inStage,
      "is-hover": _ctx.data.hover,
      "is-animating": _ctx.data.animating
    }]),
    style: vue.normalizeStyle(_ctx.itemStyle),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleItemClick && _ctx.handleItemClick(...args))
  }, [
    _ctx.type === "card" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", _hoisted_1, null, 512)), [
      [vue.vShow, !_ctx.data.active]
    ]) : vue.createCommentVNode("v-if", true),
    vue.renderSlot(_ctx.$slots, "default")
  ], 6)), [
    [vue.vShow, _ctx.data.ready]
  ]);
}

script.render = render;
script.__file = "packages/components/carousel/src/item.vue";

const ElCarousel = withInstall.withInstall(script$1, {
  CarouselItem: script
});
const ElCarouselItem = withInstall.withNoopInstall(script);

exports.ElCarousel = ElCarousel;
exports.ElCarouselItem = ElCarouselItem;
exports["default"] = ElCarousel;
