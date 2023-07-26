import { defineComponent, inject, ref, reactive, computed, watch, onMounted, onUpdated, resolveComponent, resolveDirective, openBlock, createElementBlock, normalizeClass, withModifiers, withDirectives, withKeys, createElementVNode, createCommentVNode, createVNode } from 'vue';
import { toRawType } from '@vue/shared';
import { RepeatClick } from 'element-plus/es/directives';
import { elFormKey, elFormItemKey } from 'element-plus/es/tokens';
import ElInput from 'element-plus/es/components/input';
import { useGlobalConfig } from 'element-plus/es/utils/util';
import { isValidComponentSize } from 'element-plus/es/utils/validators';
import { debugWarn } from 'element-plus/es/utils/error';

var script = defineComponent({
  name: "ElInputNumber",
  components: {
    ElInput
  },
  directives: {
    RepeatClick
  },
  props: {
    step: {
      type: Number,
      default: 1
    },
    stepStrictly: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    modelValue: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: isValidComponentSize
    },
    controls: {
      type: Boolean,
      default: true
    },
    controlsPosition: {
      type: String,
      default: ""
    },
    name: String,
    label: String,
    placeholder: String,
    precision: {
      type: Number,
      validator: (val) => val >= 0 && val === parseInt(`${val}`, 10)
    }
  },
  emits: ["update:modelValue", "change", "input", "blur", "focus"],
  setup(props, { emit }) {
    const ELEMENT = useGlobalConfig();
    const elForm = inject(elFormKey, {});
    const elFormItem = inject(elFormItemKey, {});
    const input = ref(null);
    const data = reactive({
      currentValue: props.modelValue,
      userInput: null
    });
    const minDisabled = computed(() => {
      return _decrease(props.modelValue) < props.min;
    });
    const maxDisabled = computed(() => {
      return _increase(props.modelValue) > props.max;
    });
    const numPrecision = computed(() => {
      const stepPrecision = getPrecision(props.step);
      if (props.precision !== void 0) {
        if (stepPrecision > props.precision) {
          debugWarn("InputNumber", "precision should not be less than the decimal places of step");
        }
        return props.precision;
      } else {
        return Math.max(getPrecision(props.modelValue), stepPrecision);
      }
    });
    const controlsAtRight = computed(() => {
      return props.controls && props.controlsPosition === "right";
    });
    const inputNumberSize = computed(() => {
      return props.size || elFormItem.size || ELEMENT.size;
    });
    const inputNumberDisabled = computed(() => {
      return props.disabled || elForm.disabled;
    });
    const displayValue = computed(() => {
      if (data.userInput !== null) {
        return data.userInput;
      }
      let currentValue = data.currentValue;
      if (typeof currentValue === "number") {
        if (props.precision !== void 0) {
          currentValue = currentValue.toFixed(props.precision);
        }
      }
      return currentValue;
    });
    const toPrecision = (num, pre) => {
      if (pre === void 0)
        pre = numPrecision.value;
      return parseFloat(`${Math.round(num * Math.pow(10, pre)) / Math.pow(10, pre)}`);
    };
    const getPrecision = (value) => {
      if (value === void 0)
        return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf(".");
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    };
    const _increase = (val) => {
      if (typeof val !== "number" && val !== void 0)
        return data.currentValue;
      const precisionFactor = Math.pow(10, numPrecision.value);
      return toPrecision((precisionFactor * val + precisionFactor * props.step) / precisionFactor);
    };
    const _decrease = (val) => {
      if (typeof val !== "number" && val !== void 0)
        return data.currentValue;
      const precisionFactor = Math.pow(10, numPrecision.value);
      return toPrecision((precisionFactor * val - precisionFactor * props.step) / precisionFactor);
    };
    const increase = () => {
      if (inputNumberDisabled.value || maxDisabled.value)
        return;
      const value = props.modelValue || 0;
      const newVal = _increase(value);
      setCurrentValue(newVal);
    };
    const decrease = () => {
      if (inputNumberDisabled.value || minDisabled.value)
        return;
      const value = props.modelValue || 0;
      const newVal = _decrease(value);
      setCurrentValue(newVal);
    };
    const setCurrentValue = (newVal) => {
      const oldVal = data.currentValue;
      if (typeof newVal === "number" && props.precision !== void 0) {
        newVal = toPrecision(newVal, props.precision);
      }
      if (newVal !== void 0 && newVal >= props.max)
        newVal = props.max;
      if (newVal !== void 0 && newVal <= props.min)
        newVal = props.min;
      if (oldVal === newVal)
        return;
      data.userInput = null;
      emit("update:modelValue", newVal);
      emit("input", newVal);
      emit("change", newVal, oldVal);
      data.currentValue = newVal;
    };
    const handleInput = (value) => {
      return data.userInput = value;
    };
    const handleInputChange = (value) => {
      const newVal = value === "" ? void 0 : Number(value);
      if (!isNaN(newVal) || value === "") {
        setCurrentValue(newVal);
      }
      data.userInput = null;
    };
    const focus = () => {
      var _a, _b;
      (_b = (_a = input.value).focus) == null ? void 0 : _b.call(_a);
    };
    const blur = () => {
      var _a, _b;
      (_b = (_a = input.value).blur) == null ? void 0 : _b.call(_a);
    };
    watch(() => props.modelValue, (value) => {
      let newVal = value === void 0 ? value : Number(value);
      if (newVal !== void 0) {
        if (isNaN(newVal))
          return;
        if (props.stepStrictly) {
          const stepPrecision = getPrecision(props.step);
          const precisionFactor = Math.pow(10, stepPrecision);
          newVal = Math.round(newVal / props.step) * precisionFactor * props.step / precisionFactor;
        }
        if (props.precision !== void 0) {
          newVal = toPrecision(newVal, props.precision);
        }
      }
      if (newVal !== void 0 && newVal >= props.max) {
        newVal = props.max;
        emit("update:modelValue", newVal);
      }
      if (newVal !== void 0 && newVal <= props.min) {
        newVal = props.min;
        emit("update:modelValue", newVal);
      }
      data.currentValue = newVal;
      data.userInput = null;
    }, { immediate: true });
    onMounted(() => {
      const innerInput = input.value.input;
      innerInput.setAttribute("role", "spinbutton");
      innerInput.setAttribute("aria-valuemax", props.max);
      innerInput.setAttribute("aria-valuemin", props.min);
      innerInput.setAttribute("aria-valuenow", data.currentValue);
      innerInput.setAttribute("aria-disabled", inputNumberDisabled.value);
      if (toRawType(props.modelValue) !== "Number" && props.modelValue !== void 0) {
        emit("update:modelValue", void 0);
      }
    });
    onUpdated(() => {
      const innerInput = input.value.input;
      innerInput.setAttribute("aria-valuenow", data.currentValue);
    });
    return {
      input,
      displayValue,
      handleInput,
      handleInputChange,
      controlsAtRight,
      decrease,
      increase,
      inputNumberSize,
      inputNumberDisabled,
      maxDisabled,
      minDisabled,
      focus,
      blur
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _directive_repeat_click = resolveDirective("repeat-click");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([
      "el-input-number",
      _ctx.inputNumberSize ? "el-input-number--" + _ctx.inputNumberSize : "",
      { "is-disabled": _ctx.inputNumberDisabled },
      { "is-without-controls": !_ctx.controls },
      { "is-controls-right": _ctx.controlsAtRight }
    ]),
    onDragstart: _cache[4] || (_cache[4] = withModifiers(() => {
    }, ["prevent"]))
  }, [
    _ctx.controls ? withDirectives((openBlock(), createElementBlock("span", {
      key: 0,
      class: normalizeClass(["el-input-number__decrease", { "is-disabled": _ctx.minDisabled }]),
      role: "button",
      onKeydown: _cache[0] || (_cache[0] = withKeys((...args) => _ctx.decrease && _ctx.decrease(...args), ["enter"]))
    }, [
      createElementVNode("i", {
        class: normalizeClass(`el-icon-${_ctx.controlsAtRight ? "arrow-down" : "minus"}`)
      }, null, 2)
    ], 34)), [
      [_directive_repeat_click, _ctx.decrease]
    ]) : createCommentVNode("v-if", true),
    _ctx.controls ? withDirectives((openBlock(), createElementBlock("span", {
      key: 1,
      class: normalizeClass(["el-input-number__increase", { "is-disabled": _ctx.maxDisabled }]),
      role: "button",
      onKeydown: _cache[1] || (_cache[1] = withKeys((...args) => _ctx.increase && _ctx.increase(...args), ["enter"]))
    }, [
      createElementVNode("i", {
        class: normalizeClass(`el-icon-${_ctx.controlsAtRight ? "arrow-up" : "plus"}`)
      }, null, 2)
    ], 34)), [
      [_directive_repeat_click, _ctx.increase]
    ]) : createCommentVNode("v-if", true),
    createVNode(_component_el_input, {
      ref: "input",
      "model-value": _ctx.displayValue,
      placeholder: _ctx.placeholder,
      disabled: _ctx.inputNumberDisabled,
      size: _ctx.inputNumberSize,
      max: _ctx.max,
      min: _ctx.min,
      name: _ctx.name,
      label: _ctx.label,
      onKeydown: [
        withKeys(withModifiers(_ctx.increase, ["prevent"]), ["up"]),
        withKeys(withModifiers(_ctx.decrease, ["prevent"]), ["down"])
      ],
      onBlur: _cache[2] || (_cache[2] = (event) => _ctx.$emit("blur", event)),
      onFocus: _cache[3] || (_cache[3] = (event) => _ctx.$emit("focus", event)),
      onInput: _ctx.handleInput,
      onChange: _ctx.handleInputChange
    }, null, 8, ["model-value", "placeholder", "disabled", "size", "max", "min", "name", "label", "onKeydown", "onInput", "onChange"])
  ], 34);
}

script.render = render;
script.__file = "packages/components/input-number/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _InputNumber = script;
const ElInputNumber = _InputNumber;

export { ElInputNumber, _InputNumber as default };
