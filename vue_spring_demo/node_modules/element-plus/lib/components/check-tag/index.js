'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');

const checkTagProps = {
  checked: {
    type: Boolean,
    default: false
  }
};
var script = vue.defineComponent({
  name: "ElCheckTag",
  props: checkTagProps,
  emits: ["change", "update:checked"],
  setup(props, { emit }) {
    const onChange = () => {
      const checked = !props.checked;
      emit("change", checked);
      emit("update:checked", checked);
    };
    return {
      onChange
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("span", {
    class: vue.normalizeClass({
      "el-check-tag": true,
      "is-checked": _ctx.checked
    }),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onChange && _ctx.onChange(...args))
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 2);
}

script.render = render;
script.__file = "packages/components/check-tag/src/index.vue";

const ElCheckTag = withInstall.withInstall(script);

exports.ElCheckTag = ElCheckTag;
exports["default"] = ElCheckTag;
