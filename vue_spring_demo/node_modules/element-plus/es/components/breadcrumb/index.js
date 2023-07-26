import { withInstall, withNoopInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, ref, provide, onMounted, openBlock, createElementBlock, renderSlot, getCurrentInstance, inject, createElementVNode, normalizeClass, toDisplayString } from 'vue';
import { elBreadcrumbKey } from 'element-plus/es/tokens';
import { buildProps, definePropType } from 'element-plus/es/utils/props';

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

var script$1 = defineComponent({
  name: "ElBreadcrumb",
  props: breadcrumbProps,
  setup(props) {
    const breadcrumb = ref();
    provide(elBreadcrumbKey, props);
    onMounted(() => {
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
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    renderSlot(_ctx.$slots, "default")
  ], 512);
}

script$1.render = render$1;
script$1.__file = "packages/components/breadcrumb/src/breadcrumb.vue";

const breadcrumbItemProps = buildProps({
  to: {
    type: definePropType([String, Object]),
    default: ""
  },
  replace: {
    type: Boolean,
    default: false
  }
});

const COMPONENT_NAME = "ElBreadcrumbItem";
var script = defineComponent({
  name: COMPONENT_NAME,
  props: breadcrumbItemProps,
  setup(props) {
    const instance = getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;
    const parent = inject(elBreadcrumbKey, void 0);
    const link = ref();
    onMounted(() => {
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
  return openBlock(), createElementBlock("span", _hoisted_1, [
    createElementVNode("span", {
      ref: "link",
      class: normalizeClass(["el-breadcrumb__inner", _ctx.to ? "is-link" : ""]),
      role: "link"
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2),
    _ctx.separatorClass ? (openBlock(), createElementBlock("i", {
      key: 0,
      class: normalizeClass(["el-breadcrumb__separator", _ctx.separatorClass])
    }, null, 2)) : (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(_ctx.separator), 1))
  ]);
}

script.render = render;
script.__file = "packages/components/breadcrumb/src/breadcrumb-item.vue";

const ElBreadcrumb = withInstall(script$1, {
  BreadcrumbItem: script
});
const ElBreadcrumbItem = withNoopInstall(script);

export { ElBreadcrumb, ElBreadcrumbItem, breadcrumbItemProps, breadcrumbProps, ElBreadcrumb as default };
