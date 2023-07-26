'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var tokens = require('element-plus/lib/tokens');
var props = require('element-plus/lib/utils/props');

const breadcrumbProps = {
  separator: {
    type: String,
    default: "/"
  },
  separatorClass: {
    type: String,
    default: ""
  }
};

var script$1 = vue.defineComponent({
  name: "ElBreadcrumb",
  props: breadcrumbProps,
  setup(props) {
    const breadcrumb = vue.ref();
    vue.provide(tokens.elBreadcrumbKey, props);
    vue.onMounted(() => {
      const items = breadcrumb.value.querySelectorAll(".el-breadcrumb__item");
      if (items.length) {
        items[items.length - 1].setAttribute("aria-current", "page");
      }
    });
    return {
      breadcrumb
    };
  }
});

const _hoisted_1$1 = {
  ref: "breadcrumb",
  class: "el-breadcrumb",
  "aria-label": "Breadcrumb",
  role: "navigation"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 512);
}

script$1.render = render$1;
script$1.__file = "packages/components/breadcrumb/src/breadcrumb.vue";

const breadcrumbItemProps = props.buildProps({
  to: {
    type: props.definePropType([String, Object]),
    default: ""
  },
  replace: {
    type: Boolean,
    default: false
  }
});

const COMPONENT_NAME = "ElBreadcrumbItem";
var script = vue.defineComponent({
  name: COMPONENT_NAME,
  props: breadcrumbItemProps,
  setup(props) {
    const instance = vue.getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;
    const parent = vue.inject(tokens.elBreadcrumbKey, void 0);
    const link = vue.ref();
    vue.onMounted(() => {
      link.value.setAttribute("role", "link");
      link.value.addEventListener("click", () => {
        if (!props.to || !router)
          return;
        props.replace ? router.replace(props.to) : router.push(props.to);
      });
    });
    return {
      link,
      separator: parent == null ? void 0 : parent.separator,
      separatorClass: parent == null ? void 0 : parent.separatorClass
    };
  }
});

const _hoisted_1 = { class: "el-breadcrumb__item" };
const _hoisted_2 = {
  key: 1,
  class: "el-breadcrumb__separator",
  role: "presentation"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("span", _hoisted_1, [
    vue.createElementVNode("span", {
      ref: "link",
      class: vue.normalizeClass(["el-breadcrumb__inner", _ctx.to ? "is-link" : ""]),
      role: "link"
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 2),
    _ctx.separatorClass ? (vue.openBlock(), vue.createElementBlock("i", {
      key: 0,
      class: vue.normalizeClass(["el-breadcrumb__separator", _ctx.separatorClass])
    }, null, 2)) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, vue.toDisplayString(_ctx.separator), 1))
  ]);
}

script.render = render;
script.__file = "packages/components/breadcrumb/src/breadcrumb-item.vue";

const ElBreadcrumb = withInstall.withInstall(script$1, {
  BreadcrumbItem: script
});
const ElBreadcrumbItem = withInstall.withNoopInstall(script);

exports.ElBreadcrumb = ElBreadcrumb;
exports.ElBreadcrumbItem = ElBreadcrumbItem;
exports.breadcrumbItemProps = breadcrumbItemProps;
exports.breadcrumbProps = breadcrumbProps;
exports["default"] = ElBreadcrumb;
