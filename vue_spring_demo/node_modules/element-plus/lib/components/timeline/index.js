'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');

var script$1 = vue.defineComponent({
  name: "ElTimeline",
  setup(_, ctx) {
    vue.provide("timeline", ctx);
    return () => {
      var _a, _b;
      return vue.h("ul", {
        class: { "el-timeline": true }
      }, (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a));
    };
  }
});

script$1.__file = "packages/components/timeline/src/index.vue";

var script = vue.defineComponent({
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
    vue.inject("timeline");
  }
});

const _hoisted_1 = /* @__PURE__ */ vue.createElementVNode("div", { class: "el-timeline-item__tail" }, null, -1);
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
  return vue.openBlock(), vue.createElementBlock("li", {
    class: vue.normalizeClass(["el-timeline-item", { "el-timeline-item__center": _ctx.center }])
  }, [
    _hoisted_1,
    !_ctx.$slots.dot ? (vue.openBlock(), vue.createElementBlock("div", {
      key: 0,
      class: vue.normalizeClass(["el-timeline-item__node", [
        `el-timeline-item__node--${_ctx.size || ""}`,
        `el-timeline-item__node--${_ctx.type || ""}`,
        _ctx.hollow ? "is-hollow" : ""
      ]]),
      style: vue.normalizeStyle({
        backgroundColor: _ctx.color
      })
    }, [
      _ctx.icon ? (vue.openBlock(), vue.createElementBlock("i", {
        key: 0,
        class: vue.normalizeClass(["el-timeline-item__icon", _ctx.icon])
      }, null, 2)) : vue.createCommentVNode("v-if", true)
    ], 6)) : vue.createCommentVNode("v-if", true),
    _ctx.$slots.dot ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
      vue.renderSlot(_ctx.$slots, "dot")
    ])) : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", _hoisted_3, [
      !_ctx.hideTimestamp && _ctx.placement === "top" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, vue.toDisplayString(_ctx.timestamp), 1)) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("div", _hoisted_5, [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      !_ctx.hideTimestamp && _ctx.placement === "bottom" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, vue.toDisplayString(_ctx.timestamp), 1)) : vue.createCommentVNode("v-if", true)
    ])
  ], 2);
}

script.render = render;
script.__file = "packages/components/timeline/src/item.vue";

const ElTimeline = withInstall.withInstall(script$1, {
  TimelineItem: script
});
const ElTimelineItem = withInstall.withNoopInstall(script);

exports.ElTimeline = ElTimeline;
exports.ElTimelineItem = ElTimelineItem;
exports["default"] = ElTimeline;
