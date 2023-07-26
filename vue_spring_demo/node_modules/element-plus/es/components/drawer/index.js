import { defineComponent, ref, computed, resolveComponent, resolveDirective, openBlock, createBlock, Teleport, createVNode, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, normalizeStyle, withModifiers, createElementBlock, renderSlot, toDisplayString, createCommentVNode, vShow } from 'vue';
import { ElOverlay } from 'element-plus/es/components/overlay';
import { dialogProps, dialogEmits, useDialog } from 'element-plus/es/components/dialog';
import { TrapFocus } from 'element-plus/es/directives';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var script = defineComponent({
  name: "ElDrawer",
  components: {
    ElOverlay
  },
  directives: {
    TrapFocus
  },
  props: __spreadProps(__spreadValues({}, dialogProps), {
    direction: {
      type: String,
      default: "rtl",
      validator: (val) => {
        return ["ltr", "rtl", "ttb", "btt"].indexOf(val) !== -1;
      }
    },
    size: {
      type: [String, Number],
      default: "30%"
    },
    withHeader: {
      type: Boolean,
      default: true
    },
    modalFade: {
      type: Boolean,
      default: true
    }
  }),
  emits: dialogEmits,
  setup(props, ctx) {
    const drawerRef = ref(null);
    return __spreadProps(__spreadValues({}, useDialog(props, ctx, drawerRef)), {
      drawerRef,
      isHorizontal: computed(() => props.direction === "rtl" || props.direction === "ltr"),
      drawerSize: computed(() => typeof props.size === "number" ? `${props.size}px` : props.size)
    });
  }
});

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = {
  key: 0,
  id: "el-drawer__title",
  class: "el-drawer__header"
};
const _hoisted_3 = ["title"];
const _hoisted_4 = ["aria-label"];
const _hoisted_5 = /* @__PURE__ */ createElementVNode("i", { class: "el-drawer__close el-icon el-icon-close" }, null, -1);
const _hoisted_6 = [
  _hoisted_5
];
const _hoisted_7 = {
  key: 1,
  class: "el-drawer__body"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_overlay = resolveComponent("el-overlay");
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createBlock(Teleport, {
    to: "body",
    disabled: !_ctx.appendToBody
  }, [
    createVNode(Transition, {
      name: "el-drawer-fade",
      onAfterEnter: _ctx.afterEnter,
      onAfterLeave: _ctx.afterLeave,
      onBeforeLeave: _ctx.beforeLeave
    }, {
      default: withCtx(() => [
        withDirectives(createVNode(_component_el_overlay, {
          mask: _ctx.modal,
          "overlay-class": _ctx.modalClass,
          "z-index": _ctx.zIndex,
          onClick: _ctx.onModalClick
        }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", {
              ref: "drawerRef",
              "aria-modal": "true",
              "aria-labelledby": "el-drawer__title",
              "aria-label": _ctx.title,
              class: normalizeClass(["el-drawer", _ctx.direction, _ctx.visible && "open", _ctx.customClass]),
              style: normalizeStyle(_ctx.isHorizontal ? "width: " + _ctx.drawerSize : "height: " + _ctx.drawerSize),
              role: "dialog",
              onClick: _cache[1] || (_cache[1] = withModifiers(() => {
              }, ["stop"]))
            }, [
              _ctx.withHeader ? (openBlock(), createElementBlock("header", _hoisted_2, [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createElementVNode("span", {
                    role: "heading",
                    title: _ctx.title
                  }, toDisplayString(_ctx.title), 9, _hoisted_3)
                ]),
                _ctx.showClose ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  "aria-label": "close " + (_ctx.title || "drawer"),
                  class: "el-drawer__close-btn",
                  type: "button",
                  onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
                }, _hoisted_6, 8, _hoisted_4)) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true),
              _ctx.rendered ? (openBlock(), createElementBlock("section", _hoisted_7, [
                renderSlot(_ctx.$slots, "default")
              ])) : createCommentVNode("v-if", true)
            ], 14, _hoisted_1), [
              [_directive_trap_focus]
            ])
          ]),
          _: 3
        }, 8, ["mask", "overlay-class", "z-index", "onClick"]), [
          [vShow, _ctx.visible]
        ])
      ]),
      _: 3
    }, 8, ["onAfterEnter", "onAfterLeave", "onBeforeLeave"])
  ], 8, ["disabled"]);
}

script.render = render;
script.__file = "packages/components/drawer/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Drawer = script;
const ElDrawer = _Drawer;

export { ElDrawer, _Drawer as default };
