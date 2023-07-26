import { withInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, openBlock, createElementBlock, createElementVNode, renderSlot, normalizeClass, createCommentVNode, createTextVNode, toDisplayString } from 'vue';
import { useLocaleInject } from 'element-plus/es/hooks';

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

var script = defineComponent({
  name: "ElPageHeader",
  props: pageHeaderProps,
  emits: pageHeaderEmits,
  setup(_, { emit }) {
    const { t } = useLocaleInject();
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
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", {
      class: "el-page-header__left",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
    }, [
      _ctx.icon || _ctx.$slots.icon ? (openBlock(), createElementBlock("div", _hoisted_2, [
        renderSlot(_ctx.$slots, "icon", {}, () => [
          createElementVNode("i", {
            class: normalizeClass(_ctx.icon)
          }, null, 2)
        ])
      ])) : createCommentVNode("v-if", true),
      createElementVNode("div", _hoisted_3, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(_ctx.title || _ctx.t("el.pageHeader.title")), 1)
        ])
      ])
    ]),
    createElementVNode("div", _hoisted_4, [
      renderSlot(_ctx.$slots, "content", {}, () => [
        createTextVNode(toDisplayString(_ctx.content), 1)
      ])
    ])
  ]);
}

script.render = render;
script.__file = "packages/components/page-header/src/page-header.vue";

const ElPageHeader = withInstall(script);

export { ElPageHeader, ElPageHeader as default, pageHeaderEmits, pageHeaderProps };
