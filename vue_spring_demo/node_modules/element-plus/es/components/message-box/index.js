import { defineComponent, ref, reactive, computed, watch, nextTick, onMounted, onBeforeUnmount, toRefs, resolveComponent, resolveDirective, openBlock, createBlock, Transition, withCtx, withDirectives, createVNode, withModifiers, createElementVNode, normalizeClass, normalizeStyle, createElementBlock, createCommentVNode, toDisplayString, withKeys, renderSlot, vShow, createTextVNode, render as render$1, h } from 'vue';
import { hasOwn } from '@vue/shared';
import isServer from 'element-plus/es/utils/isServer';
import { isString, isVNode } from 'element-plus/es/utils/util';
import ElButton from 'element-plus/es/components/button';
import { TrapFocus } from 'element-plus/es/directives';
import { useLocaleInject, useModal, usePreventGlobal, useLockScreen, useRestoreActive } from 'element-plus/es/hooks';
import ElInput from 'element-plus/es/components/input';
import { ElOverlay } from 'element-plus/es/components/overlay';
import PopupManager from 'element-plus/es/utils/popup-manager';
import { on, off } from 'element-plus/es/utils/dom';
import { EVENT_CODE } from 'element-plus/es/utils/aria';
import { isValidComponentSize } from 'element-plus/es/utils/validators';

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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const TypeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error"
};
var script = defineComponent({
  name: "ElMessageBox",
  directives: {
    TrapFocus
  },
  components: {
    ElButton,
    ElInput,
    ElOverlay
  },
  inheritAttrs: false,
  props: {
    buttonSize: {
      type: String,
      validator: isValidComponentSize
    },
    modal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    closeOnHashChange: {
      type: Boolean,
      default: true
    },
    center: Boolean,
    roundButton: {
      default: false,
      type: Boolean
    },
    container: {
      type: String,
      default: "body"
    },
    boxType: {
      type: String,
      default: ""
    }
  },
  emits: ["vanish", "action"],
  setup(props, { emit }) {
    const { t } = useLocaleInject();
    const visible = ref(false);
    const state = reactive({
      beforeClose: null,
      callback: null,
      cancelButtonText: "",
      cancelButtonClass: "",
      confirmButtonText: "",
      confirmButtonClass: "",
      customClass: "",
      customStyle: {},
      dangerouslyUseHTMLString: false,
      distinguishCancelAndClose: false,
      iconClass: "",
      inputPattern: null,
      inputPlaceholder: "",
      inputType: "text",
      inputValue: null,
      inputValidator: null,
      inputErrorMessage: "",
      message: null,
      modalFade: true,
      modalClass: "",
      showCancelButton: false,
      showConfirmButton: true,
      type: "",
      title: void 0,
      showInput: false,
      action: "",
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonDisabled: false,
      editorErrorMessage: "",
      validateError: false,
      zIndex: PopupManager.nextZIndex()
    });
    const icon = computed(() => state.iconClass || (state.type && TypeMap[state.type] ? `el-icon-${TypeMap[state.type]}` : ""));
    const hasMessage = computed(() => !!state.message);
    const inputRef = ref(null);
    const confirmRef = ref(null);
    const confirmButtonClasses = computed(() => `el-button--primary ${state.confirmButtonClass}`);
    watch(() => state.inputValue, (val) => __async(this, null, function* () {
      yield nextTick();
      if (props.boxType === "prompt" && val !== null) {
        validate();
      }
    }), { immediate: true });
    watch(() => visible.value, (val) => {
      if (val) {
        if (props.boxType === "alert" || props.boxType === "confirm") {
          nextTick().then(() => {
            var _a, _b, _c;
            (_c = (_b = (_a = confirmRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.focus) == null ? void 0 : _c.call(_b);
          });
        }
        state.zIndex = PopupManager.nextZIndex();
      }
      if (props.boxType !== "prompt")
        return;
      if (val) {
        nextTick().then(() => {
          if (inputRef.value && inputRef.value.$el) {
            getInputElement().focus();
          }
        });
      } else {
        state.editorErrorMessage = "";
        state.validateError = false;
      }
    });
    onMounted(() => __async(this, null, function* () {
      yield nextTick();
      if (props.closeOnHashChange) {
        on(window, "hashchange", doClose);
      }
    }));
    onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        off(window, "hashchange", doClose);
      }
    });
    function doClose() {
      if (!visible.value)
        return;
      visible.value = false;
      nextTick(() => {
        if (state.action)
          emit("action", state.action);
      });
    }
    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? "close" : "cancel");
      }
    };
    const handleInputEnter = () => {
      if (state.inputType !== "textarea") {
        return handleAction("confirm");
      }
    };
    const handleAction = (action) => {
      var _a;
      if (props.boxType === "prompt" && action === "confirm" && !validate()) {
        return;
      }
      state.action = action;
      if (state.beforeClose) {
        (_a = state.beforeClose) == null ? void 0 : _a.call(state, action, state, doClose);
      } else {
        doClose();
      }
    };
    const validate = () => {
      if (props.boxType === "prompt") {
        const inputPattern = state.inputPattern;
        if (inputPattern && !inputPattern.test(state.inputValue || "")) {
          state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
          state.validateError = true;
          return false;
        }
        const inputValidator = state.inputValidator;
        if (typeof inputValidator === "function") {
          const validateResult = inputValidator(state.inputValue);
          if (validateResult === false) {
            state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
            state.validateError = true;
            return false;
          }
          if (typeof validateResult === "string") {
            state.editorErrorMessage = validateResult;
            state.validateError = true;
            return false;
          }
        }
      }
      state.editorErrorMessage = "";
      state.validateError = false;
      return true;
    };
    const getInputElement = () => {
      const inputRefs = inputRef.value.$refs;
      return inputRefs.input || inputRefs.textarea;
    };
    const handleClose = () => {
      handleAction("close");
    };
    if (props.closeOnPressEscape) {
      useModal({
        handleClose
      }, visible);
    } else {
      usePreventGlobal(visible, "keydown", (e) => e.code === EVENT_CODE.esc);
    }
    if (props.lockScroll) {
      useLockScreen(visible);
    }
    useRestoreActive(visible);
    return __spreadProps(__spreadValues({}, toRefs(state)), {
      visible,
      hasMessage,
      icon,
      confirmButtonClasses,
      inputRef,
      confirmRef,
      doClose,
      handleClose,
      handleWrapperClick,
      handleInputEnter,
      handleAction,
      t
    });
  }
});

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = {
  key: 0,
  class: "el-message-box__header"
};
const _hoisted_3 = { class: "el-message-box__title" };
const _hoisted_4 = /* @__PURE__ */ createElementVNode("i", { class: "el-message-box__close el-icon-close" }, null, -1);
const _hoisted_5 = [
  _hoisted_4
];
const _hoisted_6 = { class: "el-message-box__content" };
const _hoisted_7 = { class: "el-message-box__container" };
const _hoisted_8 = {
  key: 1,
  class: "el-message-box__message"
};
const _hoisted_9 = { key: 0 };
const _hoisted_10 = ["innerHTML"];
const _hoisted_11 = { class: "el-message-box__input" };
const _hoisted_12 = { class: "el-message-box__btns" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_overlay = resolveComponent("el-overlay");
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createBlock(Transition, {
    name: "fade-in-linear",
    onAfterLeave: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("vanish"))
  }, {
    default: withCtx(() => [
      withDirectives(createVNode(_component_el_overlay, {
        "z-index": _ctx.zIndex,
        "overlay-class": ["is-message-box", _ctx.modalClass],
        mask: _ctx.modal,
        onClick: withModifiers(_ctx.handleWrapperClick, ["self"])
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            ref: "root",
            "aria-label": _ctx.title || "dialog",
            "aria-modal": "true",
            class: normalizeClass([
              "el-message-box",
              _ctx.customClass,
              { "el-message-box--center": _ctx.center }
            ]),
            style: normalizeStyle(_ctx.customStyle)
          }, [
            _ctx.title !== null && _ctx.title !== void 0 ? (openBlock(), createElementBlock("div", _hoisted_2, [
              createElementVNode("div", _hoisted_3, [
                _ctx.icon && _ctx.center ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["el-message-box__status", _ctx.icon])
                }, null, 2)) : createCommentVNode("v-if", true),
                createElementVNode("span", null, toDisplayString(_ctx.title), 1)
              ]),
              _ctx.showClose ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                class: "el-message-box__headerbtn",
                "aria-label": "Close",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel")),
                onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel"), ["prevent"]), ["enter"]))
              }, _hoisted_5, 32)) : createCommentVNode("v-if", true)
            ])) : createCommentVNode("v-if", true),
            createElementVNode("div", _hoisted_6, [
              createElementVNode("div", _hoisted_7, [
                _ctx.icon && !_ctx.center && _ctx.hasMessage ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["el-message-box__status", _ctx.icon])
                }, null, 2)) : createCommentVNode("v-if", true),
                _ctx.hasMessage ? (openBlock(), createElementBlock("div", _hoisted_8, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    !_ctx.dangerouslyUseHTMLString ? (openBlock(), createElementBlock("p", _hoisted_9, toDisplayString(_ctx.message), 1)) : (openBlock(), createElementBlock("p", {
                      key: 1,
                      innerHTML: _ctx.message
                    }, null, 8, _hoisted_10))
                  ])
                ])) : createCommentVNode("v-if", true)
              ]),
              withDirectives(createElementVNode("div", _hoisted_11, [
                createVNode(_component_el_input, {
                  ref: "inputRef",
                  modelValue: _ctx.inputValue,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.inputValue = $event),
                  type: _ctx.inputType,
                  placeholder: _ctx.inputPlaceholder,
                  class: normalizeClass({ invalid: _ctx.validateError }),
                  onKeydown: withKeys(withModifiers(_ctx.handleInputEnter, ["prevent"]), ["enter"])
                }, null, 8, ["modelValue", "type", "placeholder", "class", "onKeydown"]),
                createElementVNode("div", {
                  class: "el-message-box__errormsg",
                  style: normalizeStyle({
                    visibility: !!_ctx.editorErrorMessage ? "visible" : "hidden"
                  })
                }, toDisplayString(_ctx.editorErrorMessage), 5)
              ], 512), [
                [vShow, _ctx.showInput]
              ])
            ]),
            createElementVNode("div", _hoisted_12, [
              _ctx.showCancelButton ? (openBlock(), createBlock(_component_el_button, {
                key: 0,
                loading: _ctx.cancelButtonLoading,
                class: normalizeClass([_ctx.cancelButtonClass]),
                round: _ctx.roundButton,
                size: _ctx.buttonSize || "small",
                onClick: _cache[3] || (_cache[3] = ($event) => _ctx.handleAction("cancel")),
                onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => _ctx.handleAction("cancel"), ["prevent"]), ["enter"]))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.cancelButtonText || _ctx.t("el.messagebox.cancel")), 1)
                ]),
                _: 1
              }, 8, ["loading", "class", "round", "size"])) : createCommentVNode("v-if", true),
              withDirectives(createVNode(_component_el_button, {
                ref: "confirmRef",
                loading: _ctx.confirmButtonLoading,
                class: normalizeClass([_ctx.confirmButtonClasses]),
                round: _ctx.roundButton,
                disabled: _ctx.confirmButtonDisabled,
                size: _ctx.buttonSize || "small",
                onClick: _cache[5] || (_cache[5] = ($event) => _ctx.handleAction("confirm")),
                onKeydown: _cache[6] || (_cache[6] = withKeys(withModifiers(($event) => _ctx.handleAction("confirm"), ["prevent"]), ["enter"]))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.confirmButtonText || _ctx.t("el.messagebox.confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading", "class", "round", "disabled", "size"]), [
                [vShow, _ctx.showConfirmButton]
              ])
            ])
          ], 14, _hoisted_1), [
            [_directive_trap_focus]
          ])
        ]),
        _: 3
      }, 8, ["z-index", "overlay-class", "mask", "onClick"]), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 3
  });
}

