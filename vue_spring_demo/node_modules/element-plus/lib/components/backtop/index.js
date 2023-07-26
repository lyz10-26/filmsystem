'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var core = require('@vueuse/core');
var animation = require('element-plus/lib/utils/animation');
var error = require('element-plus/lib/utils/error');

const backtopProps = {
  visibilityHeight: {
    type: Number,
    default: 200
  },
  target: {
    type: String,
    default: ""
  },
  right: {
    type: Number,
    default: 40
  },
  bottom: {
    type: Number,
    default: 40
  }
};
const backtopEmits = {
  click: (evt) => evt instanceof MouseEvent
};

const COMPONENT_NAME = "ElBacktop";
var script = vue.defineComponent({
  name: COMPONENT_NAME,
  props: backtopProps,
  emits: backtopEmits,
  setup(props, { emit }) {
    const el = vue.shallowRef(document.documentElement);
    const container = vue.shallowRef(document);
    const visible = vue.ref(false);
    const styleBottom = vue.computed(() => `${props.bottom}px`);
    const styleRight = vue.computed(() => `${props.right}px`);
    const scrollToTop = () => {
      if (!el.value)
        return;
      const beginTime = Date.now();
      const beginValue = el.value.scrollTop;
      const frameFunc = () => {
        if (!el.value)
          return;
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.value.scrollTop = beginValue * (1 - animation.easeInOutCubic(progress));
          requestAnimationFrame(frameFunc);
        } else {
          el.value.scrollTop = 0;
        }
      };
      requestAnimationFrame(frameFunc);
    };
    const handleScroll = () => {
      if (el.value)
        visible.value = el.value.scrollTop >= props.visibilityHeight;
    };
    const handleClick = (event) => {
      scrollToTop();
      emit("click", event);
    };
    const handleScrollThrottled = core.useThrottleFn(handleScroll, 300);
    vue.onMounted(() => {
      var _a;
      if (props.target) {
        el.value = (_a = document.querySelector(props.target)) != null ? _a : void 0;
        if (!el.value) {
          error.throwError(COMPONENT_NAME, `target is not existed: ${props.target}`);
        }
        container.value = el.value;
      }
      core.useEventListener(container, "scroll", handleScrollThrottled);
    });
    return {
      visible,
      styleBottom,
      styleRight,
      handleClick
    };
  }
});

const _hoisted_1 = /* @__PURE__ */ vue.createElementVNode("i", { class: "el-icon-caret-top" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Transition, { name: "el-fade-in" }, {
    default: vue.withCtx(() => [
      _ctx.visible ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        style: vue.normalizeStyle({
          right: _ctx.styleRight,
          bottom: _ctx.styleBottom
        }),
        class: "el-backtop",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.handleClick && _ctx.handleClick(...args), ["stop"]))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          _hoisted_1
        ])
      ], 4)) : vue.createCommentVNode("v-if", true)
    ]),
    _: 3
  });
}

script.render = render;
script.__file = "packages/components/backtop/src/backtop.vue";

const ElBacktop = withInstall.withInstall(script);

exports.ElBacktop = ElBacktop;
exports.backtopEmits = backtopEmits;
exports.backtopProps = backtopProps;
exports["default"] = ElBacktop;
