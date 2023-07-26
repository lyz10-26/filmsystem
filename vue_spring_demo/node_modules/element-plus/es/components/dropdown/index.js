import { withInstall, withNoopInstall } from 'element-plus/es/utils/with-install';
import { inject, computed, ref, defineComponent, getCurrentInstance, watch, provide, onMounted, resolveComponent, openBlock, createBlock, withCtx, createVNode, renderSlot, createElementVNode, normalizeClass, createElementBlock, createCommentVNode, resolveDirective, withDirectives, withModifiers } from 'vue';
import ElButton from 'element-plus/es/components/button';
import ElPopper, { Effect } from 'element-plus/es/components/popper';
import ElScrollbar from 'element-plus/es/components/scrollbar';
import { addClass, on, removeClass } from 'element-plus/es/utils/dom';
import { useGlobalConfig, generateId, addUnit } from 'element-plus/es/utils/util';
import { EVENT_CODE } from 'element-plus/es/utils/aria';
import { ClickOutside } from 'element-plus/es/directives';

const useDropdown = () => {
  const ELEMENT = useGlobalConfig();
  const elDropdown = inject("elDropdown", {});
  const _elDropdownSize = computed(() => elDropdown == null ? void 0 : elDropdown.dropdownSize);
  return {
    ELEMENT,
    elDropdown,
    _elDropdownSize
  };
};
const initDropdownDomEvent = (dropdownChildren, triggerElm, _instance) => {
  const menuItems = ref(null);
  const menuItemsArray = ref(null);
  const dropdownElm = ref(null);
  const listId = ref(`dropdown-menu-${generateId()}`);
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
    if ([EVENT_CODE.up, EVENT_CODE.down].includes(code)) {
      removeTabindex();
      resetTabindex(menuItems.value[0]);
      menuItems.value[0].focus();
      ev.preventDefault();
      ev.stopPropagation();
    } else if (code === EVENT_CODE.enter) {
      _instance.handleClick();
    } else if ([EVENT_CODE.tab, EVENT_CODE.esc].includes(code)) {
      _instance.hide();
    }
  }
  function handleItemKeyDown(ev) {
    const code = ev.code;
    const target = ev.target;
    const currentIndex = menuItemsArray.value.indexOf(target);
    const max = menuItemsArray.value.length - 1;
    let nextIndex;
    if ([EVENT_CODE.up, EVENT_CODE.down].includes(code)) {
      if (code === EVENT_CODE.up) {
        nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
      } else {
        nextIndex = currentIndex < max ? currentIndex + 1 : max;
      }
      removeTabindex();
      resetTabindex(menuItems.value[nextIndex]);
      menuItems.value[nextIndex].focus();
      ev.preventDefault();
      ev.stopPropagation();
    } else if (code === EVENT_CODE.enter) {
      triggerElmFocus();
      target.click();
      if (_instance.props.hideOnClick) {
        _instance.hide();
      }
    } else if ([EVENT_CODE.tab, EVENT_CODE.esc].includes(code)) {
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
      addClass(triggerElm, "el-dropdown-selfdefine");
    }
  }
  function initEvent() {
    on(triggerElm, "keydown", handleTriggerKeyDown);
    on(dropdownElm.value, "keydown", handleItemKeyDown, true);
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

const { ButtonGroup: ElButtonGroup } = ElButton;
var script$2 = defineComponent({
  name: "ElDropdown",
  components: {
    ElButton,
    ElButtonGroup,
    ElScrollbar,
    ElPopper
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
      default: Effect.LIGHT
    },
    maxHeight: {
      type: [Number, String],
      default: ""
    }
  },
  emits: ["visible-change", "click", "command"],
  setup(props, { emit }) {
    const _instance = getCurrentInstance();
    const { ELEMENT } = useDropdown();
    const timeout = ref(null);
    const visible = ref(false);
    const scrollbar = ref(null);
    const wrapStyle = computed(() => `max-height: ${addUnit(props.maxHeight)}`);
    watch(() => visible.value, (val) => {
      if (val)
        triggerElmFocus();
      if (!val)
        triggerElmBlur();
      emit("visible-change", val);
    });
    const focusing = ref(false);
    watch(() => focusing.value, (val) => {
      const selfDefine = triggerElm.value;
      if (selfDefine) {
        if (val) {
          addClass(selfDefine, "focusing");
        } else {
          removeClass(selfDefine, "focusing");
        }
      }
    });
    const triggerVnode = ref(null);
    const triggerElm = computed(() => {
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
    const dropdownSize = computed(() => props.size || ELEMENT.size);
    function commandHandler(...args) {
      emit("command", ...args);
    }
    provide("elDropdown", {
      instance: _instance,
      dropdownSize,
      visible,
      handleClick,
      commandHandler,
      show,
      hide,
      trigger: computed(() => props.trigger),
      hideOnClick: computed(() => props.hideOnClick),
      triggerElm
    });
    onMounted(() => {
      if (!props.splitButton) {
        on(triggerElm.value, "focus", () => {
          focusing.value = true;
        });
        on(triggerElm.value, "blur", () => {
          focusing.value = false;
        });
        on(triggerElm.value, "click", () => {
          focusing.value = false;
        });
      }
      if (props.trigger === "hover") {
        on(triggerElm.value, "mouseenter", show);
        on(triggerElm.value, "mouseleave", hide);
      } else if (props.trigger === "click") {
        on(triggerElm.value, "click", handleClick);
      } else if (props.trigger === "contextmenu") {
        on(triggerElm.value, "contextmenu", (e) => {
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

const _hoisted_1$1 = /* @__PURE__ */ createElementVNode("i", { class: "el-dropdown__icon el-icon-arrow-down" }, null, -1);
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_button_group = resolveComponent("el-button-group");
  const _component_el_popper = resolveComponent("el-popper");
  return openBlock(), createBlock(_component_el_popper, {
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
    default: withCtx(() => [
      createVNode(_component_el_scrollbar, {
        ref: "scrollbar",
        tag: "ul",
        "wrap-style": _ctx.wrapStyle,
        "view-class": "el-dropdown__list"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "dropdown")
        ]),
        _: 3
      }, 8, ["wrap-style"])
    ]),
    trigger: withCtx(() => [
      createElementVNode("div", {
        class: normalizeClass([
          "el-dropdown",
          _ctx.dropdownSize ? "el-dropdown--" + _ctx.dropdownSize : ""
        ])
      }, [
        !_ctx.splitButton ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(_component_el_button_group, { key: 1 }, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              size: _ctx.dropdownSize,
              type: _ctx.type,
              onClick: _ctx.handlerMainButtonClick
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 8, ["size", "type", "onClick"]),
            createVNode(_component_el_button, {
              size: _ctx.dropdownSize,
              type: _ctx.type,
              class: "el-dropdown__caret-button"
            }, {
              default: withCtx(() => [
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

var script$1 = defineComponent({
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
    const _instance = getCurrentInstance();
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
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["el-dropdown-menu__item", {
      "is-disabled": _ctx.disabled,
      "el-dropdown-menu__item--divided": _ctx.divided
    }]),
    "aria-disabled": _ctx.disabled,
    tabindex: _ctx.disabled ? null : -1,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.icon ? (openBlock(), createElementBlock("i", {
      key: 0,
      class: normalizeClass(_ctx.icon)
    }, null, 2)) : createCommentVNode("v-if", true),
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1);
}

script$1.render = render$1;
script$1.__file = "packages/components/dropdown/src/dropdown-item.vue";

var script = defineComponent({
  name: "ElDropdownMenu",
  directives: {
    ClickOutside
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
    onMounted(() => {
      const dropdownMenu = getCurrentInstance();
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
  const _directive_clickOutside = resolveDirective("clickOutside");
  return withDirectives((openBlock(), createElementBlock("ul", {
    class: normalizeClass([[_ctx.size && `el-dropdown-menu--${_ctx.size}`], "el-dropdown-menu"]),
    onMouseenter: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.show && _ctx.show(...args), ["stop"])),
    onMouseleave: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.hide && _ctx.hide(...args), ["stop"]))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 34)), [
    [_directive_clickOutside, _ctx.innerHide, _ctx.triggerElm]
  ]);
}

script.render = render;
script.__file = "packages/components/dropdown/src/dropdown-menu.vue";

const ElDropdown = withInstall(script$2, {
  DropdownItem: script$1,
  DropdownMenu: script
});
const ElDropdownItem = withNoopInstall(script$1);
const ElDropdownMenu = withNoopInstall(script);

export { ElDropdown, ElDropdownItem, ElDropdownMenu, ElDropdown as default };
