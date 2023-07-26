import { withInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, openBlock, createElementBlock, normalizeClass, renderSlot } from 'vue';

const checkTagProps = {
  checked: {
    type: Boolean,
    default: false
  }
};
var script = defineComponent({
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
  return openBlock(), createElementBlock("span", {
    class: normalizeClass({
      "el-check-tag": true,
      "is-checked": _ctx.checked
    }),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onChange && _ctx.onChange(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}

script.render = render;
script.__file = "packages/components/check-tag/src/index.vue";

const ElCheckTag = withInstall(script);

export { ElCheckTag, ElCheckTag as default };
