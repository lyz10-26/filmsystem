import { withInstall, withNoopInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, inject, computed, openBlock, createElementBlock, normalizeClass, createCommentVNode, renderSlot, provide, reactive, toRef } from 'vue';
import { useFormItemProps, useFormItem } from 'element-plus/es/hooks';
import { elButtonGroupKey, elFormKey } from 'element-plus/es/tokens';
import { buildProps } from 'element-plus/es/utils/props';

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
const buttonType = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
];
const buttonSize = ["", "large", "medium", "small", "mini"];
const buttonNativeType = ["button", "submit", "reset"];
const buttonProps = buildProps(__spreadProps(__spreadValues({}, useFormItemProps), {
  type: {
    type: String,
    values: buttonType,
    default: ""
  },
  icon: {
    type: String,
    default: ""
  },
  nativeType: {
    type: String,
    values: buttonNativeType,
    default: "button"
  },
  loading: Boolean,
  plain: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean
}));
const buttonEmits = {
  click: (evt) => evt instanceof MouseEvent
};

var script$1 = defineComponent({
  name: "ElButton",
  props: buttonProps,
  emits: buttonEmits,
  setup(props, { emit }) {
    const elBtnGroup = inject(elButtonGroupKey, void 0);
    const { size: buttonSize, disabled: buttonDisabled } = useFormItem({
      size: computed(() => elBtnGroup == null ? void 0 : elBtnGroup.size)
    });
    const buttonType = computed(() => props.type || (elBtnGroup == null ? void 0 : elBtnGroup.type) || "default");
    const elForm = inject(elFormKey, void 0);
    const handleClick = (evt) => {
      if (props.nativeType === "reset") {
        elForm == null ? void 0 : elForm.resetFields();
      }
      emit("click", evt);
    };
    return {
      buttonSize,
      buttonType,
      buttonDisabled,
      handleClick
    };
  }
});

const _hoisted_1$1 = ["disabled", "autofocus", "type"];
const _hoisted_2 = {
  key: 0,
  class: "el-icon-loading"
};
const _hoisted_3 = { key: 2 };
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    class: normalizeClass([
      "el-button",
      _ctx.buttonType ? "el-button--" + _ctx.buttonType : "",
      _ctx.buttonSize ? "el-button--" + _ctx.buttonSize : "",
      {
        "is-disabled": _ctx.buttonDisabled,
        "is-loading": _ctx.loading,
        "is-plain": _ctx.plain,
        "is-round": _ctx.round,
        "is-circle": _ctx.circle
      }
    ]),
    disabled: _ctx.buttonDisabled || _ctx.loading,
    autofocus: _ctx.autofocus,
    type: _ctx.nativeType,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.loading ? (openBlock(), createElementBlock("i", _hoisted_2)) : createCommentVNode("v-if", true),
    _ctx.icon && !_ctx.loading ? (openBlock(), createElementBlock("i", {
      key: 1,
      class: normalizeClass(_ctx.icon)
    }, null, 2)) : createCommentVNode("v-if", true),
    _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_3, [
      renderSlot(_ctx.$slots, "default")
    ])) : createCommentVNode("v-if", true)
  ], 10, _hoisted_1$1);
}

script$1.render = render$1;
script$1.__file = "packages/components/button/src/button.vue";

const buttonGroupProps = {
  size: buttonProps.size,
  type: buttonProps.type
};

var script = defineComponent({
  name: "ElButtonGroup",
  props: buttonGroupProps,
  setup(props) {
    provide(elButtonGroupKey, reactive({
      size: toRef(props, "size"),
      type: toRef(props, "type")
    }));
  }
});

const _hoisted_1 = { class: "el-button-group" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ]);
}

script.render = render;
script.__file = "packages/components/button/src/button-group.vue";

const ElButton = withInstall(script$1, {
  ButtonGroup: script
});
const ElButtonGroup = withNoopInstall(script);

export { ElButton, ElButtonGroup, buttonEmits, buttonNativeType, buttonProps, buttonSize, buttonType, ElButton as default };
