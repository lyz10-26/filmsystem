import { withInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, ref, computed, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, createElementBlock, createCommentVNode, renderSlot, createTextVNode, toDisplayString, vShow } from 'vue';
import { buildProps, keyOf } from 'element-plus/es/utils/props';

const ALERT_TYPE_CLASSES_MAP = {
  success: "el-icon-success",
  warning: "el-icon-warning",
  error: "el-icon-error",
  info: "el-icon-info"
};
const alertProps = buildProps({
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    values: keyOf(ALERT_TYPE_CLASSES_MAP),
    default: "info"
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeText: {
    type: String,
    default: ""
  },
  showIcon: Boolean,
  center: Boolean,
  effect: {
    type: String,
    values: ["light", "dark"],
    default: "light"
  }
});
const alertEmits = {
  close: (evt) => evt instanceof MouseEvent
};

var script = defineComponent({
  name: "ElAlert",
  props: alertProps,
  emits: alertEmits,
  setup(props, { emit, slots }) {
    const visible = ref(true);
    const typeClass = computed(() => `el-alert--${props.type}`);
    const iconClass = computed(() => ALERT_TYPE_CLASSES_MAP[props.type] || ALERT_TYPE_CLASSES_MAP["info"]);
    const isBigIcon = computed(() => props.description || slots.default ? "is-big" : "");
    const isBoldTitle = computed(() => props.description || slots.default ? "is-bold" : "");
    const close = (evt) => {
      visible.value = false;
      emit("close", evt);
    };
    return {
      visible,
      typeClass,
      iconClass,
      isBigIcon,
      isBoldTitle,
      close
    };
  }
});

const _hoisted_1 = { class: "el-alert__content" };
const _hoisted_2 = {
  key: 1,
  class: "el-alert__description"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: "el-alert-fade" }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        class: normalizeClass(["el-alert", [_ctx.typeClass, _ctx.center ? "is-center" : "", "is-" + _ctx.effect]]),
        role: "alert"
      }, [
        _ctx.showIcon ? (openBlock(), createElementBlock("i", {
          key: 0,
          class: normalizeClass(["el-alert__icon", [_ctx.iconClass, _ctx.isBigIcon]])
        }, null, 2)) : createCommentVNode("v-if", true),
        createElementVNode("div", _hoisted_1, [
          _ctx.title || _ctx.$slots.title ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(["el-alert__title", [_ctx.isBoldTitle]])
          }, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ])
          ], 2)) : createCommentVNode("v-if", true),
          _ctx.$slots.default || _ctx.description ? (openBlock(), createElementBlock("p", _hoisted_2, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(_ctx.description), 1)
            ])
          ])) : createCommentVNode("v-if", true),
          _ctx.closable ? (openBlock(), createElementBlock("i", {
            key: 2,
            class: normalizeClass(["el-alert__closebtn", {
              "is-customed": _ctx.closeText !== "",
              "el-icon-close": _ctx.closeText === ""
            }]),
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args))
          }, toDisplayString(_ctx.closeText), 3)) : createCommentVNode("v-if", true)
        ])
      ], 2), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 3
  });
}

script.render = render;
script.__file = "packages/components/alert/src/alert.vue";

const ElAlert = withInstall(script);

export { ALERT_TYPE_CLASSES_MAP, ElAlert, alertEmits, alertProps, ElAlert as default };
