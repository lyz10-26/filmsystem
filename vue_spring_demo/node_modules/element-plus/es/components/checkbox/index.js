import { withInstall, withNoopInstall } from 'element-plus/es/utils/with-install';
import { inject, computed, ref, getCurrentInstance, watch, defineComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, withDirectives, vModelCheckbox, renderSlot, Fragment, createTextVNode, toDisplayString, createCommentVNode, normalizeStyle, provide, toRefs, nextTick } from 'vue';
import { UPDATE_MODEL_EVENT } from 'element-plus/es/utils/constants';
import { isValidComponentSize } from 'element-plus/es/utils/validators';
import { toTypeString } from '@vue/shared';
import { useGlobalConfig } from 'element-plus/es/utils/util';
import { elFormKey, elFormItemKey } from 'element-plus/es/tokens';

const useCheckboxProps = {
  modelValue: {
    type: [Boolean, Number, String],
    default: () => void 0
  },
  label: {
    type: [String, Boolean, Number, Object]
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean,
  name: {
    type: String,
    default: void 0
  },
  trueLabel: {
    type: [String, Number],
    default: void 0
  },
  falseLabel: {
    type: [String, Number],
    default: void 0
  },
  size: String
};
const useCheckboxGroup = () => {
  const ELEMENT = useGlobalConfig();
  const elForm = inject(elFormKey, {});
  const elFormItem = inject(elFormItemKey, {});
  const checkboxGroup = inject("CheckboxGroup", {});
  const isGroup = computed(() => checkboxGroup && (checkboxGroup == null ? void 0 : checkboxGroup.name) === "ElCheckboxGroup");
  const elFormItemSize = computed(() => {
    return elFormItem.size;
  });
  return {
    isGroup,
    checkboxGroup,
    elForm,
    ELEMENT,
    elFormItemSize,
    elFormItem
  };
};
const useModel = (props) => {
  const selfModel = ref(false);
  const { emit } = getCurrentInstance();
  const { isGroup, checkboxGroup } = useCheckboxGroup();
  const isLimitExceeded = ref(false);
  const store = computed(() => {
    var _a;
    return checkboxGroup ? (_a = checkboxGroup.modelValue) == null ? void 0 : _a.value : props.modelValue;
  });
  const model = computed({
    get() {
      var _a;
      return isGroup.value ? store.value : (_a = props.modelValue) != null ? _a : selfModel.value;
    },
    set(val) {
      var _a;
      if (isGroup.value && Array.isArray(val)) {
        isLimitExceeded.value = false;
        if (checkboxGroup.min !== void 0 && val.length < checkboxGroup.min.value) {
          isLimitExceeded.value = true;
        }
        if (checkboxGroup.max !== void 0 && val.length > checkboxGroup.max.value) {
          isLimitExceeded.value = true;
        }
        isLimitExceeded.value === false && ((_a = checkboxGroup == null ? void 0 : checkboxGroup.changeEvent) == null ? void 0 : _a.call(checkboxGroup, val));
      } else {
        emit(UPDATE_MODEL_EVENT, val);
        selfModel.value = val;
      }
    }
  });
  return {
    model,
    isLimitExceeded
  };
};
const useCheckboxStatus = (props, { model }) => {
  const { isGroup, checkboxGroup, elFormItemSize, ELEMENT } = useCheckboxGroup();
  const focus = ref(false);
  const size = computed(() => {
    var _a;
    return ((_a = checkboxGroup == null ? void 0 : checkboxGroup.checkboxGroupSize) == null ? void 0 : _a.value) || elFormItemSize.value || ELEMENT.size;
  });
  const isChecked = computed(() => {
    const value = model.value;
    if (toTypeString(value) === "[object Boolean]") {
      return value;
    } else if (Array.isArray(value)) {
      return value.includes(props.label);
    } else if (value !== null && value !== void 0) {
      return value === props.trueLabel;
    } else {
      return !!value;
    }
  });
  const checkboxSize = computed(() => {
    var _a;
    const temCheckboxSize = props.size || elFormItemSize.value || ELEMENT.size;
    return isGroup.value ? ((_a = checkboxGroup == null ? void 0 : checkboxGroup.checkboxGroupSize) == null ? void 0 : _a.value) || temCheckboxSize : temCheckboxSize;
  });
  return {
    isChecked,
    focus,
    size,
    checkboxSize
  };
};
const useDisabled = (props, {
  model,
  isChecked
}) => {
  const { elForm, isGroup, checkboxGroup } = useCheckboxGroup();
  const isLimitDisabled = computed(() => {
    var _a, _b;
    const max = (_a = checkboxGroup.max) == null ? void 0 : _a.value;
    const min = (_b = checkboxGroup.min) == null ? void 0 : _b.value;
    return !!(max || min) && model.value.length >= max && !isChecked.value || model.value.length <= min && isChecked.value;
  });
  const isDisabled = computed(() => {
    var _a;
    const disabled = props.disabled || elForm.disabled;
    return isGroup.value ? ((_a = checkboxGroup.disabled) == null ? void 0 : _a.value) || disabled || isLimitDisabled.value : props.disabled || elForm.disabled;
  });
  return {
    isDisabled,
    isLimitDisabled
  };
};
const setStoreValue = (props, { model }) => {
  function addToStore() {
    if (Array.isArray(model.value) && !model.value.includes(props.label)) {
      model.value.push(props.label);
    } else {
      model.value = props.trueLabel || true;
    }
  }
  props.checked && addToStore();
};
const useEvent = (props, { isLimitExceeded }) => {
  const { elFormItem } = useCheckboxGroup();
  const { emit } = getCurrentInstance();
  function handleChange(e) {
    var _a, _b;
    if (isLimitExceeded.value)
      return;
    const target = e.target;
    const value = target.checked ? (_a = props.trueLabel) != null ? _a : true : (_b = props.falseLabel) != null ? _b : false;
    emit("change", value, e);
  }
  watch(() => props.modelValue, () => {
    var _a;
    (_a = elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change");
  });
  return {
    handleChange
  };
};
const useCheckbox = (props) => {
  const { model, isLimitExceeded } = useModel(props);
  const { focus, size, isChecked, checkboxSize } = useCheckboxStatus(props, {
    model
  });
  const { isDisabled } = useDisabled(props, { model, isChecked });
  const { handleChange } = useEvent(props, { isLimitExceeded });
  setStoreValue(props, { model });
  return {
    isChecked,
    isDisabled,
    checkboxSize,
    model,
    handleChange,
    focus,
    size
  };
};

var script$2 = defineComponent({
  name: "ElCheckbox",
  props: {
    modelValue: {
      type: [Boolean, Number, String],
      default: () => void 0
    },
    label: {
      type: [String, Boolean, Number, Object]
    },
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: {
      type: String,
      default: void 0
    },
    trueLabel: {
      type: [String, Number],
      default: void 0
    },
    falseLabel: {
      type: [String, Number],
      default: void 0
    },
    id: {
      type: String,
      default: void 0
    },
    controls: {
      type: String,
      default: void 0
    },
    border: Boolean,
    size: {
      type: String,
      validator: isValidComponentSize
    }
  },
  emits: [UPDATE_MODEL_EVENT, "change"],
  setup(props) {
    return useCheckbox(props);
  }
});

const _hoisted_1$2 = ["id", "aria-controls"];
const _hoisted_2$1 = ["tabindex", "role", "aria-checked"];
const _hoisted_3$1 = /* @__PURE__ */ createElementVNode("span", { class: "el-checkbox__inner" }, null, -1);
const _hoisted_4 = ["aria-hidden", "name", "disabled", "true-value", "false-value"];
const _hoisted_5 = ["aria-hidden", "disabled", "value", "name"];
const _hoisted_6 = {
  key: 0,
  class: "el-checkbox__label"
};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    id: _ctx.id,
    class: normalizeClass(["el-checkbox", [
      _ctx.checkboxSize ? "el-checkbox--" + _ctx.checkboxSize : "",
      { "is-disabled": _ctx.isDisabled },
      { "is-bordered": _ctx.border },
      { "is-checked": _ctx.isChecked }
    ]]),
    "aria-controls": _ctx.indeterminate ? _ctx.controls : null
  }, [
    createElementVNode("span", {
      class: normalizeClass(["el-checkbox__input", {
        "is-disabled": _ctx.isDisabled,
        "is-checked": _ctx.isChecked,
        "is-indeterminate": _ctx.indeterminate,
        "is-focus": _ctx.focus
      }]),
      tabindex: _ctx.indeterminate ? 0 : void 0,
      role: _ctx.indeterminate ? "checkbox" : void 0,
      "aria-checked": _ctx.indeterminate ? "mixed" : false
    }, [
      _hoisted_3$1,
      _ctx.trueLabel || _ctx.falseLabel ? withDirectives((openBlock(), createElementBlock("input", {
        key: 0,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.model = $event),
        class: "el-checkbox__original",
        type: "checkbox",
        "aria-hidden": _ctx.indeterminate ? "true" : "false",
        name: _ctx.name,
        disabled: _ctx.isDisabled,
        "true-value": _ctx.trueLabel,
        "false-value": _ctx.falseLabel,
        onChange: _cache[1] || (_cache[1] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
        onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.focus = true),
        onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.focus = false)
      }, null, 40, _hoisted_4)), [
        [vModelCheckbox, _ctx.model]
      ]) : withDirectives((openBlock(), createElementBlock("input", {
        key: 1,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.model = $event),
        class: "el-checkbox__original",
        type: "checkbox",
        "aria-hidden": _ctx.indeterminate ? "true" : "false",
        disabled: _ctx.isDisabled,
        value: _ctx.label,
        name: _ctx.name,
        onChange: _cache[5] || (_cache[5] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
        onFocus: _cache[6] || (_cache[6] = ($event) => _ctx.focus = true),
        onBlur: _cache[7] || (_cache[7] = ($event) => _ctx.focus = false)
      }, null, 40, _hoisted_5)), [
        [vModelCheckbox, _ctx.model]
      ])
    ], 10, _hoisted_2$1),
    _ctx.$slots.default || _ctx.label ? (openBlock(), createElementBlock("span", _hoisted_6, [
      renderSlot(_ctx.$slots, "default"),
      !_ctx.$slots.default ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ], 2112)) : createCommentVNode("v-if", true)
    ])) : createCommentVNode("v-if", true)
  ], 10, _hoisted_1$2);
}

