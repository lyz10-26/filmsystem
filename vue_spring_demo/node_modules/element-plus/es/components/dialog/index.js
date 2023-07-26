import { withInstall } from 'element-plus/es/utils/with-install';
import { ref, computed, watch, nextTick, onMounted, defineComponent, resolveComponent, resolveDirective, openBlock, createBlock, Teleport, createVNode, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, normalizeStyle, withModifiers, renderSlot, toDisplayString, createElementBlock, createCommentVNode, vShow } from 'vue';
import { TrapFocus } from 'element-plus/es/directives';
import { ElOverlay } from 'element-plus/es/components/overlay';
import { useLockScreen, useModal, useRestoreActive, useSameTarget } from 'element-plus/es/hooks';
import { isValidWidthUnit } from 'element-plus/es/utils/validators';
import { buildProps, definePropType } from 'element-plus/es/utils/props';
import { UPDATE_MODEL_EVENT } from 'element-plus/es/utils/constants';
import { useTimeoutFn } from '@vueuse/core';
import isServer from 'element-plus/es/utils/isServer';
import PopupManager from 'element-plus/es/utils/popup-manager';
import { isNumber } from 'element-plus/es/utils/util';

const dialogProps = buildProps({
  appendToBody: {
    type: Boolean,
    default: false
  },
  beforeClose: {
    type: definePropType(Function)
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ""
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  modal: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  top: {
    type: String
  },
  modelValue: {
    type: Boolean,
    required: true
  },
  modalClass: String,
  width: {
    type: [String, Number],
    validator: isValidWidthUnit
  },
  zIndex: {
    type: Number
  }
});
const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value) => typeof value === "boolean"
};

const useDialog = (props, { emit }, targetRef) => {
  const visible = ref(false);
  const closed = ref(false);
  const rendered = ref(false);
  const zIndex = ref(props.zIndex || PopupManager.nextZIndex());
  let openTimer = void 0;
  let closeTimer = void 0;
  const normalizeWidth = computed(() => isNumber(props.width) ? `${props.width}px` : props.width);
  const style = computed(() => {
    const style2 = {};
    const varPrefix = `--el-dialog`;
    if (!props.fullscreen) {
      if (props.top) {
        style2[`${varPrefix}-margin-top`] = props.top;
      }
      if (props.width) {
        style2[`${varPrefix}-width`] = normalizeWidth.value;
      }
    }
    return style2;
  });
  function afterEnter() {
    emit("opened");
  }
  function afterLeave() {
    emit("closed");
    emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.value = false;
    }
  }
  function beforeLeave() {
    emit("close");
  }
  function open() {
    closeTimer == null ? void 0 : closeTimer();
    openTimer == null ? void 0 : openTimer();
    if (props.openDelay && props.openDelay > 0) {
      ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
    } else {
      doOpen();
    }
  }
  function close() {
    openTimer == null ? void 0 : openTimer();
    closeTimer == null ? void 0 : closeTimer();
    if (props.closeDelay && props.closeDelay > 0) {
      ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
    } else {
      doClose();
    }
  }
  function hide(shouldCancel) {
    if (shouldCancel)
      return;
    closed.value = true;
    visible.value = false;
  }
  function handleClose() {
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  }
  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }
  function doOpen() {
    if (isServer) {
      return;
    }
    visible.value = true;
  }
  function doClose() {
    visible.value = false;
  }
  if (props.lockScroll) {
    useLockScreen(visible);
  }
  if (props.closeOnPressEscape) {
    useModal({
      handleClose
    }, visible);
  }
  useRestoreActive(visible);
  watch(() => props.modelValue, (val) => {
    if (val) {
      closed.value = false;
      open();
      rendered.value = true;
      emit("open");
      zIndex.value = props.zIndex ? zIndex.value++ : PopupManager.nextZIndex();
      nextTick(() => {
        if (targetRef.value) {
          targetRef.value.scrollTop = 0;
        }
      });
    } else {
      if (visible.value) {
        close();
      }
    }
  });
  onMounted(() => {
    if (props.modelValue) {
      visible.value = true;
      rendered.value = true;
      open();
    }
  });
  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    closed,
    style,
    rendered,
    visible,
    zIndex
  };
};

