'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var constants = require('element-plus/lib/utils/constants');
var validators = require('element-plus/lib/utils/validators');
var tokens = require('element-plus/lib/tokens');
var util = require('element-plus/lib/utils/util');
var aria = require('element-plus/lib/utils/aria');

const radioGroupKey = "RadioGroup";

const useRadio = () => {
  const ELEMENT = util.useGlobalConfig();
  const elForm = vue.inject(tokens.elFormKey, {});
  const elFormItem = vue.inject(tokens.elFormItemKey, {});
  const radioGroup = vue.inject(radioGroupKey, {});
  const focus = vue.ref(false);
  const isGroup = vue.computed(() => (radioGroup == null ? void 0 : radioGroup.name) === "ElRadioGroup");
  const elFormItemSize = vue.computed(() => elFormItem.size || ELEMENT.size);
  return {
    isGroup,
    focus,
    radioGroup,
    elForm,
    ELEMENT,
    elFormItemSize
  };
};
const useRadioAttrs = (props, { isGroup, radioGroup, elForm, model }) => {
  const isDisabled = vue.computed(() => {
    return isGroup.value ? radioGroup.disabled || props.disabled || elForm.disabled : props.disabled || elForm.disabled;
  });
  const tabIndex = vue.computed(() => {
    return isDisabled.value || isGroup.value && model.value !== props.label ? -1 : 0;
  });
  return {
    isDisabled,
    tabIndex
  };
};

var script$2 = vue.defineComponent({
  name: "ElRadio",
  componentName: "ElRadio",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    label: {
      type: [String, Number, Boolean],
      default: ""
    },
    disabled: Boolean,
    name: {
      type: String,
      default: ""
    },
    border: Boolean,
    size: {
      type: String,
      validator: validators.isValidComponentSize
    }
  },
  emits: [constants.UPDATE_MODEL_EVENT, "change"],
  setup(props, ctx) {
    const { isGroup, radioGroup, elFormItemSize, ELEMENT, focus, elForm } = useRadio();
    const radioRef = vue.ref();
    const model = vue.computed({
      get() {
        return isGroup.value ? radioGroup.modelValue : props.modelValue;
      },
      set(val) {
        if (isGroup.value) {
          radioGroup.changeEvent(val);
        } else {
          ctx.emit(constants.UPDATE_MODEL_EVENT, val);
        }
        radioRef.value.checked = props.modelValue === props.label;
      }
    });
    const { tabIndex, isDisabled } = useRadioAttrs(props, {
      isGroup,
      radioGroup,
      elForm,
      model
    });
    const radioSize = vue.computed(() => {
      const temRadioSize = props.size || elFormItemSize.value || ELEMENT.size;
      return isGroup.value ? radioGroup.radioGroupSize || temRadioSize : temRadioSize;
    });
    function handleChange() {
      vue.nextTick(() => {
        ctx.emit("change", model.value);
      });
    }
    return {
      focus,
      isGroup,
      isDisabled,
      model,
      tabIndex,
      radioSize,
      handleChange,
      radioRef
    };
  }
});

const _hoisted_1$1 = ["aria-checked", "aria-disabled", "tabindex"];
const _hoisted_2$1 = /* @__PURE__ */ vue.createElementVNode("span", { class: "el-radio__inner" }, null, -1);
const _hoisted_3 = ["value", "name", "disabled"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("label", {
    class: vue.normalizeClass(["el-radio", {
      [`el-radio--${_ctx.radioSize || ""}`]: _ctx.radioSize,
      "is-disabled": _ctx.isDisabled,
      "is-focus": _ctx.focus,
      "is-bordered": _ctx.border,
      "is-checked": _ctx.model === _ctx.label
    }]),
    role: "radio",
    "aria-checked": _ctx.model === _ctx.label,
    "aria-disabled": _ctx.isDisabled,
    tabindex: _ctx.tabIndex,
    onKeydown: _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers(($event) => _ctx.model = _ctx.isDisabled ? _ctx.model : _ctx.label, ["stop", "prevent"]), ["space"]))
  }, [
    vue.createElementVNode("span", {
      class: vue.normalizeClass(["el-radio__input", {
        "is-disabled": _ctx.isDisabled,
        "is-checked": _ctx.model === _ctx.label
      }])
    }, [
      _hoisted_2$1,
      vue.withDirectives(vue.createElementVNode("input", {
        ref: "radioRef",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.model = $event),
        class: "el-radio__original",
        value: _ctx.label,
        type: "radio",
        "aria-hidden": "true",
        name: _ctx.name,
        disabled: _ctx.isDisabled,
        tabindex: "-1",
        onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.focus = true),
        onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.focus = false),
        onChange: _cache[3] || (_cache[3] = (...args) => _ctx.handleChange && _ctx.handleChange(...args))
      }, null, 40, _hoisted_3), [
        [vue.vModelRadio, _ctx.model]
      ])
    ], 2),
    vue.createElementVNode("span", {
      class: "el-radio__label",
      onKeydown: _cache[4] || (_cache[4] = vue.withModifiers(() => {
      }, ["stop"]))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
      ])
    ], 32)
  ], 42, _hoisted_1$1);
}

script$2.render = render$2;
script$2.__file = "packages/components/radio/src/radio.vue";

