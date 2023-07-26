'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var props = require('element-plus/lib/utils/props');

const badgeProps = props.buildProps({
  value: {
    type: [String, Number],
    default: ""
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: Boolean,
  hidden: Boolean,
  type: {
    type: String,
    values: ["primary", "success", "warning", "info", "danger"],
    default: "danger"
  }
});

var script = vue.defineComponent({
  name: "ElBadge",
  props: badgeProps,
  setup(props) {
    const content = vue.computed(() => {
      if (props.isDot)
        return "";
      if (typeof props.value === "number" && typeof props.max === "number") {
        return props.max < props.value ? `${props.max}+` : `${props.value}`;
      }
      return `${props.value}`;
    });
    return {
      content
    };
  }
});

const _hoisted_1 = { class: "el-badge" };
const _hoisted_2 = ["textContent"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.renderSlot(_ctx.$slots, "default"),
    vue.createVNode(vue.Transition, { name: "el-zoom-in-center" }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createElementVNode("sup", {
          class: vue.normalizeClass(["el-badge__content", [
            "el-badge__content--" + _ctx.type,
            {
              "is-fixed": _ctx.$slots.default,
              "is-dot": _ctx.isDot
            }
          ]]),
          textContent: vue.toDisplayString(_ctx.content)
        }, null, 10, _hoisted_2), [
          [vue.vShow, !_ctx.hidden && (_ctx.content || _ctx.content === "0" || _ctx.isDot)]
        ])
      ]),
      _: 1
    })
  ]);
}

script.render = render;
script.__file = "packages/components/badge/src/badge.vue";

const ElBadge = withInstall.withInstall(script);

exports.ElBadge = ElBadge;
exports.badgeProps = badgeProps;
exports["default"] = ElBadge;