var __defProp = Object.defineProperty;
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
var script = defineComponent({
  name: "ElDialog",
  components: {
    ElOverlay
  },
  directives: {
    TrapFocus
  },
  props: dialogProps,
  emits: dialogEmits,
  setup(props, ctx) {
    const dialogRef = ref();
    const dialog = useDialog(props, ctx, dialogRef);
    const overlayEvent = useSameTarget(dialog.onModalClick);
    return __spreadValues({
      dialogRef,
      overlayEvent
    }, dialog);
  }
});

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = { class: "el-dialog__header" };
const _hoisted_3 = { class: "el-dialog__title" };
const _hoisted_4 = /* @__PURE__ */ createElementVNode("i", { class: "el-dialog__close el-icon el-icon-close" }, null, -1);
const _hoisted_5 = [
  _hoisted_4
];
const _hoisted_6 = {
  key: 0,
  class: "el-dialog__body"
};
const _hoisted_7 = {
  key: 1,
  class: "el-dialog__footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_overlay = resolveComponent("el-overlay");
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createBlock(Teleport, {
    to: "body",
    disabled: !_ctx.appendToBody
  }, [
    createVNode(Transition, {
      name: "dialog-fade",
      onAfterEnter: _ctx.afterEnter,
      onAfterLeave: _ctx.afterLeave,
      onBeforeLeave: _ctx.beforeLeave
    }, {
      default: withCtx(() => [
        withDirectives(createVNode(_component_el_overlay, {
          "custom-mask-event": "",
          mask: _ctx.modal,
          "overlay-class": _ctx.modalClass,
          "z-index": _ctx.zIndex
        }, {
          default: withCtx(() => [
            createElementVNode("div", {
              class: "el-overlay-dialog",
              onClick: _cache[2] || (_cache[2] = (...args) => _ctx.overlayEvent.onClick && _ctx.overlayEvent.onClick(...args)),
              onMousedown: _cache[3] || (_cache[3] = (...args) => _ctx.overlayEvent.onMousedown && _ctx.overlayEvent.onMousedown(...args)),
              onMouseup: _cache[4] || (_cache[4] = (...args) => _ctx.overlayEvent.onMouseup && _ctx.overlayEvent.onMouseup(...args))
            }, [
              withDirectives(createElementVNode("div", {
                ref: "dialogRef",
                class: normalizeClass([
                  "el-dialog",
                  {
                    "is-fullscreen": _ctx.fullscreen,
                    "el-dialog--center": _ctx.center
                  },
                  _ctx.customClass
                ]),
                "aria-modal": "true",
                role: "dialog",
                "aria-label": _ctx.title || "dialog",
                style: normalizeStyle(_ctx.style),
                onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                }, ["stop"]))
              }, [
                createElementVNode("div", _hoisted_2, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createElementVNode("span", _hoisted_3, toDisplayString(_ctx.title), 1)
                  ]),
                  _ctx.showClose ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    "aria-label": "close",
                    class: "el-dialog__headerbtn",
                    type: "button",
                    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
                  }, _hoisted_5)) : createCommentVNode("v-if", true)
                ]),
                _ctx.rendered ? (openBlock(), createElementBlock("div", _hoisted_6, [
                  renderSlot(_ctx.$slots, "default")
                ])) : createCommentVNode("v-if", true),
                _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_7, [
                  renderSlot(_ctx.$slots, "footer")
                ])) : createCommentVNode("v-if", true)
              ], 14, _hoisted_1), [
                [_directive_trap_focus]
              ])
            ], 32)
          ]),
          _: 3
        }, 8, ["mask", "overlay-class", "z-index"]), [
          [vShow, _ctx.visible]
        ])
      ]),
      _: 3
    }, 8, ["onAfterEnter", "onAfterLeave", "onBeforeLeave"])
  ], 8, ["disabled"]);
}

script.render = render;
script.__file = "packages/components/dialog/src/dialog.vue";

const ElDialog = withInstall(script);

export { ElDialog, ElDialog as default, dialogEmits, dialogProps, useDialog };
