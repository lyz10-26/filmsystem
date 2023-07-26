'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');

var script$4 = vue.defineComponent({
  name: "ElContainer",
  props: {
    direction: {
      type: String,
      default: ""
    }
  },
  setup(props, { slots }) {
    const isVertical = vue.computed(() => {
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
  return vue.openBlock(), vue.createElementBlock("section", {
    class: vue.normalizeClass(["el-container", { "is-vertical": _ctx.isVertical }])
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 2);
}

script$4.render = render$4;
script$4.__file = "packages/components/container/src/container.vue";

var script$3 = vue.defineComponent({
  name: "ElAside",
  props: {
    width: {
      type: String,
      default: null
    }
  },
  setup(props) {
    return {
      style: vue.computed(() => {
        return props.width ? { "--el-aside-width": props.width } : {};
      })
    };
  }
});

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("aside", {
    class: "el-aside",
    style: vue.normalizeStyle(_ctx.style)
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 4);
}

script$3.render = render$3;
script$3.__file = "packages/components/container/src/aside.vue";

var script$2 = vue.defineComponent({
  name: "ElFooter",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(props) {
    return {
      style: vue.computed(() => props.height ? {
        "--el-footer-height": props.height
      } : {})
    };
  }
});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("footer", {
    class: "el-footer",
    style: vue.normalizeStyle(_ctx.style)
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 4);
}

script$2.render = render$2;
script$2.__file = "packages/components/container/src/footer.vue";

var script$1 = vue.defineComponent({
  name: "ElHeader",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(props) {
    return {
      style: vue.computed(() => props.height ? {
        "--el-header-height": props.height
      } : {})
    };
  }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("header", {
    class: "el-header",
    style: vue.normalizeStyle(_ctx.style)
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 4);
}

script$1.render = render$1;
script$1.__file = "packages/components/container/src/header.vue";

var script = vue.defineComponent({
  name: "ElMain"
});

const _hoisted_1 = { class: "el-main" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("main", _hoisted_1, [
    vue.renderSlot(_ctx.$slots, "default")
  ]);
}

script.render = render;
script.__file = "packages/components/container/src/main.vue";

const ElContainer = withInstall.withInstall(script$4, {
  Aside: script$3,
  Footer: script$2,
  Header: script$1,
  Main: script
});
const ElAside = withInstall.withNoopInstall(script$3);
const ElFooter = withInstall.withNoopInstall(script$2);
const ElHeader = withInstall.withNoopInstall(script$1);
const ElMain = withInstall.withNoopInstall(script);

exports.ElAside = ElAside;
exports.ElContainer = ElContainer;
exports.ElFooter = ElFooter;
exports.ElHeader = ElHeader;
exports.ElMain = ElMain;
exports["default"] = ElContainer;