var script$1 = vue.defineComponent({
  name: "ElRadioButton",
  props: {
    label: {
      type: [String, Number, Boolean],
      default: ""
    },
    disabled: Boolean,
    name: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const { isGroup, radioGroup, elFormItemSize, ELEMENT, focus, elForm } = useRadio();
    const size = vue.computed(() => {
      return radioGroup.radioGroupSize || elFormItemSize.value || ELEMENT.size;
    });
    const radioRef = vue.ref();
    const value = vue.computed({
      get() {
        return radioGroup.modelValue;
      },
      set(value2) {
        radioGroup.changeEvent(value2);
        radioRef.value.checked = radioGroup.modelValue === props.label;
      }
    });
    const { isDisabled, tabIndex } = useRadioAttrs(props, {
      model: value,
      elForm,
      radioGroup,
      isGroup
    });
    const activeStyle = vue.computed(() => {
      return {
        backgroundColor: radioGroup.fill || "",
        borderColor: radioGroup.fill || "",
        boxShadow: radioGroup.fill ? `-1px 0 0 0 ${radioGroup.fill}` : "",
        color: radioGroup.textColor || ""
      };
    });
    return {
      isGroup,
      size,
      isDisabled,
      tabIndex,
      value,
      focus,
      activeStyle,
      radioRef
    };
  }
});

const _hoisted_1 = ["aria-checked", "aria-disabled", "tabindex"];
const _hoisted_2 = ["value", "name", "disabled"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("label", {
    class: vue.normalizeClass(["el-radio-button", [
      _ctx.size ? "el-radio-button--" + _ctx.size : "",
      {
        "is-active": _ctx.value === _ctx.label,
        "is-disabled": _ctx.isDisabled,
        "is-focus": _ctx.focus
      }
    ]]),
    role: "radio",
    "aria-checked": _ctx.value === _ctx.label,
    "aria-disabled": _ctx.isDisabled,
    tabindex: _ctx.tabIndex,
    onKeydown: _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers(($event) => _ctx.value = _ctx.isDisabled ? _ctx.value : _ctx.label, ["stop", "prevent"]), ["space"]))
  }, [
    vue.withDirectives(vue.createElementVNode("input", {
      ref: "radioRef",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.value = $event),
      class: "el-radio-button__original-radio",
      value: _ctx.label,
      type: "radio",
      name: _ctx.name,
      disabled: _ctx.isDisabled,
      tabindex: "-1",
      onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.focus = true),
      onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.focus = false)
    }, null, 40, _hoisted_2), [
      [vue.vModelRadio, _ctx.value]
    ]),
    vue.createElementVNode("span", {
      class: "el-radio-button__inner",
      style: vue.normalizeStyle(_ctx.value === _ctx.label ? _ctx.activeStyle : null),
      onKeydown: _cache[3] || (_cache[3] = vue.withModifiers(() => {
      }, ["stop"]))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
      ])
    ], 36)
  ], 42, _hoisted_1);
}

script$1.render = render$1;
script$1.__file = "packages/components/radio/src/radio-button.vue";

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
  name: "ElRadioGroup",
  componentName: "ElRadioGroup",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    size: {
      type: String,
      validator: validators.isValidComponentSize
    },
    fill: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: ""
    },
    disabled: Boolean
  },
  emits: [constants.UPDATE_MODEL_EVENT, "change"],
  setup(props, ctx) {
    const radioGroup = vue.ref(null);
    const elFormItem = vue.inject(tokens.elFormItemKey, {});
    const radioGroupSize = vue.computed(() => {
      return props.size || elFormItem.size;
    });
    const changeEvent = (value) => {
      ctx.emit(constants.UPDATE_MODEL_EVENT, value);
      vue.nextTick(() => {
        ctx.emit("change", value);
      });
    };
    vue.provide(radioGroupKey, vue.reactive(__spreadProps(__spreadValues({
      name: "ElRadioGroup"
    }, vue.toRefs(props)), {
      radioGroupSize,
      changeEvent
    })));
    vue.watch(() => props.modelValue, () => {
      var _a;
      (_a = elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change");
    });
    const handleKeydown = (e) => {
      const target = e.target;
      const className = target.nodeName === "INPUT" ? "[type=radio]" : "[role=radio]";
      const radios = radioGroup.value.querySelectorAll(className);
      const length = radios.length;
      const index = Array.from(radios).indexOf(target);
      const roleRadios = radioGroup.value.querySelectorAll("[role=radio]");
      let nextIndex = null;
      switch (e.code) {
        case aria.EVENT_CODE.left:
        case aria.EVENT_CODE.up:
          e.stopPropagation();
          e.preventDefault();
          nextIndex = index === 0 ? length - 1 : index - 1;
          break;
        case aria.EVENT_CODE.right:
        case aria.EVENT_CODE.down:
          e.stopPropagation();
          e.preventDefault();
          nextIndex = index === length - 1 ? 0 : index + 1;
          break;
      }
      if (nextIndex === null)
        return;
      roleRadios[nextIndex].click();
      roleRadios[nextIndex].focus();
    };
    vue.onMounted(() => {
      const radios = radioGroup.value.querySelectorAll("[type=radio]");
      const firstLabel = radios[0];
      if (!Array.from(radios).some((radio) => radio.checked) && firstLabel) {
        firstLabel.tabIndex = 0;
      }
    });
    return {
      handleKeydown,
      radioGroupSize,
      radioGroup
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    ref: "radioGroup",
    class: "el-radio-group",
    role: "radiogroup",
    onKeydown: _cache[0] || (_cache[0] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args))
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 544);
}

script.render = render;
script.__file = "packages/components/radio/src/radio-group.vue";

const ElRadio = withInstall.withInstall(script$2, {
  RadioButton: script$1,
  RadioGroup: script
});
const ElRadioGroup = withInstall.withNoopInstall(script);
const ElRadioButton = withInstall.withNoopInstall(script$1);

exports.ElRadio = ElRadio;
exports.ElRadioButton = ElRadioButton;
exports.ElRadioGroup = ElRadioGroup;
exports["default"] = ElRadio;
