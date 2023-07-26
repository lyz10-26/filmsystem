'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var constants = require('element-plus/lib/utils/constants');
var util = require('element-plus/lib/utils/util');
var ElCollapseTransition = require('element-plus/lib/components/collapse-transition');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElCollapseTransition__default = /*#__PURE__*/_interopDefaultLegacy(ElCollapseTransition);

var script$1 = vue.defineComponent({
  name: "ElCollapse",
  props: {
    accordion: Boolean,
    modelValue: {
      type: [Array, String, Number],
      default: () => []
    }
  },
  emits: [constants.UPDATE_MODEL_EVENT, constants.CHANGE_EVENT],
  setup(props, { emit }) {
    const activeNames = vue.ref([].concat(props.modelValue));
    const setActiveNames = (_activeNames) => {
      activeNames.value = [].concat(_activeNames);
      const value = props.accordion ? activeNames.value[0] : activeNames.value;
      emit(constants.UPDATE_MODEL_EVENT, value);
      emit(constants.CHANGE_EVENT, value);
    };
    const handleItemClick = (name) => {
      if (props.accordion) {
        setActiveNames((activeNames.value[0] || activeNames.value[0] === 0) && activeNames.value[0] === name ? "" : name);
      } else {
        const _activeNames = activeNames.value.slice(0);
        const index = _activeNames.indexOf(name);
        if (index > -1) {
          _activeNames.splice(index, 1);
        } else {
          _activeNames.push(name);
        }
        setActiveNames(_activeNames);
      }
    };
    vue.watch(() => props.modelValue, () => {
      activeNames.value = [].concat(props.modelValue);
    });
    vue.provide("collapse", {
      activeNames,
      handleItemClick
    });
    return {
      activeNames,
      setActiveNames,
      handleItemClick
    };
  }
});

const _hoisted_1$1 = {
  class: "el-collapse",
  role: "tablist",
  "aria-multiselectable": "true"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
    vue.renderSlot(_ctx.$slots, "default")
  ]);
}

script$1.render = render$1;
script$1.__file = "packages/components/collapse/src/collapse.vue";

var script = vue.defineComponent({
  name: "ElCollapseItem",
  components: { ElCollapseTransition: ElCollapseTransition__default["default"] },
  props: {
    title: {
      type: String,
      default: ""
    },
    name: {
      type: [String, Number],
      default: () => {
        return util.generateId();
      }
    },
    disabled: Boolean
  },
  setup(props) {
    const collapse = vue.inject("collapse");
    const contentWrapStyle = vue.ref({
      height: "auto",
      display: "block"
    });
    const contentHeight = vue.ref(0);
    const focusing = vue.ref(false);
    const isClick = vue.ref(false);
    const id = vue.ref(util.generateId());
    const isActive = vue.computed(() => {
      return (collapse == null ? void 0 : collapse.activeNames.value.indexOf(props.name)) > -1;
    });
    const handleFocus = () => {
      setTimeout(() => {
        if (!isClick.value) {
          focusing.value = true;
        } else {
          isClick.value = false;
        }
      }, 50);
    };
    const handleHeaderClick = () => {
      if (props.disabled)
        return;
      collapse == null ? void 0 : collapse.handleItemClick(props.name);
      focusing.value = false;
      isClick.value = true;
    };
    const handleEnterClick = () => {
      collapse == null ? void 0 : collapse.handleItemClick(props.name);
    };
    return {
      isActive,
      contentWrapStyle,
      contentHeight,
      focusing,
      isClick,
      id,
      handleFocus,
      handleHeaderClick,
      handleEnterClick,
      collapse
    };
  }
});

const _hoisted_1 = ["aria-expanded", "aria-controls", "aria-describedby"];
const _hoisted_2 = ["id", "tabindex"];
const _hoisted_3 = ["id", "aria-hidden", "aria-labelledby"];
const _hoisted_4 = { class: "el-collapse-item__content" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_collapse_transition = vue.resolveComponent("el-collapse-transition");
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["el-collapse-item", { "is-active": _ctx.isActive, "is-disabled": _ctx.disabled }])
  }, [
    vue.createElementVNode("div", {
      role: "tab",
      "aria-expanded": _ctx.isActive,
      "aria-controls": `el-collapse-content-${_ctx.id}`,
      "aria-describedby": `el-collapse-content-${_ctx.id}`
    }, [
      vue.createElementVNode("div", {
        id: `el-collapse-head-${_ctx.id}`,
        class: vue.normalizeClass(["el-collapse-item__header", {
          focusing: _ctx.focusing,
          "is-active": _ctx.isActive
        }]),
        role: "button",
        tabindex: _ctx.disabled ? -1 : 0,
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleHeaderClick && _ctx.handleHeaderClick(...args)),
        onKeyup: _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers((...args) => _ctx.handleEnterClick && _ctx.handleEnterClick(...args), ["stop"]), ["space", "enter"])),
        onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
        onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.focusing = false)
      }, [
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.title), 1)
        ]),
        vue.createElementVNode("i", {
          class: vue.normalizeClass(["el-collapse-item__arrow el-icon-arrow-right", { "is-active": _ctx.isActive }])
        }, null, 2)
      ], 42, _hoisted_2)
    ], 8, _hoisted_1),
    vue.createVNode(_component_el_collapse_transition, null, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createElementVNode("div", {
          id: `el-collapse-content-${_ctx.id}`,
          class: "el-collapse-item__wrap",
          role: "tabpanel",
          "aria-hidden": !_ctx.isActive,
          "aria-labelledby": `el-collapse-head-${_ctx.id}`
        }, [
          vue.createElementVNode("div", _hoisted_4, [
            vue.renderSlot(_ctx.$slots, "default")
          ])
        ], 8, _hoisted_3), [
          [vue.vShow, _ctx.isActive]
        ])
      ]),
      _: 3
    })
  ], 2);
}

script.render = render;
script.__file = "packages/components/collapse/src/collapse-item.vue";

const ElCollapse = withInstall.withInstall(script$1, {
  CollapseItem: script
});
const ElCollapseItem = withInstall.withNoopInstall(script);

exports.ElCollapse = ElCollapse;
exports.ElCollapseItem = ElCollapseItem;
exports["default"] = ElCollapse;
