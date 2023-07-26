'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var props = require('element-plus/lib/utils/props');

const linkProps = props.buildProps({
  type: {
    type: String,
    values: ["primary", "success", "warning", "info", "danger", "default"],
    default: "default"
  },
  underline: {
    type: Boolean,
    default: true
  },
  disabled: { type: Boolean, default: false },
  href: { type: String, default: "" },
  icon: { type: String, default: "" }
});
const linkEmits = {
  click: (evt) => evt instanceof MouseEvent
};

var script = vue.defineComponent({
  name: "ElLink",
  props: linkProps,
  emits: linkEmits,
  setup(props, { emit }) {
    function handleClick(event) {
      if (!props.disabled)
        emit("click", event);
    }
    return {
      handleClick
    };
  }
});

const _hoisted_1 = ["href"];
const _hoisted_2 = {
  key: 1,
  class: "el-link--inner"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("a", {
    class: vue.normalizeClass([
      "el-link",
      _ctx.type ? `el-link--${_ctx.type}` : "",
      _ctx.disabled && "is-disabled",
      _ctx.underline && !_ctx.disabled && "is-underline"
    ]),
    href: _ctx.disabled || !_ctx.href ? void 0 : _ctx.href,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.icon ? (vue.openBlock(), vue.createElementBlock("i", {
      key: 0,
      class: vue.normalizeClass(_ctx.icon)
    }, null, 2)) : vue.createCommentVNode("v-if", true),
    _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, [
      vue.renderSlot(_ctx.$slots, "default")
    ])) : vue.createCommentVNode("v-if", true),
    _ctx.$slots.icon ? vue.renderSlot(_ctx.$slots, "icon", { key: 2 }) : vue.createCommentVNode("v-if", true)
  ], 10, _hoisted_1);
}

script.render = render;
script.__file = "packages/components/link/src/link.vue";

const ElLink = withInstall.withInstall(script);

exports.ElLink = ElLink;
exports["default"] = ElLink;
exports.linkEmits = linkEmits;
exports.linkProps = linkProps;
