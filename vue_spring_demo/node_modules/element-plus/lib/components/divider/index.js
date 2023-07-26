'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var props = require('element-plus/lib/utils/props');

const dividerProps = props.buildProps({
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  contentPosition: {
    type: String,
    values: ["left", "center", "right"],
    default: "center"
  }
});

var script = vue.defineComponent({
  name: "ElDivider",
  props: dividerProps
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["el-divider", `el-divider--${_ctx.direction}`])
  }, [
    _ctx.$slots.default && _ctx.direction !== "vertical" ? (vue.openBlock(), vue.createElementBlock("div", {
      key: 0,
      class: vue.normalizeClass(["el-divider__text", `is-${_ctx.contentPosition}`])
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 2)) : vue.createCommentVNode("v-if", true)
  ], 2);
}

script.render = render;
script.__file = "packages/components/divider/src/divider.vue";

const ElDivider = withInstall.withInstall(script);

exports.ElDivider = ElDivider;
exports["default"] = ElDivider;
exports.dividerProps = dividerProps;
