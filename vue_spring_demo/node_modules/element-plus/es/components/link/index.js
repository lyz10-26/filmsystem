import { withInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, openBlock, createElementBlock, normalizeClass, createCommentVNode, renderSlot } from 'vue';
import { buildProps } from 'element-plus/es/utils/props';

const linkProps = buildProps({
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

var script = defineComponent({
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
  return openBlock(), createElementBlock("a", {
    class: normalizeClass([
      "el-link",
      _ctx.type ? `el-link--${_ctx.type}` : "",
      _ctx.disabled && "is-disabled",
      _ctx.underline && !_ctx.disabled && "is-underline"
    ]),
    href: _ctx.disabled || !_ctx.href ? void 0 : _ctx.href,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.icon ? (openBlock(), createElementBlock("i", {
      key: 0,
      class: normalizeClass(_ctx.icon)
    }, null, 2)) : createCommentVNode("v-if", true),
    _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_2, [
      renderSlot(_ctx.$slots, "default")
    ])) : createCommentVNode("v-if", true),
    _ctx.$slots.icon ? renderSlot(_ctx.$slots, "icon", { key: 2 }) : createCommentVNode("v-if", true)
  ], 10, _hoisted_1);
}

script.render = render;
script.__file = "packages/components/link/src/link.vue";

const ElLink = withInstall(script);

export { ElLink, ElLink as default, linkEmits, linkProps };
