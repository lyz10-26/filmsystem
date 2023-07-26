import { withInstall, withNoopInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, provide, h, inject, openBlock, createElementBlock, normalizeClass, normalizeStyle, createCommentVNode, renderSlot, createElementVNode, toDisplayString } from 'vue';

var script$1 = defineComponent({
  name: "ElTimeline",
  setup(_, ctx) {
    provide("timeline", ctx);
    return () => {
      var _a, _b;
      return h("ul", {
        class: { "el-timeline": true }
      }, (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a));
    };
  }
});

script$1.__file = "packages/components/timeline/src/index.vue";

var script = defineComponent({
  name: "ElTimelineItem",
  props: {
    timestamp: {
      type: String,
      default: ""
    },
    hideTimestamp: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: "bottom"
    },
    type: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "normal"
    },
    icon: {
      type: String,
      default: ""
    },
    hollow: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    inject("timeline");
  }
});

const _hoisted_1 = /* @__PURE__ */ createElementVNode("div", { class: "el-timeline-item__tail" }, null, -1);
const _hoisted_2 = {
  key: 1,
  class: "el-timeline-item__dot"
};
const _hoisted_3 = { class: "el-timeline-item__wrapper" };
const _hoisted_4 = {
  key: 0,
  class: "el-timeline-item__timestamp is-top"
};
const _hoisted_5 = { class: "el-timeline-item__content" };
const _hoisted_6 = {
  key: 1,
  class: "el-timeline-item__timestamp is-bottom"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["el-timeline-item", { "el-timeline-item__center": _ctx.center }])
  }, [
    _hoisted_1,
    !_ctx.$slots.dot ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["el-timeline-item__node", [
        `el-timeline-item__node--${_ctx.size || ""}`,
        `el-timeline-item__node--${_ctx.type || ""}`,
        _ctx.hollow ? "is-hollow" : ""
      ]]),
      style: normalizeStyle({
        backgroundColor: _ctx.color
      })
    }, [
      _ctx.icon ? (openBlock(), createElementBlock("i", {
        key: 0,
        class: normalizeClass(["el-timeline-item__icon", _ctx.icon])
      }, null, 2)) : createCommentVNode("v-if", true)
    ], 6)) : createCommentVNode("v-if", true),
    _ctx.$slots.dot ? (openBlock(), createElementBlock("div", _hoisted_2, [
      renderSlot(_ctx.$slots, "dot")
    ])) : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_3, [
      !_ctx.hideTimestamp && _ctx.placement === "top" ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(_ctx.timestamp), 1)) : createCommentVNode("v-if", true),
      createElementVNode("div", _hoisted_5, [
        renderSlot(_ctx.$slots, "default")
      ]),
      !_ctx.hideTimestamp && _ctx.placement === "bottom" ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(_ctx.timestamp), 1)) : createCommentVNode("v-if", true)
    ])
  ], 2);
}

script.render = render;
script.__file = "packages/components/timeline/src/item.vue";

const ElTimeline = withInstall(script$1, {
  TimelineItem: script
});
const ElTimelineItem = withNoopInstall(script);

export { ElTimeline, ElTimelineItem, ElTimeline as default };
