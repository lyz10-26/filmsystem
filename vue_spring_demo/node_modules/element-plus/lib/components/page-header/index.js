'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var hooks = require('element-plus/lib/hooks');

const pageHeaderProps = {
  icon: {
    type: String,
    default: "el-icon-back"
  },
  title: String,
  content: {
    type: String,
    default: ""
  }
};
const pageHeaderEmits = {
  back: () => true
};

var script = vue.defineComponent({
  name: "ElPageHeader",
  props: pageHeaderProps,
  emits: pageHeaderEmits,
  setup(_, { emit }) {
    const { t } = hooks.useLocaleInject();
    function handleClick() {
      emit("back");
    }
    return {
      handleClick,
      t
    };
  }
});

const _hoisted_1 = { class: "el-page-header" };
const _hoisted_2 = {
  key: 0,
  class: "el-page-header__icon"
};
const _hoisted_3 = { class: "el-page-header__title" };
const _hoisted_4 = { class: "el-page-header__content" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.createElementVNode("div", {
      class: "el-page-header__left",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
    }, [
      _ctx.icon || _ctx.$slots.icon ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
        vue.renderSlot(_ctx.$slots, "icon", {}, () => [
          vue.createElementVNode("i", {
            class: vue.normalizeClass(_ctx.icon)
          }, null, 2)
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("div", _hoisted_3, [
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.title || _ctx.t("el.pageHeader.title")), 1)
        ])
      ])
    ]),
    vue.createElementVNode("div", _hoisted_4, [
      vue.renderSlot(_ctx.$slots, "content", {}, () => [
        vue.createTextVNode(vue.toDisplayString(_ctx.content), 1)
      ])
    ])
  ]);
}

script.render = render;
script.__file = "packages/components/page-header/src/page-header.vue";

const ElPageHeader = withInstall.withInstall(script);

exports.ElPageHeader = ElPageHeader;
exports["default"] = ElPageHeader;
exports.pageHeaderEmits = pageHeaderEmits;
exports.pageHeaderProps = pageHeaderProps;
