import { withInstall, withNoopInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, renderSlot, normalizeStyle } from 'vue';

var script$4 = defineComponent({
  name: "ElContainer",
  props: {
    direction: {
      type: String,
      default: ""
    }
  },
  setup(props, { slots }) {
    const isVertical = computed(() => {
      if (props.direction === "vertical") {
        return true;
      } else if (props.direction === "horizontal") {
        return false;
      }
      if (slots && slots.default) {
        const vNodes = slots.default();
        return vNodes.some((vNode) => {
          const tag = vNode.type.name;
          return tag === "ElHeader" || tag === "ElFooter";
        });
      } else {
        return false;
      }
    });
    return {
      isVertical
    };
  }
});

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", {
    class: normalizeClass(["el-container", { "is-vertical": _ctx.isVertical }])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}

script$4.render = render$4;
script$4.__file = "packages/components/container/src/container.vue";

var script$3 = defineComponent({
  name: "ElAside",
  props: {
    width: {
      type: String,
      default: null
    }
  },
  setup(props) {
    return {
      style: computed(() => {
        return props.width ? { "--el-aside-width": props.width } : {};
      })
    };
  }
});

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("aside", {
    class: "el-aside",
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 4);
}

script$3.render = render$3;
script$3.__file = "packages/components/container/src/aside.vue";

var script$2 = defineComponent({
  name: "ElFooter",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(props) {
    return {
      style: computed(() => props.height ? {
        "--el-footer-height": props.height
      } : {})
    };
  }
});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("footer", {
    class: "el-footer",
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 4);
}

script$2.render = render$2;
script$2.__file = "packages/components/container/src/footer.vue";

var script$1 = defineComponent({
  name: "ElHeader",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(props) {
    return {
      style: computed(() => props.height ? {
        "--el-header-height": props.height
      } : {})
    };
  }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("header", {
    class: "el-header",
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 4);
}

script$1.render = render$1;
script$1.__file = "packages/components/container/src/header.vue";

var script = defineComponent({
  name: "ElMain"
});

const _hoisted_1 = { class: "el-main" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("main", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ]);
}

script.render = render;
script.__file = "packages/components/container/src/main.vue";

const ElContainer = withInstall(script$4, {
  Aside: script$3,
  Footer: script$2,
  Header: script$1,
  Main: script
});
const ElAside = withNoopInstall(script$3);
const ElFooter = withNoopInstall(script$2);
const ElHeader = withNoopInstall(script$1);
const ElMain = withNoopInstall(script);

export { ElAside, ElContainer, ElFooter, ElHeader, ElMain, ElContainer as default };
