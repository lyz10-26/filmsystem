'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var ElButton = require('element-plus/lib/components/button');
var ElPopper = require('element-plus/lib/components/popper');
var ElScrollbar = require('element-plus/lib/components/scrollbar');
var dom = require('element-plus/lib/utils/dom');
var util = require('element-plus/lib/utils/util');
var aria = require('element-plus/lib/utils/aria');
var directives = require('element-plus/lib/directives');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElButton__default = /*#__PURE__*/_interopDefaultLegacy(ElButton);
var ElPopper__default = /*#__PURE__*/_interopDefaultLegacy(ElPopper);
var ElScrollbar__default = /*#__PURE__*/_interopDefaultLegacy(ElScrollbar);

const useDropdown = () => {
  const ELEMENT = util.useGlobalConfig();
  const elDropdown = vue.inject("elDropdown", {});
  const _elDropdownSize = vue.computed(() => elDropdown == null ? void 0 : elDropdown.dropdownSize);
  return {
    ELEMENT,
    elDropdown,
    _elDropdownSize
  };
};
const initDropdownDomEvent = (dropdownChildren, triggerElm, _instance) => {
  const menuItems = vue.ref(null);
  const menuItemsArray = vue.ref(null);
  const dropdownElm = vue.ref(null);
  const listId = vue.ref(`dropdown-menu-${util.generateId()}`);
  dropdownElm.value = dropdownChildren == null ? void 0 : dropdownChildren.subTree.el;
  function removeTabindex() {
    var _a;
    triggerElm.setAttribute("tabindex", "-1");
    (_a = menuItemsArray.value) == null ? void 0 : _a.forEach((item) => {
      item.setAttribute("tabindex", "-1");
    });
  }
  function resetTabindex(ele) {
    removeTabindex();
    ele == null ? void 0 : ele.setAttribute("tabindex", "0");
  }
  function handleTriggerKeyDown(ev) {
    const code = ev.code;
    if ([aria.EVENT_CODE.up, aria.EVENT_CODE.down].includes(code)) {
      removeTabindex();
      resetTabindex(menuItems.value[0]);
      menuItems.value[0].focus();
      ev.preventDefault();
      ev.stopPropagation();
    } else if (code === aria.EVENT_CODE.enter) {
      _instance.handleClick();
    } else if ([aria.EVENT_CODE.tab, aria.EVENT_CODE.esc].includes(code)) {
      _instance.hide();
    }
  }
  function handleItemKeyDown(ev) {
    const code = ev.code;
    const target = ev.target;
    const currentIndex = menuItemsArray.value.indexOf(target);
    const max = menuItemsArray.value.length - 1;
    let nextIndex;
    if ([aria.EVENT_CODE.up, aria.EVENT_CODE.down].includes(code)) {
      if (code === aria.EVENT_CODE.up) {
        nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
      } else {
        nextIndex = currentIndex < max ? currentIndex + 1 : max;
      }
      removeTabindex();
      resetTabindex(menuItems.value[nextIndex]);
      menuItems.value[nextIndex].focus();
      ev.preventDefault();
      ev.stopPropagation();
    } else if (code === aria.EVENT_CODE.enter) {
      triggerElmFocus();
      target.click();
      if (_instance.props.hideOnClick) {
        _instance.hide();
      }
    } else if ([aria.EVENT_CODE.tab, aria.EVENT_CODE.esc].includes(code)) {
      _instance.hide();
      triggerElmFocus();
    }
  }
  function initAria() {
    dropdownElm.value.setAttribute("id", listId.value);
    triggerElm.setAttribute("aria-haspopup", "list");
    triggerElm.setAttribute("aria-controls", listId.value);
    if (!_instance.props.splitButton) {
      triggerElm.setAttribute("role", "button");
      triggerElm.setAttribute("tabindex", _instance.props.tabindex);
      dom.addClass(triggerElm, "el-dropdown-selfdefine");
    }
  }
  function initEvent() {
    dom.on(triggerElm, "keydown", handleTriggerKeyDown);
    dom.on(dropdownElm.value, "keydown", handleItemKeyDown, true);
  }
  function initDomOperation() {
    menuItems.value = dropdownElm.value.querySelectorAll("[tabindex='-1']");
    menuItemsArray.value = [].slice.call(menuItems.value);
    initEvent();
    initAria();
  }
  function triggerElmFocus() {
    triggerElm.focus();
  }
  initDomOperation();
};

