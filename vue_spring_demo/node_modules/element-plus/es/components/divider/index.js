import { withInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, openBlock, createElementBlock, normalizeClass, renderSlot, createCommentVNode } from 'vue';
import { buildProps } from 'element-plus/es/utils/props';

const dividerProps = buildProps({
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

var script = defineComponent({
  name: "ElDivider",
  props: dividerProps
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["el-divider", `el-divider--${_ctx.direction}`])
  }, [
    _ctx.$slots.default && _ctx.direction !== "vertical" ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["el-divider__text", `is-${_ctx.contentPosition}`])
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)) : createCommentVNode("v-if", true)
  ], 2);
}

script.render = render;
script.__file = "packages/components/divider/src/divider.vue";

const ElDivider = withInstall(script);

export { ElDivider, ElDivider as default, dividerProps };
