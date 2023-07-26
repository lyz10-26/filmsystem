import { withInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, shallowRef, ref, computed, onMounted, openBlock, createBlock, Transition, withCtx, createElementBlock, normalizeStyle, withModifiers, renderSlot, createCommentVNode, createElementVNode } from 'vue';
import { useThrottleFn, useEventListener } from '@vueuse/core';
import { easeInOutCubic } from 'element-plus/es/utils/animation';
import { throwError } from 'element-plus/es/utils/error';

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
var script = defineComponent({
  name: COMPONENT_NAME,
  props: backtopProps,
  emits: backtopEmits,
  setup(props, { emit }) {
    const el = shallowRef(document.documentElement);
    const container = shallowRef(document);
    const visible = ref(false);
    const styleBottom = computed(() => `${props.bottom}px`);
    const styleRight = computed(() => `${props.right}px`);
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
          el.value.scrollTop = beginValue * (1 - easeInOutCubic(progress));
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
    const handleScrollThrottled = useThrottleFn(handleScroll, 300);
    onMounted(() => {
      var _a;
      if (props.target) {
        el.value = (_a = document.querySelector(props.target)) != null ? _a : void 0;
        if (!el.value) {
          throwError(COMPONENT_NAME, `target is not existed: ${props.target}`);
        }
        container.value = el.value;
      }
      useEventListener(container, "scroll", handleScrollThrottled);
    });
    return {
      visible,
      styleBottom,
      styleRight,
      handleClick
    };
  }
});

const _hoisted_1 = /* @__PURE__ */ createElementVNode("i", { class: "el-icon-caret-top" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: "el-fade-in" }, {
    default: withCtx(() => [
      _ctx.visible ? (openBlock(), createElementBlock("div", {
        key: 0,
        style: normalizeStyle({
          right: _ctx.styleRight,
          bottom: _ctx.styleBottom
        }),
        class: "el-backtop",
        onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.handleClick && _ctx.handleClick(...args), ["stop"]))
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          _hoisted_1
        ])
      ], 4)) : createCommentVNode("v-if", true)
    ]),
    _: 3
  });
}

script.render = render;
script.__file = "packages/components/backtop/src/backtop.vue";

const ElBacktop = withInstall(script);

export { ElBacktop, backtopEmits, backtopProps, ElBacktop as default };
