import { defineComponent, inject, ref, computed, watch, nextTick, onMounted, onBeforeUnmount, resolveComponent, resolveDirective, openBlock, createBlock, withCtx, withDirectives, createElementVNode, normalizeClass, createVNode, createElementBlock, withModifiers, Fragment, renderList, toDisplayString, withKeys, vModelText, createCommentVNode, vShow, renderSlot } from 'vue';
import { isPromise } from '@vue/shared';
import debounce from 'lodash/debounce';
import ElCascaderPanel, { CommonProps } from 'element-plus/es/components/cascader-panel';
import ElInput from 'element-plus/es/components/input';
import ElPopper, { Effect } from 'element-plus/es/components/popper';
import ElScrollbar from 'element-plus/es/components/scrollbar';
import ElTag from 'element-plus/es/components/tag';
import { elFormKey, elFormItemKey } from 'element-plus/es/tokens';
import { ClickOutside } from 'element-plus/es/directives';
import { useLocaleInject } from 'element-plus/es/hooks';
import { EVENT_CODE } from 'element-plus/es/utils/aria';
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from 'element-plus/es/utils/constants';
import isServer from 'element-plus/es/utils/isServer';
import { useGlobalConfig } from 'element-plus/es/utils/util';
import { addResizeListener, removeResizeListener } from 'element-plus/es/utils/resize-event';
import { isValidComponentSize } from 'element-plus/es/utils/validators';
import { isKorean } from 'element-plus/es/utils/isDef';

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
const DEFAULT_INPUT_HEIGHT = 40;
const INPUT_HEIGHT_MAP = {
  medium: 36,
  small: 32,
  mini: 28
};
const popperOptions = {
  modifiers: [
    {
      name: "arrowPosition",
      enabled: true,
      phase: "main",
      fn: ({ state }) => {
        const { modifiersData, placement } = state;
        if (["right", "left"].includes(placement))
          return;
        modifiersData.arrow.x = 35;
      },
      requires: ["arrow"]
    }
  ]
};
var script = defineComponent({
  name: "ElCascader",
  components: {
    ElCascaderPanel,
    ElInput,
    ElPopper,
    ElScrollbar,
    ElTag
  },
  directives: {
    Clickoutside: ClickOutside
  },
  props: __spreadProps(__spreadValues({}, CommonProps), {
    size: {
      type: String,
      validator: isValidComponentSize
    },
    placeholder: {
      type: String
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    filterMethod: {
      type: Function,
      default: (node, keyword) => node.text.includes(keyword)
    },
    separator: {
      type: String,
      default: " / "
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    collapseTags: Boolean,
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function,
      default: () => true
    },
    popperClass: {
      type: String,
      default: ""
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  }),
  emits: [
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
    "focus",
    "blur",
    "visible-change",
    "expand-change",
    "remove-tag"
  ],
  setup(props, { emit }) {
    let inputInitialHeight = 0;
    let pressDeleteCount = 0;
    const { t } = useLocaleInject();
    const $ELEMENT = useGlobalConfig();
    const elForm = inject(elFormKey, {});
    const elFormItem = inject(elFormItemKey, {});
    const popper = ref(null);
    const input = ref(null);
    const tagWrapper = ref(null);
    const panel = ref(null);
    const suggestionPanel = ref(null);
    const popperVisible = ref(false);
    const inputHover = ref(false);
    const filtering = ref(false);
    const inputValue = ref("");
    const searchInputValue = ref("");
    const presentTags = ref([]);
    const suggestions = ref([]);
    const isOnComposition = ref(false);
    const isDisabled = computed(() => props.disabled || elForm.disabled);
    const inputPlaceholder = computed(() => props.placeholder || t("el.cascader.placeholder"));
    const realSize = computed(() => props.size || elFormItem.size || $ELEMENT.size);
    const tagSize = computed(() => ["small", "mini"].includes(realSize.value) ? "mini" : "small");
    const multiple = computed(() => !!props.props.multiple);
    const readonly = computed(() => !props.filterable || multiple.value);
    const searchKeyword = computed(() => multiple.value ? searchInputValue.value : inputValue.value);
    const checkedNodes = computed(() => {
      var _a;
      return ((_a = panel.value) == null ? void 0 : _a.checkedNodes) || [];
    });
    const clearBtnVisible = computed(() => {
      if (!props.clearable || isDisabled.value || filtering.value || !inputHover.value)
        return false;
      return !!checkedNodes.value.length;
    });
    const presentText = computed(() => {
      const { showAllLevels, separator } = props;
      const nodes = checkedNodes.value;
      return nodes.length ? multiple.value ? " " : nodes[0].calcText(showAllLevels, separator) : "";
    });
    const checkedValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        var _a;
        emit(UPDATE_MODEL_EVENT, val);
        emit(CHANGE_EVENT, val);
        (_a = elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change");
      }
    });
    const popperPaneRef = computed(() => {
      var _a;
      return (_a = popper.value) == null ? void 0 : _a.popperRef;
    });
    const togglePopperVisible = (visible) => {
      if (isDisabled.value)
        return;
      visible = visible != null ? visible : !popperVisible.value;
      if (visible !== popperVisible.value) {
        popperVisible.value = visible;
        input.value.input.setAttribute("aria-expanded", visible);
        if (visible) {
          updatePopperPosition();
          nextTick(panel.value.scrollToExpandingNode);
        } else if (props.filterable) {
          const { value } = presentText;
          inputValue.value = value;
          searchInputValue.value = value;
        }
        emit("visible-change", visible);
      }
    };
    const updatePopperPosition = () => {
      nextTick(popper.value.update);
    };
    const hideSuggestionPanel = () => {
      filtering.value = false;
    };
    const genTag = (node) => {
      const { showAllLevels, separator } = props;
      return {
        node,
        key: node.uid,
        text: node.calcText(showAllLevels, separator),
        hitState: false,
        closable: !isDisabled.value && !node.isDisabled
      };
    };
    const deleteTag = (tag) => {
      const { node } = tag;
      node.doCheck(false);
      panel.value.calculateCheckedValue();
      emit("remove-tag", node.valueByOption);
    };
    const calculatePresentTags = () => {
      if (!multiple.value)
        return;
      const nodes = checkedNodes.value;
      const tags = [];
      if (nodes.length) {
        const [first, ...rest] = nodes;
        const restCount = rest.length;
        tags.push(genTag(first));
        if (restCount) {
          if (props.collapseTags) {
            tags.push({
              key: -1,
              text: `+ ${restCount}`,
              closable: false
            });
          } else {
            rest.forEach((node) => tags.push(genTag(node)));
          }
        }
      }
      presentTags.value = tags;
    };
    const calculateSuggestions = () => {
      const { filterMethod, showAllLevels, separator } = props;
      const res = panel.value.getFlattedNodes(!props.props.checkStrictly).filter((node) => {
        if (node.isDisabled)
          return false;
        node.calcText(showAllLevels, separator);
        return filterMethod(node, searchKeyword.value);
      });
      if (multiple.value) {
        presentTags.value.forEach((tag) => {
          tag.hitState = false;
        });
      }
      filtering.value = true;
      suggestions.value = res;
      updatePopperPosition();
    };
    const focusFirstNode = () => {
      var _a;
      let firstNode = null;
      if (filtering.value && suggestionPanel.value) {
        firstNode = suggestionPanel.value.$el.querySelector(".el-cascader__suggestion-item");
      } else {
        firstNode = (_a = panel.value) == null ? void 0 : _a.$el.querySelector('.el-cascader-node[tabindex="-1"]');
      }
      if (firstNode) {
        firstNode.focus();
        !filtering.value && firstNode.click();
      }
    };
    const updateStyle = () => {
      var _a;
      const inputInner = input.value.input;
      const tagWrapperEl = tagWrapper.value;
      const suggestionPanelEl = (_a = suggestionPanel.value) == null ? void 0 : _a.$el;
      if (isServer || !inputInner)
        return;
      if (suggestionPanelEl) {
        const suggestionList = suggestionPanelEl.querySelector(".el-cascader__suggestion-list");
        suggestionList.style.minWidth = `${inputInner.offsetWidth}px`;
      }
      if (tagWrapperEl) {
        const { offsetHeight } = tagWrapperEl;
        const height = presentTags.value.length > 0 ? `${Math.max(offsetHeight + 6, inputInitialHeight)}px` : `${inputInitialHeight}px`;
        inputInner.style.height = height;
        updatePopperPosition();
      }
    };
    const getCheckedNodes = (leafOnly) => {
      return panel.value.getCheckedNodes(leafOnly);
    };
    const handleExpandChange = (value) => {
      updatePopperPosition();
      emit("expand-change", value);
    };
    const handleComposition = (event) => {
      var _a;
      const text = (_a = event.target) == null ? void 0 : _a.value;
      if (event.type === "compositionend") {
        isOnComposition.value = false;
        nextTick(() => handleInput(text));
      } else {
        const lastCharacter = text[text.length - 1] || "";
        isOnComposition.value = !isKorean(lastCharacter);
      }
    };
    const handleKeyDown = (e) => {
      if (isOnComposition.value)
        return;
      switch (e.code) {
        case EVENT_CODE.enter:
          togglePopperVisible();
          break;
        case EVENT_CODE.down:
          togglePopperVisible(true);
          nextTick(focusFirstNode);
          e.preventDefault();
          break;
        case EVENT_CODE.esc:
        case EVENT_CODE.tab:
          togglePopperVisible(false);
          break;
      }
    };
    const handleClear = () => {
      panel.value.clearCheckedNodes();
      togglePopperVisible(false);
    };
    const handleSuggestionClick = (node) => {
      const { checked } = node;
      if (multiple.value) {
        panel.value.handleCheckChange(node, !checked, false);
      } else {
        !checked && panel.value.handleCheckChange(node, true, false);
        togglePopperVisible(false);
      }
    };
    const handleDelete = () => {
      const tags = presentTags.value;
      const lastTag = tags[tags.length - 1];
      pressDeleteCount = searchInputValue.value ? 0 : pressDeleteCount + 1;
      if (!lastTag || !pressDeleteCount)
        return;
      if (lastTag.hitState) {
        deleteTag(lastTag);
      } else {
        lastTag.hitState = true;
      }
    };
    const handleFilter = debounce(() => {
      const { value } = searchKeyword;
      if (!value)
        return;
      const passed = props.beforeFilter(value);
      if (isPromise(passed)) {
        passed.then(calculateSuggestions).catch(() => {
        });
      } else if (passed !== false) {
        calculateSuggestions();
      } else {
        hideSuggestionPanel();
      }
    }, props.debounce);
    const handleInput = (val, e) => {
      !popperVisible.value && togglePopperVisible(true);
      if (e == null ? void 0 : e.isComposing)
        return;
      val ? handleFilter() : hideSuggestionPanel();
    };
    watch(filtering, updatePopperPosition);
    watch([checkedNodes, isDisabled], calculatePresentTags);
    watch(presentTags, () => nextTick(updateStyle));
    watch(presentText, (val) => inputValue.value = val, { immediate: true });
    onMounted(() => {
      const inputEl = input.value.$el;
      inputInitialHeight = (inputEl == null ? void 0 : inputEl.offsetHeight) || INPUT_HEIGHT_MAP[realSize.value] || DEFAULT_INPUT_HEIGHT;
      addResizeListener(inputEl, updateStyle);
    });
    onBeforeUnmount(() => {
      removeResizeListener(input.value.$el, updateStyle);
    });
    return {
      Effect,
      popperOptions,
      popper,
      popperPaneRef,
      input,
      tagWrapper,
      panel,
      suggestionPanel,
      popperVisible,
      inputHover,
      inputPlaceholder,
      filtering,
      presentText,
      checkedValue,
      inputValue,
      searchInputValue,
      presentTags,
      suggestions,
      isDisabled,
      isOnComposition,
      realSize,
      tagSize,
      multiple,
      readonly,
      clearBtnVisible,
      t,
      togglePopperVisible,
      hideSuggestionPanel,
      deleteTag,
      focusFirstNode,
      getCheckedNodes,
      handleExpandChange,
      handleKeyDown,
      handleComposition,
      handleClear,
      handleSuggestionClick,
      handleDelete,
      handleInput
    };
  }
});

