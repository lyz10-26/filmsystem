'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var props = require('element-plus/lib/utils/props');

const cardProps = props.buildProps({
  header: {
    type: String,
    default: ""
  },
  bodyStyle: {
    type: props.definePropType([String, Object, Array]),
    default: ""
  },
  shadow: {
    type: String,
    default: ""
  }
});

var script = vue.defineComponent({
  name: "ElCard",
  props: cardProps
});

const _hoisted_1 = {
  key: 0,
  class: "el-card__header"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["el-card", _ctx.shadow ? "is-" + _ctx.shadow + "-shadow" : "is-always-shadow"])
  }, [
    _ctx.$slots.header || _ctx.header ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
      vue.renderSlot(_ctx.$slots, "header", {}, () => [
        vue.createTextVNode(vue.toDisplayString(_ctx.header), 1)
      ])
    ])) : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", {
      class: "el-card__body",
      style: vue.normalizeStyle(_ctx.bodyStyle)
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 4)
  ], 2);
}

script.render = render;
script.__file = "packages/components/card/src/card.vue";

const ElCard = withInstall.withInstall(script);

exports.ElCard = ElCard;
exports.cardProps = cardProps;
exports["default"] = ElCard;
