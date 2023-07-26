'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');

const iconProps = {
  size: {
    type: Number
  },
  color: {
    type: String
  }
};

var __defProp = Object.defineProperty;
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
var script = vue.defineComponent({
  name: "ElIcon",
  inheritAttrs: false,
  props: iconProps,
  setup(props) {
    return {
      style: vue.computed(() => {
        if (!props.size && !props.color) {
          return {};
        }
        return __spreadValues(__spreadValues({}, props.size ? { "--font-size": `${props.size}px` } : {}), props.color ? { "--color": props.color } : {});
      })
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
    class: "el-icon",
    style: _ctx.style
  }, _ctx.$attrs), [
    vue.renderSlot(_ctx.$slots, "default")
  ], 16);
}

script.render = render;
script.__file = "packages/components/icon/src/icon.vue";

const ElIcon = withInstall.withInstall(script);

exports.ElIcon = ElIcon;
exports["default"] = ElIcon;
exports.iconProps = iconProps;