const { ButtonGroup: ElButtonGroup } = ElButton__default["default"];
var script$2 = vue.defineComponent({
  name: "ElDropdown",
  components: {
    ElButton: ElButton__default["default"],
    ElButtonGroup,
    ElScrollbar: ElScrollbar__default["default"],
    ElPopper: ElPopper__default["default"]
  },
  props: {
    trigger: {
      type: String,
      default: "hover"
    },
    type: String,
    size: {
      type: String,
      default: ""
    },
    splitButton: Boolean,
    hideOnClick: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: "bottom"
    },
    showTimeout: {
      type: Number,
      default: 150
    },
    hideTimeout: {
      type: Number,
      default: 150
    },
    tabindex: {
      type: [Number, String],
      default: 0
    },
    effect: {
      type: String,
      default: ElPopper.Effect.LIGHT
    },
    maxHeight: {
      type: [Number, String],
      default: ""
    }
  },
  emits: ["visible-change", "click", "command"],
  setup(props, { emit }) {
    const _instance = vue.getCurrentInstance();
    const { ELEMENT } = useDropdown();
    const timeout = vue.ref(null);
    const visible = vue.ref(false);
    const scrollbar = vue.ref(null);
    const wrapStyle = vue.computed(() => `max-height: ${util.addUnit(props.maxHeight)}`);
    vue.watch(() => visible.value, (val) => {
      if (val)
        triggerElmFocus();
      if (!val)
        triggerElmBlur();
      emit("visible-change", val);
    });
    const focusing = vue.ref(false);
    vue.watch(() => focusing.value, (val) => {
      const selfDefine = triggerElm.value;
      if (selfDefine) {
        if (val) {
          dom.addClass(selfDefine, "focusing");
        } else {
          dom.removeClass(selfDefine, "focusing");
        }
      }
    });
    const triggerVnode = vue.ref(null);
    const triggerElm = vue.computed(() => {
      var _a, _b, _c;
      const _ = (_b = (_a = triggerVnode.value) == null ? void 0 : _a.$refs.triggerRef) == null ? void 0 : _b.children[0];
      return !props.splitButton ? _ : (_c = _ == null ? void 0 : _.children) == null ? void 0 : _c[1];
    });
    function handleClick() {
      var _a;
      if ((_a = triggerElm.value) == null ? void 0 : _a.disabled)
        return;
      if (visible.value) {
        hide();
      } else {
        show();
      }
    }
    function show() {
      var _a;
      if ((_a = triggerElm.value) == null ? void 0 : _a.disabled)
        return;
      timeout.value && clearTimeout(timeout.value);
      timeout.value = window.setTimeout(() => {
        visible.value = true;
      }, ["click", "contextmenu"].includes(props.trigger) ? 0 : props.showTimeout);
    }
    function hide() {
      var _a;
      if ((_a = triggerElm.value) == null ? void 0 : _a.disabled)
        return;
      removeTabindex();
      if (props.tabindex >= 0) {
        resetTabindex(triggerElm.value);
      }
      clearTimeout(timeout.value);
      timeout.value = window.setTimeout(() => {
        visible.value = false;
      }, ["click", "contextmenu"].includes(props.trigger) ? 0 : props.hideTimeout);
    }
    function removeTabindex() {
      var _a;
      (_a = triggerElm.value) == null ? void 0 : _a.setAttribute("tabindex", "-1");
    }
    function resetTabindex(ele) {
      removeTabindex();
      ele == null ? void 0 : ele.setAttribute("tabindex", "0");
    }
    function triggerElmFocus() {
      var _a, _b;
      (_b = (_a = triggerElm.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    }
    function triggerElmBlur() {
      var _a, _b;
      (_b = (_a = triggerElm.value) == null ? void 0 : _a.blur) == null ? void 0 : _b.call(_a);
    }
    const dropdownSize = vue.computed(() => props.size || ELEMENT.size);
    function commandHandler(...args) {
      emit("command", ...args);
    }
    vue.provide("elDropdown", {
      instance: _instance,
      dropdownSize,
      visible,
      handleClick,
      commandHandler,
      show,
      hide,
      trigger: vue.computed(() => props.trigger),
      hideOnClick: vue.computed(() => props.hideOnClick),
      triggerElm
    });
    vue.onMounted(() => {
      if (!props.splitButton) {
        dom.on(triggerElm.value, "focus", () => {
          focusing.value = true;
        });
        dom.on(triggerElm.value, "blur", () => {
          focusing.value = false;
        });
        dom.on(triggerElm.value, "click", () => {
          focusing.value = false;
        });
      }
      if (props.trigger === "hover") {
        dom.on(triggerElm.value, "mouseenter", show);
        dom.on(triggerElm.value, "mouseleave", hide);
      } else if (props.trigger === "click") {
        dom.on(triggerElm.value, "click", handleClick);
      } else if (props.trigger === "contextmenu") {
        dom.on(triggerElm.value, "contextmenu", (e) => {
          e.preventDefault();
          handleClick();
        });
      }
      Object.assign(_instance, {
        handleClick,
        hide,
        resetTabindex
      });
    });
    const handlerMainButtonClick = (event) => {
      emit("click", event);
      hide();
    };
    return {
      visible,
      scrollbar,
      wrapStyle,
      dropdownSize,
      handlerMainButtonClick,
      triggerVnode
    };
  }
});

const _hoisted_1$1 = /* @__PURE__ */ vue.createElementVNode("i", { class: "el-dropdown__icon el-icon-arrow-down" }, null, -1);
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_button_group = vue.resolveComponent("el-button-group");
  const _component_el_popper = vue.resolveComponent("el-popper");
  return vue.openBlock(), vue.createBlock(_component_el_popper, {
    ref: "triggerVnode",
    visible: _ctx.visible,
    "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => _ctx.visible = $event),
    placement: _ctx.placement,
    "fallback-placements": ["bottom", "top", "right", "left"],
    effect: _ctx.effect,
    pure: "",
    "manual-mode": true,
    trigger: [_ctx.trigger],
    "popper-class": "el-dropdown__popper",
    "append-to-body": "",
    transition: "el-zoom-in-top",
    "stop-popper-mouse-event": false,
    "gpu-acceleration": false
  }, {
    default: vue.withCtx(() => [
      vue.createVNode(_component_el_scrollbar, {
        ref: "scrollbar",
        tag: "ul",
        "wrap-style": _ctx.wrapStyle,
        "view-class": "el-dropdown__list"
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "dropdown")
        ]),
        _: 3
      }, 8, ["wrap-style"])
    ]),
    trigger: vue.withCtx(() => [
      vue.createElementVNode("div", {
        class: vue.normalizeClass([
          "el-dropdown",
          _ctx.dropdownSize ? "el-dropdown--" + _ctx.dropdownSize : ""
        ])
      }, [
        !_ctx.splitButton ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : (vue.openBlock(), vue.createBlock(_component_el_button_group, { key: 1 }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_el_button, {
              size: _ctx.dropdownSize,
              type: _ctx.type,
              onClick: _ctx.handlerMainButtonClick
            }, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 8, ["size", "type", "onClick"]),
            vue.createVNode(_component_el_button, {
              size: _ctx.dropdownSize,
              type: _ctx.type,
              class: "el-dropdown__caret-button"
            }, {
              default: vue.withCtx(() => [
                _hoisted_1$1
              ]),
              _: 1
            }, 8, ["size", "type"])
          ]),
          _: 3
        }))
      ], 2)
    ]),
    _: 3
  }, 8, ["visible", "placement", "effect", "trigger"]);
}

