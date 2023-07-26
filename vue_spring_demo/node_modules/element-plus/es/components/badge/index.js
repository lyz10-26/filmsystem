import { withInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, computed, openBlock, createElementBlock, renderSlot, createVNode, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, toDisplayString, vShow } from 'vue';
import { buildProps } from 'element-plus/es/utils/props';

const badgeProps = buildProps({
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

var script = defineComponent({
  name: "ElBadge",
  props: badgeProps,
  setup(props) {
    const content = computed(() => {
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
  return openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default"),
    createVNode(Transition, { name: "el-zoom-in-center" }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("sup", {
          class: normalizeClass(["el-badge__content", [
            "el-badge__content--" + _ctx.type,
            {
              "is-fixed": _ctx.$slots.default,
              "is-dot": _ctx.isDot
            }
          ]]),
          textContent: toDisplayString(_ctx.content)
        }, null, 10, _hoisted_2), [
          [vShow, !_ctx.hidden && (_ctx.content || _ctx.content === "0" || _ctx.isDot)]
        ])
      ]),
      _: 1
    })
  ]);
}

script.render = render;
script.__file = "packages/components/badge/src/badge.vue";

const ElBadge = withInstall(script);

export { ElBadge, badgeProps, ElBadge as default };
