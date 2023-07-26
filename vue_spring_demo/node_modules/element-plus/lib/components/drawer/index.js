'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var overlay = require('element-plus/lib/components/overlay');
var dialog = require('element-plus/lib/components/dialog');
var directives = require('element-plus/lib/directives');

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
var script = vue.defineComponent({
  name: "ElDrawer",
  components: {
    ElOverlay: overlay.ElOverlay
  },
  directives: {
    TrapFocus: directives.TrapFocus
  },
  props: __spreadProps(__spreadValues({}, dialog.dialogProps), {
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
  emits: dialog.dialogEmits,
  setup(props, ctx) {
    const drawerRef = vue.ref(null);
    return __spreadProps(__spreadValues({}, dialog.useDialog(props, ctx, drawerRef)), {
      drawerRef,
      isHorizontal: vue.computed(() => props.direction === "rtl" || props.direction === "ltr"),
      drawerSize: vue.computed(() => typeof props.size === "number" ? `${props.size}px` : props.size)
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
const _hoisted_5 = /* @__PURE__ */ vue.createElementVNode("i", { class: "el-drawer__close el-icon el-icon-close" }, null, -1);
const _hoisted_6 = [
  _hoisted_5
];
const _hoisted_7 = {
  key: 1,
  class: "el-drawer__body"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_overlay = vue.resolveComponent("el-overlay");
  const _directive_trap_focus = vue.resolveDirective("trap-focus");
  return vue.openBlock(), vue.createBlock(vue.Teleport, {
    to: "body",
    disabled: !_ctx.appendToBody
  }, [
    vue.createVNode(vue.Transition, {
      name: "el-drawer-fade",
      onAfterEnter: _ctx.afterEnter,
      onAfterLeave: _ctx.afterLeave,
      onBeforeLeave: _ctx.beforeLeave
    }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createVNode(_component_el_overlay, {
          mask: _ctx.modal,
          "overlay-class": _ctx.modalClass,
          "z-index": _ctx.zIndex,
          onClick: _ctx.onModalClick
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("div", {
              ref: "drawerRef",
              "aria-modal": "true",
              "aria-labelledby": "el-drawer__title",
              "aria-label": _ctx.title,
              class: vue.normalizeClass(["el-drawer", _ctx.direction, _ctx.visible && "open", _ctx.customClass]),
              style: vue.normalizeStyle(_ctx.isHorizontal ? "width: " + _ctx.drawerSize : "height: " + _ctx.drawerSize),
              role: "dialog",
              onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
              }, ["stop"]))
            }, [
              _ctx.withHeader ? (vue.openBlock(), vue.createElementBlock("header", _hoisted_2, [
                vue.renderSlot(_ctx.$slots, "title", {}, () => [
                  vue.createElementVNode("span", {
                    role: "heading",
                    title: _ctx.title
                  }, vue.toDisplayString(_ctx.title), 9, _hoisted_3)
                ]),
                _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 0,
                  "aria-label": "close " + (_ctx.title || "drawer"),
                  class: "el-drawer__close-btn",
                  type: "button",
                  onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
                }, _hoisted_6, 8, _hoisted_4)) : vue.createCommentVNode("v-if", true)
              ])) : vue.createCommentVNode("v-if", true),
              _ctx.rendered ? (vue.openBlock(), vue.createElementBlock("section", _hoisted_7, [
                vue.renderSlot(_ctx.$slots, "default")
              ])) : vue.createCommentVNode("v-if", true)
            ], 14, _hoisted_1), [
              [_directive_trap_focus]
            ])
          ]),
          _: 3
        }, 8, ["mask", "overlay-class", "z-index", "onClick"]), [
          [vue.vShow, _ctx.visible]
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

exports.ElDrawer = ElDrawer;
exports["default"] = _Drawer;
