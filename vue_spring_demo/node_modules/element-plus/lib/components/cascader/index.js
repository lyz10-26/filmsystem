'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var shared = require('@vue/shared');
var debounce = require('lodash/debounce');
var ElCascaderPanel = require('element-plus/lib/components/cascader-panel');
var ElInput = require('element-plus/lib/components/input');
var ElPopper = require('element-plus/lib/components/popper');
var ElScrollbar = require('element-plus/lib/components/scrollbar');
var ElTag = require('element-plus/lib/components/tag');
var tokens = require('element-plus/lib/tokens');
var directives = require('element-plus/lib/directives');
var hooks = require('element-plus/lib/hooks');
var aria = require('element-plus/lib/utils/aria');
var constants = require('element-plus/lib/utils/constants');
var isServer = require('element-plus/lib/utils/isServer');
var util = require('element-plus/lib/utils/util');
var resizeEvent = require('element-plus/lib/utils/resize-event');
var validators = require('element-plus/lib/utils/validators');
var isDef = require('element-plus/lib/utils/isDef');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var ElCascaderPanel__default = /*#__PURE__*/_interopDefaultLegacy(ElCascaderPanel);
var ElInput__default = /*#__PURE__*/_interopDefaultLegacy(ElInput);
var ElPopper__default = /*#__PURE__*/_interopDefaultLegacy(ElPopper);
var ElScrollbar__default = /*#__PURE__*/_interopDefaultLegacy(ElScrollbar);
var ElTag__default = /*#__PURE__*/_interopDefaultLegacy(ElTag);
var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);

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
var script = vue.defineComponent({
  name: "ElCascader",
  components: {
    ElCascaderPanel: ElCascaderPanel__default["default"],
    ElInput: ElInput__default["default"],
    ElPopper: ElPopper__default["default"],
    ElScrollbar: ElScrollbar__default["default"],
    ElTag: ElTag__default["default"]
  },
  directives: {
    Clickoutside: directives.ClickOutside
  },
  props: __spreadProps(__spreadValues({}, ElCascaderPanel.CommonProps), {
    size: {
      type: String,
      validator: validators.isValidComponentSize
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
    constants.UPDATE_MODEL_EVENT,
    constants.CHANGE_EVENT,
    "focus",
    "blur",
    "visible-change",
    "expand-change",
    "remove-tag"
  ],
  setup(props, { emit }) {
    let inputInitialHeight = 0;
    let pressDeleteCount = 0;
    const { t } = hooks.useLocaleInject();
    const $ELEMENT = util.useGlobalConfig();
    const elForm = vue.inject(tokens.elFormKey, {});
    const elFormItem = vue.inject(tokens.elFormItemKey, {});
    const popper = vue.ref(null);
    const input = vue.ref(null);
    const tagWrapper = vue.ref(null);
    const panel = vue.ref(null);
    const suggestionPanel = vue.ref(null);
    const popperVisible = vue.ref(false);
    const inputHover = vue.ref(false);
    const filtering = vue.ref(false);
    const inputValue = vue.ref("");
    const searchInputValue = vue.ref("");
    const presentTags = vue.ref([]);
    const suggestions = vue.ref([]);
    const isOnComposition = vue.ref(false);
    const isDisabled = vue.computed(() => props.disabled || elForm.disabled);
    const inputPlaceholder = vue.computed(() => props.placeholder || t("el.cascader.placeholder"));
    const realSize = vue.computed(() => props.size || elFormItem.size || $ELEMENT.size);
    const tagSize = vue.computed(() => ["small", "mini"].includes(realSize.value) ? "mini" : "small");
    const multiple = vue.computed(() => !!props.props.multiple);
    const readonly = vue.computed(() => !props.filterable || multiple.value);
    const searchKeyword = vue.computed(() => multiple.value ? searchInputValue.value : inputValue.value);
    const checkedNodes = vue.computed(() => {
      var _a;
      return ((_a = panel.value) == null ? void 0 : _a.checkedNodes) || [];
    });
    const clearBtnVisible = vue.computed(() => {
      if (!props.clearable || isDisabled.value || filtering.value || !inputHover.value)
        return false;
      return !!checkedNodes.value.length;
    });
    const presentText = vue.computed(() => {
      const { showAllLevels, separator } = props;
      const nodes = checkedNodes.value;
      return nodes.length ? multiple.value ? " " : nodes[0].calcText(showAllLevels, separator) : "";
    });
    const checkedValue = vue.computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        var _a;
        emit(constants.UPDATE_MODEL_EVENT, val);
        emit(constants.CHANGE_EVENT, val);
        (_a = elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change");
      }
    });
    const popperPaneRef = vue.computed(() => {
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
          vue.nextTick(panel.value.scrollToExpandingNode);
        } else if (props.filterable) {
          const { value } = presentText;
          inputValue.value = value;
          searchInputValue.value = value;
        }
        emit("visible-change", visible);
      }
    };
    const updatePopperPosition = () => {
      vue.nextTick(popper.value.update);
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
      if (isServer__default["default"] || !inputInner)
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
        vue.nextTick(() => handleInput(text));
      } else {
        const lastCharacter = text[text.length - 1] || "";
        isOnComposition.value = !isDef.isKorean(lastCharacter);
      }
    };
    const handleKeyDown = (e) => {
      if (isOnComposition.value)
        return;
      switch (e.code) {
        case aria.EVENT_CODE.enter:
          togglePopperVisible();
          break;
        case aria.EVENT_CODE.down:
          togglePopperVisible(true);
          vue.nextTick(focusFirstNode);
          e.preventDefault();
          break;
        case aria.EVENT_CODE.esc:
        case aria.EVENT_CODE.tab:
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
    const handleFilter = debounce__default["default"](() => {
      const { value } = searchKeyword;
      if (!value)
        return;
      const passed = props.beforeFilter(value);
      if (shared.isPromise(passed)) {
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
    vue.watch(filtering, updatePopperPosition);
    vue.watch([checkedNodes, isDisabled], calculatePresentTags);
    vue.watch(presentTags, () => vue.nextTick(updateStyle));
    vue.watch(presentText, (val) => inputValue.value = val, { immediate: true });
    vue.onMounted(() => {
      const inputEl = input.value.$el;
      inputInitialHeight = (inputEl == null ? void 0 : inputEl.offsetHeight) || INPUT_HEIGHT_MAP[realSize.value] || DEFAULT_INPUT_HEIGHT;
      resizeEvent.addResizeListener(inputEl, updateStyle);
    });
    vue.onBeforeUnmount(() => {
      resizeEvent.removeResizeListener(input.value.$el, updateStyle);
    });
    return {
      Effect: ElPopper.Effect,
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
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_el_tag = vue.resolveComponent("el-tag");
  const _component_el_cascader_panel = vue.resolveComponent("el-cascader-panel");
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
  const _component_el_popper = vue.resolveComponent("el-popper");
  const _directive_clickoutside = vue.resolveDirective("clickoutside");
  return vue.openBlock(), vue.createBlock(_component_el_popper, {
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
    trigger: vue.withCtx(() => [
      vue.withDirectives(vue.createElementVNode("div", {
        class: vue.normalizeClass([
          "el-cascader",
          _ctx.realSize && `el-cascader--${_ctx.realSize}`,
          { "is-disabled": _ctx.isDisabled }
        ]),
        onClick: _cache[12] || (_cache[12] = () => _ctx.togglePopperVisible(_ctx.readonly ? void 0 : true)),
        onKeydown: _cache[13] || (_cache[13] = (...args) => _ctx.handleKeyDown && _ctx.handleKeyDown(...args)),
        onMouseenter: _cache[14] || (_cache[14] = ($event) => _ctx.inputHover = true),
        onMouseleave: _cache[15] || (_cache[15] = ($event) => _ctx.inputHover = false)
      }, [
        vue.createVNode(_component_el_input, {
          ref: "input",
          modelValue: _ctx.inputValue,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.inputValue = $event),
          modelModifiers: { trim: true },
          placeholder: _ctx.inputPlaceholder,
          readonly: _ctx.readonly,
          disabled: _ctx.isDisabled,
          "validate-event": false,
          size: _ctx.realSize,
          class: vue.normalizeClass({ "is-focus": _ctx.popperVisible }),
          onCompositionstart: _ctx.handleComposition,
          onCompositionupdate: _ctx.handleComposition,
          onCompositionend: _ctx.handleComposition,
          onFocus: _cache[3] || (_cache[3] = (e) => _ctx.$emit("focus", e)),
          onBlur: _cache[4] || (_cache[4] = (e) => _ctx.$emit("blur", e)),
          onInput: _ctx.handleInput
        }, {
          suffix: vue.withCtx(() => [
            _ctx.clearBtnVisible ? (vue.openBlock(), vue.createElementBlock("i", {
              key: "clear",
              class: "el-input__icon el-icon-circle-close",
              onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.handleClear && _ctx.handleClear(...args), ["stop"]))
            })) : (vue.openBlock(), vue.createElementBlock("i", {
              key: "arrow-down",
              class: vue.normalizeClass([
                "el-input__icon",
                "el-icon-arrow-down",
                _ctx.popperVisible && "is-reverse"
              ]),
              onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => _ctx.togglePopperVisible(), ["stop"]))
            }, null, 2))
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "readonly", "disabled", "size", "class", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onInput"]),
        _ctx.multiple ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.presentTags, (tag) => {
            return vue.openBlock(), vue.createBlock(_component_el_tag, {
              key: tag.key,
              type: "info",
              size: _ctx.tagSize,
              hit: tag.hitState,
              closable: tag.closable,
              "disable-transitions": "",
              onClose: ($event) => _ctx.deleteTag(tag)
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("span", null, vue.toDisplayString(tag.text), 1)
              ]),
              _: 2
            }, 1032, ["size", "hit", "closable", "onClose"]);
          }), 128)),
          _ctx.filterable && !_ctx.isDisabled ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
            key: 0,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.searchInputValue = $event),
            type: "text",
            class: "el-cascader__search-input",
            placeholder: _ctx.presentText ? "" : _ctx.inputPlaceholder,
            onInput: _cache[6] || (_cache[6] = (e) => _ctx.handleInput(_ctx.searchInputValue, e)),
            onClick: _cache[7] || (_cache[7] = vue.withModifiers(($event) => _ctx.togglePopperVisible(true), ["stop"])),
            onKeydown: _cache[8] || (_cache[8] = vue.withKeys((...args) => _ctx.handleDelete && _ctx.handleDelete(...args), ["delete"])),
            onCompositionstart: _cache[9] || (_cache[9] = (...args) => _ctx.handleComposition && _ctx.handleComposition(...args)),
            onCompositionupdate: _cache[10] || (_cache[10] = (...args) => _ctx.handleComposition && _ctx.handleComposition(...args)),
            onCompositionend: _cache[11] || (_cache[11] = (...args) => _ctx.handleComposition && _ctx.handleComposition(...args))
          }, null, 40, _hoisted_2)), [
            [
              vue.vModelText,
              _ctx.searchInputValue,
              void 0,
              { trim: true }
            ]
          ]) : vue.createCommentVNode("v-if", true)
        ], 512)) : vue.createCommentVNode("v-if", true)
      ], 34), [
        [_directive_clickoutside, () => _ctx.togglePopperVisible(false), _ctx.popperPaneRef]
      ])
    ]),
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode(_component_el_cascader_panel, {
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
        [vue.vShow, !_ctx.filtering]
      ]),
      _ctx.filterable ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_scrollbar, {
        key: 0,
        ref: "suggestionPanel",
        tag: "ul",
        class: "el-cascader__suggestion-panel",
        "view-class": "el-cascader__suggestion-list"
      }, {
        default: vue.withCtx(() => [
          _ctx.suggestions.length ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(_ctx.suggestions, (item) => {
            return vue.openBlock(), vue.createElementBlock("li", {
              key: item.uid,
              class: vue.normalizeClass([
                "el-cascader__suggestion-item",
                item.checked && "is-checked"
              ]),
              tabindex: -1,
              onClick: ($event) => _ctx.handleSuggestionClick(item)
            }, [
              vue.createElementVNode("span", null, vue.toDisplayString(item.text), 1),
              item.checked ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_4)) : vue.createCommentVNode("v-if", true)
            ], 10, _hoisted_3);
          }), 128)) : vue.renderSlot(_ctx.$slots, "empty", { key: 1 }, () => [
            vue.createElementVNode("li", _hoisted_5, vue.toDisplayString(_ctx.t("el.cascader.noMatch")), 1)
          ])
        ]),
        _: 3
      }, 512)), [
        [vue.vShow, _ctx.filtering]
      ]) : vue.createCommentVNode("v-if", true)
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

exports.ElCascader = ElCascader;
exports["default"] = _Cascader;