script$2.render = render$2;
script$2.__file = "packages/components/dropdown/src/dropdown.vue";

var script$1 = vue.defineComponent({
  name: "ElDropdownItem",
  props: {
    command: {
      type: [Object, String, Number],
      default: () => ({})
    },
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },
  setup(props) {
    const { elDropdown } = useDropdown();
    const _instance = vue.getCurrentInstance();
    function handleClick(e) {
      var _a, _b;
      if (props.disabled) {
        e.stopImmediatePropagation();
        return;
      }
      if (elDropdown.hideOnClick.value) {
        (_a = elDropdown.handleClick) == null ? void 0 : _a.call(elDropdown);
      }
      (_b = elDropdown.commandHandler) == null ? void 0 : _b.call(elDropdown, props.command, _instance, e);
    }
    return {
      handleClick
    };
  }
});

const _hoisted_1 = ["aria-disabled", "tabindex"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("li", {
    class: vue.normalizeClass(["el-dropdown-menu__item", {
      "is-disabled": _ctx.disabled,
      "el-dropdown-menu__item--divided": _ctx.divided
    }]),
    "aria-disabled": _ctx.disabled,
    tabindex: _ctx.disabled ? null : -1,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.icon ? (vue.openBlock(), vue.createElementBlock("i", {
      key: 0,
      class: vue.normalizeClass(_ctx.icon)
    }, null, 2)) : vue.createCommentVNode("v-if", true),
    vue.renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1);
}

script$1.render = render$1;
script$1.__file = "packages/components/dropdown/src/dropdown-item.vue";

var script = vue.defineComponent({
  name: "ElDropdownMenu",
  directives: {
    ClickOutside: directives.ClickOutside
  },
  setup() {
    const { _elDropdownSize, elDropdown } = useDropdown();
    const size = _elDropdownSize.value;
    function show() {
      var _a;
      if (["click", "contextmenu"].includes(elDropdown.trigger.value))
        return;
      (_a = elDropdown.show) == null ? void 0 : _a.call(elDropdown);
    }
    function hide() {
      if (["click", "contextmenu"].includes(elDropdown.trigger.value))
        return;
      _hide();
    }
    function _hide() {
      var _a;
      (_a = elDropdown.hide) == null ? void 0 : _a.call(elDropdown);
    }
    vue.onMounted(() => {
      const dropdownMenu = vue.getCurrentInstance();
      initDropdownDomEvent(dropdownMenu, elDropdown.triggerElm.value, elDropdown.instance);
    });
    return {
      size,
      show,
      hide,
      innerHide: _hide,
      triggerElm: elDropdown.triggerElm
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_clickOutside = vue.resolveDirective("clickOutside");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("ul", {
    class: vue.normalizeClass([[_ctx.size && `el-dropdown-menu--${_ctx.size}`], "el-dropdown-menu"]),
    onMouseenter: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.show && _ctx.show(...args), ["stop"])),
    onMouseleave: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.hide && _ctx.hide(...args), ["stop"]))
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 34)), [
    [_directive_clickOutside, _ctx.innerHide, _ctx.triggerElm]
  ]);
}

script.render = render;
script.__file = "packages/components/dropdown/src/dropdown-menu.vue";

const ElDropdown = withInstall.withInstall(script$2, {
  DropdownItem: script$1,
  DropdownMenu: script
});
const ElDropdownItem = withInstall.withNoopInstall(script$1);
const ElDropdownMenu = withInstall.withNoopInstall(script);

exports.ElDropdown = ElDropdown;
exports.ElDropdownItem = ElDropdownItem;
exports.ElDropdownMenu = ElDropdownMenu;
exports["default"] = ElDropdown;