script$2.render = render$2;
script$2.__file = "packages/components/checkbox/src/checkbox.vue";

var script$1 = defineComponent({
  name: "ElCheckboxButton",
  props: useCheckboxProps,
  emits: [UPDATE_MODEL_EVENT, "change"],
  setup(props) {
    const { focus, isChecked, isDisabled, size, model, handleChange } = useCheckbox(props);
    const { checkboxGroup } = useCheckboxGroup();
    const activeStyle = computed(() => {
      var _a, _b, _c, _d;
      const fillValue = (_b = (_a = checkboxGroup == null ? void 0 : checkboxGroup.fill) == null ? void 0 : _a.value) != null ? _b : "";
      return {
        backgroundColor: fillValue,
        borderColor: fillValue,
        color: (_d = (_c = checkboxGroup == null ? void 0 : checkboxGroup.textColor) == null ? void 0 : _c.value) != null ? _d : "",
        boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : null
      };
    });
    return {
      focus,
      isChecked,
      isDisabled,
      model,
      handleChange,
      activeStyle,
      size
    };
  }
});

const _hoisted_1$1 = ["aria-checked", "aria-disabled"];
const _hoisted_2 = ["name", "disabled", "true-value", "false-value"];
const _hoisted_3 = ["name", "disabled", "value"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["el-checkbox-button", [
      _ctx.size ? "el-checkbox-button--" + _ctx.size : "",
      { "is-disabled": _ctx.isDisabled },
      { "is-checked": _ctx.isChecked },
      { "is-focus": _ctx.focus }
    ]]),
    role: "checkbox",
    "aria-checked": _ctx.isChecked,
    "aria-disabled": _ctx.isDisabled
  }, [
    _ctx.trueLabel || _ctx.falseLabel ? withDirectives((openBlock(), createElementBlock("input", {
      key: 0,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.model = $event),
      class: "el-checkbox-button__original",
      type: "checkbox",
      name: _ctx.name,
      disabled: _ctx.isDisabled,
      "true-value": _ctx.trueLabel,
      "false-value": _ctx.falseLabel,
      onChange: _cache[1] || (_cache[1] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
      onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.focus = true),
      onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.focus = false)
    }, null, 40, _hoisted_2)), [
      [vModelCheckbox, _ctx.model]
    ]) : withDirectives((openBlock(), createElementBlock("input", {
      key: 1,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.model = $event),
      class: "el-checkbox-button__original",
      type: "checkbox",
      name: _ctx.name,
      disabled: _ctx.isDisabled,
      value: _ctx.label,
      onChange: _cache[5] || (_cache[5] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
      onFocus: _cache[6] || (_cache[6] = ($event) => _ctx.focus = true),
      onBlur: _cache[7] || (_cache[7] = ($event) => _ctx.focus = false)
    }, null, 40, _hoisted_3)), [
      [vModelCheckbox, _ctx.model]
    ]),
    _ctx.$slots.default || _ctx.label ? (openBlock(), createElementBlock("span", {
      key: 2,
      class: "el-checkbox-button__inner",
      style: normalizeStyle(_ctx.isChecked ? _ctx.activeStyle : null)
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ])
    ], 4)) : createCommentVNode("v-if", true)
  ], 10, _hoisted_1$1);
}