const _hoisted_1 = {
  key: 0,
  ref: "tagWrapper",
  class: "el-cascader__tags"
};
const _hoisted_2 = ["placeholder"];
const _hoisted_3 = ["onClick"];
const _hoisted_4 = {
  key: 0,
  class: "el-icon-check"
};
const _hoisted_5 = { class: "el-cascader__empty-text" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_tag = resolveComponent("el-tag");
  const _component_el_cascader_panel = resolveComponent("el-cascader-panel");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_el_popper = resolveComponent("el-popper");
  const _directive_clickoutside = resolveDirective("clickoutside");
  return openBlock(), createBlock(_component_el_popper, {
    ref: "popper",
    visible: _ctx.popperVisible,
    "onUpdate:visible": _cache[18] || (_cache[18] = ($event) => _ctx.popperVisible = $event),
    "manual-mode": "",
    "append-to-body": _ctx.popperAppendToBody,
    placement: "bottom-start",
    "popper-class": `el-cascader__dropdown ${_ctx.popperClass}`,
    "popper-options": _ctx.popperOptions,
    "fallback-placements": ["bottom-start", "top-start", "right", "left"],
    "stop-popper-mouse-event": false,
    transition: "el-zoom-in-top",
    "gpu-acceleration": false,
    effect: _ctx.Effect.LIGHT,
    pure: "",
    onAfterLeave: _ctx.hideSuggestionPanel
  }, {
    trigger: withCtx(() => [
      withDirectives(createElementVNode("div", {
        class: normalizeClass([
          "el-cascader",
          _ctx.realSize && `el-cascader--${_ctx.realSize}`,
          { "is-disabled": _ctx.isDisabled }
        ]),
        onClick: _cache[12] || (_cache[12] = () => _ctx.togglePopperVisible(_ctx.readonly ? void 0 : true)),
        onKeydown: _cache[13] || (_cache[13] = (...args) => _ctx.handleKeyDown && _ctx.handleKeyDown(...args)),
        onMouseenter: _cache[14] || (_cache[14] = ($event) => _ctx.inputHover = true),
        onMouseleave: _cache[15] || (_cache[15] = ($event) => _ctx.inputHover = false)
      }, [
        createVNode(_component_el_input, {
          ref: "input",
          modelValue: _ctx.inputValue,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.inputValue = $event),
          modelModifiers: { trim: true },
          placeholder: _ctx.inputPlaceholder,
          readonly: _ctx.readonly,
          disabled: _ctx.isDisabled,
          "validate-event": false,
          size: _ctx.realSize,
          class: normalizeClass({ "is-focus": _ctx.popperVisible }),
          onCompositionstart: _ctx.handleComposition,
          onCompositionupdate: _ctx.handleComposition,
          onCompositionend: _ctx.handleComposition,
          onFocus: _cache[3] || (_cache[3] = (e) => _ctx.$emit("focus", e)),
          onBlur: _cache[4] || (_cache[4] = (e) => _ctx.$emit("blur", e)),
          onInput: _ctx.handleInput
        }, {
          suffix: withCtx(() => [
            _ctx.clearBtnVisible ? (openBlock(), createElementBlock("i", {
              key: "clear",
              class: "el-input__icon el-icon-circle-close",
              onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.handleClear && _ctx.handleClear(...args), ["stop"]))
            })) : (openBlock(), createElementBlock("i", {
              key: "arrow-down",
              class: normalizeClass([
                "el-input__icon",
                "el-icon-arrow-down",
                _ctx.popperVisible && "is-reverse"
              ]),
              onClick: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.togglePopperVisible(), ["stop"]))
            }, null, 2))
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "readonly", "disabled", "size", "class", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onInput"]),
        _ctx.multiple ? (openBlock(), createElementBlock("div", _hoisted_1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.presentTags, (tag) => {
            return openBlock(), createBlock(_component_el_tag, {
              key: tag.key,
              type: "info",
              size: _ctx.tagSize,
              hit: tag.hitState,
              closable: tag.closable,
              "disable-transitions": "",
              onClose: ($event) => _ctx.deleteTag(tag)
            }, {
              default: withCtx(() => [
                createElementVNode("span", null, toDisplayString(tag.text), 1)
              ]),
              _: 2
            }, 1032, ["size", "hit", "closable", "onClose"]);
          }), 128)),
          _ctx.filterable && !_ctx.isDisabled ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.searchInputValue = $event),
            type: "text",
            class: "el-cascader__search-input",
            placeholder: _ctx.presentText ? "" : _ctx.inputPlaceholder,
            onInput: _cache[6] || (_cache[6] = (e) => _ctx.handleInput(_ctx.searchInputValue, e)),
            onClick: _cache[7] || (_cache[7] = withModifiers(($event) => _ctx.togglePopperVisible(true), ["stop"])),
            onKeydown: _cache[8] || (_cache[8] = withKeys((...args) => _ctx.handleDelete && _ctx.handleDelete(...args), ["delete"])),
            onCompositionstart: _cache[9] || (_cache[9] = (...args) => _ctx.handleComposition && _ctx.handleComposition(...args)),
            onCompositionupdate: _cache[10] || (_cache[10] = (...args) => _ctx.handleComposition && _ctx.handleComposition(...args)),
            onCompositionend: _cache[11] || (_cache[11] = (...args) => _ctx.handleComposition && _ctx.handleComposition(...args))
          }, null, 40, _hoisted_2)), [
            [
              vModelText,
              _ctx.searchInputValue,
              void 0,
              { trim: true }
            ]
          ]) : createCommentVNode("v-if", true)
        ], 512)) : createCommentVNode("v-if", true)
      ], 34), [
        [_directive_clickoutside, () => _ctx.togglePopperVisible(false), _ctx.popperPaneRef]
      ])
    ]),
    default: withCtx(() => [
      withDirectives(createVNode(_component_el_cascader_panel, {
        ref: "panel",
        modelValue: _ctx.checkedValue,
        "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => _ctx.checkedValue = $event),
        options: _ctx.options,
        props: _ctx.props,
        border: false,
        "render-label": _ctx.$slots.default,
        onExpandChange: _ctx.handleExpandChange,
        onClose: _cache[17] || (_cache[17] = ($event) => _ctx.togglePopperVisible(false))
      }, null, 8, ["modelValue", "options", "props", "render-label", "onExpandChange"]), [
        [vShow, !_ctx.filtering]
      ]),
      _ctx.filterable ? withDirectives((openBlock(), createBlock(_component_el_scrollbar, {
        key: 0,
        ref: "suggestionPanel",
        tag: "ul",
        class: "el-cascader__suggestion-panel",
        "view-class": "el-cascader__suggestion-list"
      }, {
        default: withCtx(() => [
          _ctx.suggestions.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.suggestions, (item) => {
            return openBlock(), createElementBlock("li", {
              key: item.uid,
              class: normalizeClass([
                "el-cascader__suggestion-item",
                item.checked && "is-checked"
              ]),
              tabindex: -1,
              onClick: ($event) => _ctx.handleSuggestionClick(item)
            }, [
              createElementVNode("span", null, toDisplayString(item.text), 1),
              item.checked ? (openBlock(), createElementBlock("i", _hoisted_4)) : createCommentVNode("v-if", true)
            ], 10, _hoisted_3);
          }), 128)) : renderSlot(_ctx.$slots, "empty", { key: 1 }, () => [
            createElementVNode("li", _hoisted_5, toDisplayString(_ctx.t("el.cascader.noMatch")), 1)
          ])
        ]),
        _: 3
      }, 512)), [
        [vShow, _ctx.filtering]
      ]) : createCommentVNode("v-if", true)
    ]),
    _: 3
  }, 8, ["visible", "append-to-body", "popper-class", "popper-options", "effect", "onAfterLeave"]);
}

script.render = render;
script.__file = "packages/components/cascader/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Cascader = script;
const ElCascader = _Cascader;

export { ElCascader, _Cascader as default };
