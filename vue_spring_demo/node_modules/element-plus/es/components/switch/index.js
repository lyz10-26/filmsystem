import { defineComponent, inject, ref, watch, computed, onMounted, nextTick, openBlock, createElementBlock, normalizeClass, withModifiers, createElementVNode, withKeys, createCommentVNode, toDisplayString, normalizeStyle } from 'vue';
import { isPromise } from '@vue/shared';
import { elFormKey, elFormItemKey } from 'element-plus/es/tokens';
import { isBool } from 'element-plus/es/utils/util';
import { throwError, debugWarn } from 'element-plus/es/utils/error';

var script = defineComponent({
  name: "ElSwitch",
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: false
    },
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    },
    activeIconClass: {
      type: String,
      default: ""
    },
    inactiveIconClass: {
      type: String,
      default: ""
    },
    activeText: {
      type: String,
      default: ""
    },
    inactiveText: {
      type: String,
      default: ""
    },
    activeColor: {
      type: String,
      default: ""
    },
    inactiveColor: {
      type: String,
      default: ""
    },
    borderColor: {
      type: String,
      default: ""
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    id: String,
    loading: {
      type: Boolean,
      default: false
    },
    beforeChange: Function
  },
  emits: ["update:modelValue", "change", "input"],
  setup(props, ctx) {
    const elForm = inject(elFormKey, {});
    const elFormItem = inject(elFormItemKey, {});
    const isModelValue = ref(props.modelValue !== false);
    const input = ref(null);
    const core = ref(null);
    const scope = "ElSwitch";
    watch(() => props.modelValue, () => {
      isModelValue.value = true;
    });
    watch(() => props.value, () => {
      isModelValue.value = false;
    });
    const actualValue = computed(() => {
      return isModelValue.value ? props.modelValue : props.value;
    });
    const checked = computed(() => {
      return actualValue.value === props.activeValue;
    });
    if (!~[props.activeValue, props.inactiveValue].indexOf(actualValue.value)) {
      ctx.emit("update:modelValue", props.inactiveValue);
      ctx.emit("change", props.inactiveValue);
      ctx.emit("input", props.inactiveValue);
    }
    watch(checked, () => {
      var _a;
      input.value.checked = checked.value;
      if (props.activeColor || props.inactiveColor) {
        setBackgroundColor();
      }
      if (props.validateEvent) {
        (_a = elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change");
      }
    });
    const switchDisabled = computed(() => {
      return props.disabled || props.loading || (elForm || {}).disabled;
    });
    const handleChange = () => {
      const val = checked.value ? props.inactiveValue : props.activeValue;
      ctx.emit("update:modelValue", val);
      ctx.emit("change", val);
      ctx.emit("input", val);
      nextTick(() => {
        input.value.checked = checked.value;
      });
    };
    const switchValue = () => {
      if (switchDisabled.value)
        return;
      const { beforeChange } = props;
      if (!beforeChange) {
        handleChange();
        return;
      }
      const shouldChange = beforeChange();
      const isExpectType = [isPromise(shouldChange), isBool(shouldChange)].some((i) => i);
      if (!isExpectType) {
        throwError(scope, "beforeChange must return type `Promise<boolean>` or `boolean`");
      }
      if (isPromise(shouldChange)) {
        shouldChange.then((result) => {
          if (result) {
            handleChange();
          }
        }).catch((e) => {
          debugWarn(scope, `some error occurred: ${e}`);
        });
      } else if (shouldChange) {
        handleChange();
      }
    };
    const setBackgroundColor = () => {
      const newColor = checked.value ? props.activeColor : props.inactiveColor;
      const coreEl = core.value;
      if (props.borderColor)
        coreEl.style.borderColor = props.borderColor;
      else if (!props.borderColor)
        coreEl.style.borderColor = newColor;
      coreEl.style.backgroundColor = newColor;
      coreEl.children[0].style.color = newColor;
    };
    const focus = () => {
      var _a, _b;
      (_b = (_a = input.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    };
    onMounted(() => {
      if (props.activeColor || props.inactiveColor || props.borderColor) {
        setBackgroundColor();
      }
      input.value.checked = checked.value;
    });
    return {
      input,
      core,
      switchDisabled,
      checked,
      handleChange,
      switchValue,
      focus
    };
  }
});

const _hoisted_1 = ["aria-checked", "aria-disabled"];
const _hoisted_2 = ["id", "name", "true-value", "false-value", "disabled"];
const _hoisted_3 = ["aria-hidden"];
const _hoisted_4 = { class: "el-switch__action" };
const _hoisted_5 = {
  key: 0,
  class: "el-icon-loading"
};
const _hoisted_6 = ["aria-hidden"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["el-switch", { "is-disabled": _ctx.switchDisabled, "is-checked": _ctx.checked }]),
    role: "switch",
    "aria-checked": _ctx.checked,
    "aria-disabled": _ctx.switchDisabled,
    onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.switchValue && _ctx.switchValue(...args), ["prevent"]))
  }, [
    createElementVNode("input", {
      id: _ctx.id,
      ref: "input",
      class: "el-switch__input",
      type: "checkbox",
      name: _ctx.name,
      "true-value": _ctx.activeValue,
      "false-value": _ctx.inactiveValue,
      disabled: _ctx.switchDisabled,
      onChange: _cache[0] || (_cache[0] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
      onKeydown: _cache[1] || (_cache[1] = withKeys((...args) => _ctx.switchValue && _ctx.switchValue(...args), ["enter"]))
    }, null, 40, _hoisted_2),
    _ctx.inactiveIconClass || _ctx.inactiveText ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: normalizeClass([
        "el-switch__label",
        "el-switch__label--left",
        !_ctx.checked ? "is-active" : ""
      ])
    }, [
      _ctx.inactiveIconClass ? (openBlock(), createElementBlock("i", {
        key: 0,
        class: normalizeClass([_ctx.inactiveIconClass])
      }, null, 2)) : createCommentVNode("v-if", true),
      !_ctx.inactiveIconClass && _ctx.inactiveText ? (openBlock(), createElementBlock("span", {
        key: 1,
        "aria-hidden": _ctx.checked
      }, toDisplayString(_ctx.inactiveText), 9, _hoisted_3)) : createCommentVNode("v-if", true)
    ], 2)) : createCommentVNode("v-if", true),
    createElementVNode("span", {
      ref: "core",
      class: "el-switch__core",
      style: normalizeStyle({ width: (_ctx.width || 40) + "px" })
    }, [
      createElementVNode("div", _hoisted_4, [
        _ctx.loading ? (openBlock(), createElementBlock("i", _hoisted_5)) : createCommentVNode("v-if", true)
      ])
    ], 4),
    _ctx.activeIconClass || _ctx.activeText ? (openBlock(), createElementBlock("span", {
      key: 1,
      class: normalizeClass([
        "el-switch__label",
        "el-switch__label--right",
        _ctx.checked ? "is-active" : ""
      ])
    }, [
      _ctx.activeIconClass ? (openBlock(), createElementBlock("i", {
        key: 0,
        class: normalizeClass([_ctx.activeIconClass])
      }, null, 2)) : createCommentVNode("v-if", true),
      !_ctx.activeIconClass && _ctx.activeText ? (openBlock(), createElementBlock("span", {
        key: 1,
        "aria-hidden": !_ctx.checked
      }, toDisplayString(_ctx.activeText), 9, _hoisted_6)) : createCommentVNode("v-if", true)
    ], 2)) : createCommentVNode("v-if", true)
  ], 10, _hoisted_1);
}

script.render = render;
script.__file = "packages/components/switch/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Switch = script;
const ElSwitch = _Switch;

export { ElSwitch, _Switch as default };
