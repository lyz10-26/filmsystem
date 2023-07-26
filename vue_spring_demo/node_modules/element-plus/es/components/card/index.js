import { withInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, openBlock, createElementBlock, normalizeClass, renderSlot, createTextVNode, toDisplayString, createCommentVNode, createElementVNode, normalizeStyle } from 'vue';
import { buildProps, definePropType } from 'element-plus/es/utils/props';

const cardProps = buildProps({
  header: {
    type: String,
    default: ""
  },
  bodyStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  shadow: {
    type: String,
    default: ""
  }
});

var script = defineComponent({
  name: "ElCard",
  props: cardProps
});

const _hoisted_1 = {
  key: 0,
  class: "el-card__header"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["el-card", _ctx.shadow ? "is-" + _ctx.shadow + "-shadow" : "is-always-shadow"])
  }, [
    _ctx.$slots.header || _ctx.header ? (openBlock(), createElementBlock("div", _hoisted_1, [
      renderSlot(_ctx.$slots, "header", {}, () => [
        createTextVNode(toDisplayString(_ctx.header), 1)
      ])
    ])) : createCommentVNode("v-if", true),
    createElementVNode("div", {
      class: "el-card__body",
      style: normalizeStyle(_ctx.bodyStyle)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 4)
  ], 2);
}

script.render = render;
script.__file = "packages/components/card/src/card.vue";

const ElCard = withInstall(script);

export { ElCard, cardProps, ElCard as default };
