import { defineComponent, ref, computed, watch, onMounted, onUpdated, nextTick, resolveComponent, resolveDirective, openBlock, createBlock, withCtx, withDirectives, createElementVNode, normalizeClass, normalizeStyle, createVNode, mergeProps, withKeys, withModifiers, createSlots, renderSlot, createElementBlock, Fragment, renderList, createTextVNode, toDisplayString } from 'vue';
import { NOOP } from '@vue/shared';
import debounce from 'lodash/debounce';
import { useAttrs } from 'element-plus/es/hooks';
import { ClickOutside } from 'element-plus/es/directives';
import { generateId, isArray } from 'element-plus/es/utils/util';
import { UPDATE_MODEL_EVENT } from 'element-plus/es/utils/constants';
import { throwError } from 'element-plus/es/utils/error';
import ElInput from 'element-plus/es/components/input';
import ElScrollbar from 'element-plus/es/components/scrollbar';
import ElPopper, { Effect } from 'element-plus/es/components/popper';

var script = defineComponent({
  name: "ElAutocomplete",
  components: {
    ElPopper,
    ElInput,
    ElScrollbar
  },
  directives: {
    clickoutside: ClickOutside
  },
  inheritAttrs: false,
  props: {
    valueKey: {
      type: String,
      default: "value"
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    debounce: {
      type: Number,
      default: 300
    },
    placement: {
      type: String,
      validator: (val) => {
        return [
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end"
        ].includes(val);
      },
      default: "bottom-start"
    },
    fetchSuggestions: {
      type: Function,
      default: NOOP
    },
    popperClass: {
      type: String,
      default: ""
    },
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    selectWhenUnmatched: {
      type: Boolean,
      default: false
    },
    hideLoading: {
      type: Boolean,
      default: false
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    highlightFirstItem: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    UPDATE_MODEL_EVENT,
    "input",
    "change",
    "focus",
    "blur",
    "clear",
    "select"
  ],
  setup(props, ctx) {
    const attrs = useAttrs();
    const suggestions = ref([]);
    const highlightedIndex = ref(-1);
    const dropdownWidth = ref("");
    const activated = ref(false);
    const suggestionDisabled = ref(false);
    const loading = ref(false);
    const inputRef = ref(null);
    const regionRef = ref(null);
    const popper = ref(null);
    const id = computed(() => {
      return `el-autocomplete-${generateId()}`;
    });
    const suggestionVisible = computed(() => {
      const isValidData = isArray(suggestions.value) && suggestions.value.length > 0;
      return (isValidData || loading.value) && activated.value;
    });
    const suggestionLoading = computed(() => {
      return !props.hideLoading && loading.value;
    });
    const updatePopperPosition = () => {
      nextTick(popper.value.update);
    };
    watch(suggestionVisible, () => {
      dropdownWidth.value = `${inputRef.value.$el.offsetWidth}px`;
    });
    onMounted(() => {
      inputRef.value.inputOrTextarea.setAttribute("role", "textbox");
      inputRef.value.inputOrTextarea.setAttribute("aria-autocomplete", "list");
      inputRef.value.inputOrTextarea.setAttribute("aria-controls", "id");
      inputRef.value.inputOrTextarea.setAttribute("aria-activedescendant", `${id.value}-item-${highlightedIndex.value}`);
      const $ul = regionRef.value.querySelector(".el-autocomplete-suggestion__list");
      $ul.setAttribute("role", "listbox");
      $ul.setAttribute("id", id.value);
    });
    onUpdated(updatePopperPosition);
    const getData = (queryString) => {
      if (suggestionDisabled.value) {
        return;
      }
      loading.value = true;
      updatePopperPosition();
      props.fetchSuggestions(queryString, (suggestionsArg) => {
        loading.value = false;
        if (suggestionDisabled.value) {
          return;
        }
        if (isArray(suggestionsArg)) {
          suggestions.value = suggestionsArg;
          highlightedIndex.value = props.highlightFirstItem ? 0 : -1;
        } else {
          throwError("ElAutocomplete", "autocomplete suggestions must be an array");
        }
      });
    };
    const debouncedGetData = debounce(getData, props.debounce);
    const handleInput = (value) => {
      ctx.emit("input", value);
      ctx.emit(UPDATE_MODEL_EVENT, value);
      suggestionDisabled.value = false;
      if (!props.triggerOnFocus && !value) {
        suggestionDisabled.value = true;
        suggestions.value = [];
        return;
      }
      debouncedGetData(value);
    };
    const handleChange = (value) => {
      ctx.emit("change", value);
    };
    const handleFocus = (e) => {
      activated.value = true;
      ctx.emit("focus", e);
      if (props.triggerOnFocus) {
        debouncedGetData(props.modelValue);
      }
    };
    const handleBlur = (e) => {
      ctx.emit("blur", e);
    };
    const handleClear = () => {
      activated.value = false;
      ctx.emit(UPDATE_MODEL_EVENT, "");
      ctx.emit("clear");
    };
    const handleKeyEnter = () => {
      if (suggestionVisible.value && highlightedIndex.value >= 0 && highlightedIndex.value < suggestions.value.length) {
        select(suggestions.value[highlightedIndex.value]);
      } else if (props.selectWhenUnmatched) {
        ctx.emit("select", { value: props.modelValue });
        nextTick(() => {
          suggestions.value = [];
          highlightedIndex.value = -1;
        });
      }
    };
    const close = () => {
      activated.value = false;
    };
    const focus = () => {
      inputRef.value.focus();
    };
    const select = (item) => {
      ctx.emit("input", item[props.valueKey]);
      ctx.emit(UPDATE_MODEL_EVENT, item[props.valueKey]);
      ctx.emit("select", item);
      nextTick(() => {
        suggestions.value = [];
        highlightedIndex.value = -1;
      });
    };
    const highlight = (index) => {
      if (!suggestionVisible.value || loading.value) {
        return;
      }
      if (index < 0) {
        highlightedIndex.value = -1;
        return;
      }
      if (index >= suggestions.value.length) {
        index = suggestions.value.length - 1;
      }
      const suggestion = regionRef.value.querySelector(".el-autocomplete-suggestion__wrap");
      const suggestionList = suggestion.querySelectorAll(".el-autocomplete-suggestion__list li");
      const highlightItem = suggestionList[index];
      const scrollTop = suggestion.scrollTop;
      const { offsetTop, scrollHeight } = highlightItem;
      if (offsetTop + scrollHeight > scrollTop + suggestion.clientHeight) {
        suggestion.scrollTop += scrollHeight;
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= scrollHeight;
      }
      highlightedIndex.value = index;
      inputRef.value.inputOrTextarea.setAttribute("aria-activedescendant", `${id.value}-item-${highlightedIndex.value}`);
    };
    return {
      Effect,
      attrs,
      suggestions,
      highlightedIndex,
      dropdownWidth,
      activated,
      suggestionDisabled,
      loading,
      inputRef,
      regionRef,
      popper,
      id,
      suggestionVisible,
      suggestionLoading,
      getData,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear,
      handleKeyEnter,
      close,
      focus,
      select,
      highlight
    };
  }
});

const _hoisted_1 = ["aria-expanded", "aria-owns"];
const _hoisted_2 = { key: 0 };
const _hoisted_3 = /* @__PURE__ */ createElementVNode("i", { class: "el-icon-loading" }, null, -1);
const _hoisted_4 = [
  _hoisted_3
];
const _hoisted_5 = ["id", "aria-selected", "onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_el_popper = resolveComponent("el-popper");
  const _directive_clickoutside = resolveDirective("clickoutside");
  return openBlock(), createBlock(_component_el_popper, {
    ref: "popper",
    visible: _ctx.suggestionVisible,
    "onUpdate:visible": _cache[2] || (_cache[2] = ($event) => _ctx.suggestionVisible = $event),
    placement: _ctx.placement,
    "popper-class": `el-autocomplete__popper ${_ctx.popperClass}`,
    "append-to-body": _ctx.popperAppendToBody,
    pure: "",
    "manual-mode": "",
    effect: _ctx.Effect.LIGHT,
    trigger: "click",
    transition: "el-zoom-in-top",
    "gpu-acceleration": false
  }, {
    trigger: withCtx(() => [
      withDirectives(createElementVNode("div", {
        class: normalizeClass(["el-autocomplete", _ctx.$attrs.class]),
        style: normalizeStyle(_ctx.$attrs.style),
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-expanded": _ctx.suggestionVisible,
        "aria-owns": _ctx.id
      }, [
        createVNode(_component_el_input, mergeProps({ ref: "inputRef" }, _ctx.attrs, {
          "model-value": _ctx.modelValue,
          onInput: _ctx.handleInput,
          onChange: _ctx.handleChange,
          onFocus: _ctx.handleFocus,
          onBlur: _ctx.handleBlur,
          onClear: _ctx.handleClear,
          onKeydown: [
            _cache[0] || (_cache[0] = withKeys(withModifiers(($event) => _ctx.highlight(_ctx.highlightedIndex - 1), ["prevent"]), ["up"])),
            _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => _ctx.highlight(_ctx.highlightedIndex + 1), ["prevent"]), ["down"])),
            withKeys(_ctx.handleKeyEnter, ["enter"]),
            withKeys(_ctx.close, ["tab"])
          ]
        }), createSlots({ _: 2 }, [
          _ctx.$slots.prepend ? {
            name: "prepend",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "prepend")
            ])
          } : void 0,
          _ctx.$slots.append ? {
            name: "append",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "append")
            ])
          } : void 0,
          _ctx.$slots.prefix ? {
            name: "prefix",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "prefix")
            ])
          } : void 0,
          _ctx.$slots.suffix ? {
            name: "suffix",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "suffix")
            ])
          } : void 0
        ]), 1040, ["model-value", "onInput", "onChange", "onFocus", "onBlur", "onClear", "onKeydown"])
      ], 14, _hoisted_1), [
        [_directive_clickoutside, _ctx.close]
      ])
    ]),
    default: withCtx(() => [
      createElementVNode("div", {
        ref: "regionRef",
        class: normalizeClass([
          "el-autocomplete-suggestion",
          _ctx.suggestionLoading && "is-loading"
        ]),
        style: normalizeStyle({ minWidth: _ctx.dropdownWidth, outline: "none" }),
        role: "region"
      }, [
        createVNode(_component_el_scrollbar, {
          tag: "ul",
          "wrap-class": "el-autocomplete-suggestion__wrap",
          "view-class": "el-autocomplete-suggestion__list"
        }, {
          default: withCtx(() => [
            _ctx.suggestionLoading ? (openBlock(), createElementBlock("li", _hoisted_2, _hoisted_4)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.suggestions, (item, index) => {
              return openBlock(), createElementBlock("li", {
                id: `${_ctx.id}-item-${index}`,
                key: index,
                class: normalizeClass({ highlighted: _ctx.highlightedIndex === index }),
                role: "option",
                "aria-selected": _ctx.highlightedIndex === index,
                onClick: ($event) => _ctx.select(item)
              }, [
                renderSlot(_ctx.$slots, "default", { item }, () => [
                  createTextVNode(toDisplayString(item[_ctx.valueKey]), 1)
                ])
              ], 10, _hoisted_5);
            }), 128))
          ]),
          _: 3
        })
      ], 6)
    ]),
    _: 3
  }, 8, ["visible", "placement", "popper-class", "append-to-body", "effect"]);
}

script.render = render;
script.__file = "packages/components/autocomplete/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Autocomplete = script;
const ElAutocomplete = _Autocomplete;

export { ElAutocomplete, _Autocomplete as default };
