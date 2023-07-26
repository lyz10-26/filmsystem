'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var props = require('element-plus/lib/utils/props');

const ALERT_TYPE_CLASSES_MAP = {
  success: "el-icon-success",
  warning: "el-icon-warning",
  error: "el-icon-error",
  info: "el-icon-info"
};
const alertProps = props.buildProps({
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
    values: props.keyOf(ALERT_TYPE_CLASSES_MAP),
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

var script = vue.defineComponent({
  name: "ElAlert",
  props: alertProps,
  emits: alertEmits,
  setup(props, { emit, slots }) {
    const visible = vue.ref(true);
    const typeClass = vue.computed(() => `el-alert--${props.type}`);
    const iconClass = vue.computed(() => ALERT_TYPE_CLASSES_MAP[props.type] || ALERT_TYPE_CLASSES_MAP["info"]);
    const isBigIcon = vue.computed(() => props.description || slots.default ? "is-big" : "");
    const isBoldTitle = vue.computed(() => props.description || slots.default ? "is-bold" : "");
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
  return vue.openBlock(), vue.createBlock(vue.Transition, { name: "el-alert-fade" }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createElementVNode("div", {
        class: vue.normalizeClass(["el-alert", [_ctx.typeClass, _ctx.center ? "is-center" : "", "is-" + _ctx.effect]]),
        role: "alert"
      }, [
        _ctx.showIcon ? (vue.openBlock(), vue.createElementBlock("i", {
          key: 0,
          class: vue.normalizeClass(["el-alert__icon", [_ctx.iconClass, _ctx.isBigIcon]])
        }, null, 2)) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("div", _hoisted_1, [
          _ctx.title || _ctx.$slots.title ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            class: vue.normalizeClass(["el-alert__title", [_ctx.isBoldTitle]])
          }, [
            vue.renderSlot(_ctx.$slots, "title", {}, () => [
              vue.createTextVNode(vue.toDisplayString(_ctx.title), 1)
            ])
          ], 2)) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.default || _ctx.description ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_2, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createTextVNode(vue.toDisplayString(_ctx.description), 1)
            ])
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.closable ? (vue.openBlock(), vue.createElementBlock("i", {
            key: 2,
            class: vue.normalizeClass(["el-alert__closebtn", {
              "is-customed": _ctx.closeText !== "",
              "el-icon-close": _ctx.closeText === ""
            }]),
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args))
          }, vue.toDisplayString(_ctx.closeText), 3)) : vue.createCommentVNode("v-if", true)
        ])
      ], 2), [
        [vue.vShow, _ctx.visible]
      ])
    ]),
    _: 3
  });
}

script.render = render;
script.__file = "packages/components/alert/src/alert.vue";

const ElAlert = withInstall.withInstall(script);

exports.ALERT_TYPE_CLASSES_MAP = ALERT_TYPE_CLASSES_MAP;
exports.ElAlert = ElAlert;
exports.alertEmits = alertEmits;
exports.alertProps = alertProps;
exports["default"] = ElAlert;
