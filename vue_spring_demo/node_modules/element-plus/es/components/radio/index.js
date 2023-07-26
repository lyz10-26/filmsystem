import { withInstall, withNoopInstall } from 'element-plus/es/utils/with-install';
import { inject, ref, computed, defineComponent, nextTick, openBlock, createElementBlock, normalizeClass, withKeys, withModifiers, createElementVNode, withDirectives, vModelRadio, renderSlot, createTextVNode, toDisplayString, normalizeStyle, provide, reactive, toRefs, watch, onMounted } from 'vue';
import { UPDATE_MODEL_EVENT } from 'element-plus/es/utils/constants';
import { isValidComponentSize } from 'element-plus/es/utils/validators';
import { elFormKey, elFormItemKey } from 'element-plus/es/tokens';
import { useGlobalConfig } from 'element-plus/es/utils/util';
import { EVENT_CODE } from 'element-plus/es/utils/aria';

const radioGroupKey = "RadioGroup";

const useRadio = () => {
  const ELEMENT = useGlobalConfig();
  const elForm = inject(elFormKey, {});
  const elFormItem = inject(elFormItemKey, {});
  const radioGroup = inject(radioGroupKey, {});
  const focus = ref(false);
  const isGroup = computed(() => (radioGroup == null ? void 0 : radioGroup.name) === "ElRadioGroup");
  const elFormItemSize = computed(() => elFormItem.size || ELEMENT.size);
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
  const isDisabled = computed(() => {
    return isGroup.value ? radioGroup.disabled || props.disabled || elForm.disabled : props.disabled || elForm.disabled;
  });
  const tabIndex = computed(() => {
    return isDisabled.value || isGroup.value && model.value !== props.label ? -1 : 0;
  });
  return {
    isDisabled,
    tabIndex
  };
};

var script$2 = defineComponent({
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
      validator: isValidComponentSize
    }
  },
  emits: [UPDATE_MODEL_EVENT, "change"],
  setup(props, ctx) {
    const { isGroup, radioGroup, elFormItemSize, ELEMENT, focus, elForm } = useRadio();
    const radioRef = ref();
    const model = computed({
      get() {
        return isGroup.value ? radioGroup.modelValue : props.modelValue;
      },
      set(val) {
        if (isGroup.value) {
          radioGroup.changeEvent(val);
        } else {
          ctx.emit(UPDATE_MODEL_EVENT, val);
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
    const radioSize = computed(() => {
      const temRadioSize = props.size || elFormItemSize.value || ELEMENT.size;
      return isGroup.value ? radioGroup.radioGroupSize || temRadioSize : temRadioSize;
    });
    function handleChange() {
      nextTick(() => {
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
const _hoisted_2$1 = /* @__PURE__ */ createElementVNode("span", { class: "el-radio__inner" }, null, -1);
const _hoisted_3 = ["value", "name", "disabled"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["el-radio", {
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
    onKeydown: _cache[5] || (_cache[5] = withKeys(withModifiers(($event) => _ctx.model = _ctx.isDisabled ? _ctx.model : _ctx.label, ["stop", "prevent"]), ["space"]))
  }, [
    createElementVNode("span", {
      class: normalizeClass(["el-radio__input", {
        "is-disabled": _ctx.isDisabled,
        "is-checked": _ctx.model === _ctx.label
      }])
    }, [
      _hoisted_2$1,
      withDirectives(createElementVNode("input", {
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
        [vModelRadio, _ctx.model]
      ])
    ], 2),
    createElementVNode("span", {
      class: "el-radio__label",
      onKeydown: _cache[4] || (_cache[4] = withModifiers(() => {
      }, ["stop"]))
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
      ])
    ], 32)
  ], 42, _hoisted_1$1);
}

script$2.render = render$2;
script$2.__file = "packages/components/radio/src/radio.vue";

var script$1 = defineComponent({
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
    const size = computed(() => {
      return radioGroup.radioGroupSize || elFormItemSize.value || ELEMENT.size;
    });
    const radioRef = ref();
    const value = computed({
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
    const activeStyle = computed(() => {
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
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["el-radio-button", [
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
    onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => _ctx.value = _ctx.isDisabled ? _ctx.value : _ctx.label, ["stop", "prevent"]), ["space"]))
  }, [
    withDirectives(createElementVNode("input", {
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
      [vModelRadio, _ctx.value]
    ]),
    createElementVNode("span", {
      class: "el-radio-button__inner",
      style: normalizeStyle(_ctx.value === _ctx.label ? _ctx.activeStyle : null),
      onKeydown: _cache[3] || (_cache[3] = withModifiers(() => {
      }, ["stop"]))
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
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
var script = defineComponent({
  name: "ElRadioGroup",
  componentName: "ElRadioGroup",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    size: {
      type: String,
      validator: isValidComponentSize
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
  emits: [UPDATE_MODEL_EVENT, "change"],
  setup(props, ctx) {
    const radioGroup = ref(null);
    const elFormItem = inject(elFormItemKey, {});
    const radioGroupSize = computed(() => {
      return props.size || elFormItem.size;
    });
    const changeEvent = (value) => {
      ctx.emit(UPDATE_MODEL_EVENT, value);
      nextTick(() => {
        ctx.emit("change", value);
      });
    };
    provide(radioGroupKey, reactive(__spreadProps(__spreadValues({
      name: "ElRadioGroup"
    }, toRefs(props)), {
      radioGroupSize,
      changeEvent
    })));
    watch(() => props.modelValue, () => {
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
        case EVENT_CODE.left:
        case EVENT_CODE.up:
          e.stopPropagation();
          e.preventDefault();
          nextIndex = index === 0 ? length - 1 : index - 1;
          break;
        case EVENT_CODE.right:
        case EVENT_CODE.down:
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
    onMounted(() => {
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
  return openBlock(), createElementBlock("div", {
    ref: "radioGroup",
    class: "el-radio-group",
    role: "radiogroup",
    onKeydown: _cache[0] || (_cache[0] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 544);
}

script.render = render;
script.__file = "packages/components/radio/src/radio-group.vue";

const ElRadio = withInstall(script$2, {
  RadioButton: script$1,
  RadioGroup: script
});
const ElRadioGroup = withNoopInstall(script);
const ElRadioButton = withNoopInstall(script$1);

export { ElRadio, ElRadioButton, ElRadioGroup, ElRadio as default };