script.render = render;
script.__file = "packages/components/message-box/src/index.vue";

const messageInstance = new Map();
const initInstance = (props, container) => {
  const vnode = h(script, props);
  render$1(vnode, container);
  document.body.appendChild(container.firstElementChild);
  return vnode.component;
};
const genContainer = () => {
  return document.createElement("div");
};
const showMessage = (options) => {
  const container = genContainer();
  options.onVanish = () => {
    render$1(null, container);
    messageInstance.delete(vm);
  };
  options.onAction = (action) => {
    const currentMsg = messageInstance.get(vm);
    let resolve;
    if (options.showInput) {
      resolve = { value: vm.inputValue, action };
    } else {
      resolve = action;
    }
    if (options.callback) {
      options.callback(resolve, instance.proxy);
    } else {
      if (action === "cancel" || action === "close") {
        if (options.distinguishCancelAndClose && action !== "cancel") {
          currentMsg.reject("close");
        } else {
          currentMsg.reject("cancel");
        }
      } else {
        currentMsg.resolve(resolve);
      }
    }
  };
  const instance = initInstance(options, container);
  const vm = instance.proxy;
  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
      vm[prop] = options[prop];
    }
  }
  watch(() => vm.message, (newVal, oldVal) => {
    if (isVNode(newVal)) {
      instance.slots.default = () => [newVal];
    } else if (isVNode(oldVal) && !isVNode(newVal)) {
      delete instance.slots.default;
    }
  }, {
    immediate: true
  });
  vm.visible = true;
  return vm;
};
function MessageBox(options) {
  if (isServer)
    return;
  let callback;
  if (isString(options) || isVNode(options)) {
    options = {
      message: options
    };
  } else {
    callback = options.callback;
  }
  return new Promise((resolve, reject) => {
    const vm = showMessage(options);
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject
    });
  });
}
MessageBox.alert = (message, title, options) => {
  if (typeof title === "object") {
    options = title;
    title = "";
  } else if (title === void 0) {
    title = "";
  }
  return MessageBox(Object.assign({
    title,
    message,
    type: "",
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options, {
    boxType: "alert"
  }));
};
MessageBox.confirm = (message, title, options) => {
  if (typeof title === "object") {
    options = title;
    title = "";
  } else if (title === void 0) {
    title = "";
  }
  return MessageBox(Object.assign({
    title,
    message,
    type: "",
    showCancelButton: true
  }, options, {
    boxType: "confirm"
  }));
};
MessageBox.prompt = (message, title, options) => {
  if (typeof title === "object") {
    options = title;
    title = "";
  } else if (title === void 0) {
    title = "";
  }
  return MessageBox(Object.assign({
    title,
    message,
    showCancelButton: true,
    showInput: true,
    type: ""
  }, options, {
    boxType: "prompt"
  }));
};
MessageBox.close = () => {
  messageInstance.forEach((_, vm) => {
    vm.doClose();
  });
  messageInstance.clear();
};

const _MessageBox = MessageBox;
_MessageBox.install = (app) => {
  app.config.globalProperties.$msgbox = _MessageBox;
  app.config.globalProperties.$messageBox = _MessageBox;
  app.config.globalProperties.$alert = _MessageBox.alert;
  app.config.globalProperties.$confirm = _MessageBox.confirm;
  app.config.globalProperties.$prompt = _MessageBox.prompt;
};
const ElMessageBox = _MessageBox;

export { ElMessageBox, _MessageBox as default };
