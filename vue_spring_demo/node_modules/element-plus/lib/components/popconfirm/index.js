'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var ElButton = require('element-plus/lib/components/button');
var ElPopper = require('element-plus/lib/components/popper');
var hooks = require('element-plus/lib/hooks');
var props = require('element-plus/lib/utils/props');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElButton__default = /*#__PURE__*/_interopDefaultLegacy(ElButton);
var ElPopper__default = /*#__PURE__*/_interopDefaultLegacy(ElPopper);

const popconfirmProps = props.buildProps({
  title: {
    type: String
  },
  confirmButtonText: {
    type: String
  },
  cancelButtonText: {
    type: String
  },
  confirmButtonType: {
    type: String,
    values: ElButton.buttonType,
    default: "primary"
  },
  cancelButtonType: {
    type: String,
    values: ElButton.buttonType,
    default: "text"
  },
  icon: {
    type: String,
    default: "el-icon-question"
  },
  iconColor: {
    type: String,
    default: "#f90"
  },
  hideIcon: {
    type: Boolean,
    default: false
  }
});
const popconfirmEmits = {
  confirm: () => true,
  cancel: () => true
};

var script = vue.defineComponent({
  name: "ElPopconfirm",
  components: {
    ElButton: ElButton__default["default"],
    ElPopper: ElPopper__default["default"]
  },
  props: popconfirmProps,
  emits: popconfirmEmits,
  setup(props, { emit }) {
    const { t } = hooks.useLocaleInject();
    const visible = vue.ref(false);
    const confirm = () => {
      visible.value = false;
      emit("confirm");
    };
    const cancel = () => {
      visible.value = false;
      emit("cancel");
    };
    const finalConfirmButtonText = vue.computed(() => props.confirmButtonText || t("el.popconfirm.confirmButtonText"));
    const finalCancelButtonText = vue.computed(() => props.cancelButtonText || t("el.popconfirm.cancelButtonText"));
    return {
      Effect: ElPopper.Effect,
      visible,
      finalConfirmButtonText,
      finalCancelButtonText,
      confirm,
      cancel
    };
  }
});

const _hoisted_1 = { class: "el-popconfirm" };
const _hoisted_2 = { class: "el-popconfirm__main" };
const _hoisted_3 = { class: "el-popconfirm__action" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_popper = vue.resolveComponent("el-popper");
  return vue.openBlock(), vue.createBlock(_component_el_popper, {
    visible: _ctx.visible,
    "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => _ctx.visible = $event),
    trigger: "click",
    effect: _ctx.Effect.LIGHT,
    "popper-class": "el-popover",
    "append-to-body": "",
    "fallback-placements": ["bottom", "top", "right", "left"]
  }, {
    trigger: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "reference")
    ]),
    default: vue.withCtx(() => [
      vue.createElementVNode("div", _hoisted_1, [
        vue.createElementVNode("p", _hoisted_2, [
          !_ctx.hideIcon ? (vue.openBlock(), vue.createElementBlock("i", {
            key: 0,
            class: vue.normalizeClass([_ctx.icon, "el-popconfirm__icon"]),
            style: vue.normalizeStyle({ color: _ctx.iconColor })
          }, null, 6)) : vue.createCommentVNode("v-if", true),
          vue.createTextVNode(" " + vue.toDisplayString(_ctx.title), 1)
        ]),
        vue.createElementVNode("div", _hoisted_3, [
          vue.createVNode(_component_el_button, {
            size: "mini",
            type: _ctx.cancelButtonType,
            onClick: _ctx.cancel
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(_ctx.finalCancelButtonText), 1)
            ]),
            _: 1
          }, 8, ["type", "onClick"]),
          vue.createVNode(_component_el_button, {
            size: "mini",
            type: _ctx.confirmButtonType,
            onClick: _ctx.confirm
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(_ctx.finalConfirmButtonText), 1)
            ]),
            _: 1
          }, 8, ["type", "onClick"])
        ])
      ])
    ]),
    _: 3
  }, 8, ["visible", "effect"]);
}

script.render = render;
script.__file = "packages/components/popconfirm/src/popconfirm.vue";

const ElPopconfirm = withInstall.withInstall(script);

exports.ElPopconfirm = ElPopconfirm;
exports["default"] = ElPopconfirm;
exports.popconfirmEmits = popconfirmEmits;
exports.popconfirmProps = popconfirmProps;
