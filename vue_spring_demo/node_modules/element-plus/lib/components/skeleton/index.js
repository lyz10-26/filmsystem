'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var hooks = require('element-plus/lib/hooks');

var script$2 = vue.defineComponent({
  name: "ImgPlaceholder"
});

const _hoisted_1 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2 = /* @__PURE__ */ vue.createElementVNode("path", { d: "M64 896V128h896v768H64z m64-128l192-192 116.352 116.352L640 448l256 307.2V192H128v576z m224-480a96 96 0 1 1-0.064 192.064A96 96 0 0 1 352 288z" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1, _hoisted_3);
}

script$2.render = render$2;
script$2.__file = "packages/components/skeleton/src/image-placeholder.vue";

var script$1 = vue.defineComponent({
  name: "ElSkeletonItem",
  components: {
    [script$2.name]: script$2
  },
  props: {
    variant: {
      type: String,
      default: "text"
    }
  }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_img_placeholder = vue.resolveComponent("img-placeholder");
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["el-skeleton__item", `el-skeleton__${_ctx.variant}`])
  }, [
    _ctx.variant === "image" ? (vue.openBlock(), vue.createBlock(_component_img_placeholder, { key: 0 })) : vue.createCommentVNode("v-if", true)
  ], 2);
}

script$1.render = render$1;
script$1.__file = "packages/components/skeleton/src/item.vue";

var script = vue.defineComponent({
  name: "ElSkeleton",
  components: {
    [script$1.name]: script$1
  },
  props: {
    animated: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 1
    },
    rows: {
      type: Number,
      default: 3
    },
    loading: {
      type: Boolean,
      default: true
    },
    throttle: {
      type: Number
    }
  },
  setup(props) {
    const innerLoading = vue.computed(() => {
      return props.loading;
    });
    const uiLoading = hooks.useThrottleRender(innerLoading, props.throttle);
    return {
      uiLoading
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_skeleton_item = vue.resolveComponent("el-skeleton-item");
  return _ctx.uiLoading ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    class: ["el-skeleton", _ctx.animated ? "is-animated" : ""]
  }, _ctx.$attrs), [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.count, (i) => {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: i }, [
        _ctx.loading ? vue.renderSlot(_ctx.$slots, "template", { key: i }, () => [
          vue.createVNode(_component_el_skeleton_item, {
            class: "is-first",
            variant: "p"
          }),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.rows, (item) => {
            return vue.openBlock(), vue.createBlock(_component_el_skeleton_item, {
              key: item,
              class: vue.normalizeClass({
                "el-skeleton__paragraph": true,
                "is-last": item === _ctx.rows && _ctx.rows > 1
              }),
              variant: "p"
            }, null, 8, ["class"]);
          }), 128))
        ]) : vue.createCommentVNode("v-if", true)
      ], 64);
    }), 128))
  ], 16)) : vue.renderSlot(_ctx.$slots, "default", vue.normalizeProps(vue.mergeProps({ key: 1 }, _ctx.$attrs)));
}

script.render = render;
script.__file = "packages/components/skeleton/src/index.vue";

const ElSkeleton = withInstall.withInstall(script, {
  SkeletonItem: script$1
});
const ElSkeletonItem = withInstall.withNoopInstall(script$1);

exports.ElSkeleton = ElSkeleton;
exports.ElSkeletonItem = ElSkeletonItem;
exports["default"] = ElSkeleton;