script$1.render = render$1;
script$1.__file = "packages/components/checkbox/src/checkbox-button.vue";

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
  name: "ElCheckboxGroup",
  props: {
    modelValue: {
      type: [Object, Boolean, Array],
      default: () => void 0
    },
    disabled: Boolean,
    min: {
      type: Number,
      default: void 0
    },
    max: {
      type: Number,
      default: void 0
    },
    size: {
      type: String,
      validator: isValidComponentSize
    },
    fill: {
      type: String,
      default: void 0
    },
    textColor: {
      type: String,
      default: void 0
    }
  },
  emits: [UPDATE_MODEL_EVENT, "change"],
  setup(props, ctx) {
    const { elFormItem, elFormItemSize, ELEMENT } = useCheckboxGroup();
    const checkboxGroupSize = computed(() => props.size || elFormItemSize.value || ELEMENT.size);
    const changeEvent = (value) => {
      ctx.emit(UPDATE_MODEL_EVENT, value);
      nextTick(() => {
        ctx.emit("change", value);
      });
    };
    const modelValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        changeEvent(val);
      }
    });
    provide("CheckboxGroup", __spreadProps(__spreadValues({
      name: "ElCheckboxGroup",
      modelValue
    }, toRefs(props)), {
      checkboxGroupSize,
      changeEvent
    }));
    watch(() => props.modelValue, () => {
      var _a;
      (_a = elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change");
    });
  }
});

const _hoisted_1 = {
  class: "el-checkbox-group",
  role: "group",
  "aria-label": "checkbox-group"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ]);
}

script.render = render;
script.__file = "packages/components/checkbox/src/checkbox-group.vue";

const ElCheckbox = withInstall(script$2, {
  CheckboxButton: script$1,
  CheckboxGroup: script
});
const ElCheckboxButton = withNoopInstall(script$1);
const ElCheckboxGroup = withNoopInstall(script);

export { ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElCheckbox as default };
