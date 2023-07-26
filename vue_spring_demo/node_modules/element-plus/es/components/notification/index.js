import { withInstallFunction } from 'element-plus/es/utils/with-install';
import { defineComponent, ref, computed, onMounted, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, normalizeStyle, createElementBlock, createCommentVNode, toDisplayString, renderSlot, Fragment, vShow, withModifiers, createVNode, render as render$1 } from 'vue';
import isServer from 'element-plus/es/utils/isServer';
import PopupManager from 'element-plus/es/utils/popup-manager';
import { isVNode } from 'element-plus/es/utils/util';
import { useEventListener, useTimeoutFn } from '@vueuse/core';
import { EVENT_CODE } from 'element-plus/es/utils/aria';
import { buildProps, definePropType } from 'element-plus/es/utils/props';

const notificationTypes = [
  "success",
  "info",
  "warning",
  "error"
];
const notificationProps = buildProps({
  customClass: {
    type: String,
    default: ""
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 4500
  },
  iconClass: {
    type: String,
    default: ""
  },
  id: {
    type: String,
    default: ""
  },
  message: {
    type: definePropType([String, Object]),
    default: ""
  },
  offset: {
    type: Number,
    default: 0
  },
  onClick: {
    type: definePropType(Function),
    default: () => void 0
  },
  onClose: {
    type: definePropType(Function),
    required: true
  },
  position: {
    type: String,
    values: ["top-right", "top-left", "bottom-right", "bottom-left"],
    default: "top-right"
  },
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    values: [...notificationTypes, ""],
    default: ""
  },
  zIndex: {
    type: Number,
    default: 0
  }
});
const notificationEmits = {
  destroy: () => true
};

const typeMap = {
  "": "",
  success: "el-icon-success",
  info: "el-icon-info",
  warning: "el-icon-warning",
  error: "el-icon-error"
};
var script = defineComponent({
  name: "ElNotification",
  props: notificationProps,
  emits: notificationEmits,
  setup(props) {
    const visible = ref(false);
    let timer = void 0;
    const typeClass = computed(() => typeMap[props.type]);
    const horizontalClass = computed(() => props.position.endsWith("right") ? "right" : "left");
    const verticalProperty = computed(() => props.position.startsWith("top") ? "top" : "bottom");
    const positionStyle = computed(() => {
      return {
        [verticalProperty.value]: `${props.offset}px`,
        zIndex: props.zIndex
      };
    });
    function startTimer() {
      if (props.duration > 0) {
        ({ stop: timer } = useTimeoutFn(() => {
          if (visible.value)
            close();
        }, props.duration));
      }
    }
    function clearTimer() {
      timer == null ? void 0 : timer();
    }
    function close() {
      visible.value = false;
    }
    function onKeydown({ code }) {
      if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
        clearTimer();
      } else if (code === EVENT_CODE.esc) {
        if (visible.value) {
          close();
        }
      } else {
        startTimer();
      }
    }
    onMounted(() => {
      startTimer();
      visible.value = true;
    });
    useEventListener(document, "keydown", onKeydown);
    return {
      horizontalClass,
      typeClass,
      positionStyle,
      visible,
      close,
      clearTimer,
      startTimer
    };
  }
});

const _hoisted_1 = ["id"];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = { key: 0 };
const _hoisted_4 = ["innerHTML"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    name: "el-notification-fade",
    onBeforeLeave: _ctx.onClose,
    onAfterLeave: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("destroy"))
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        id: _ctx.id,
        class: normalizeClass(["el-notification", _ctx.customClass, _ctx.horizontalClass]),
        style: normalizeStyle(_ctx.positionStyle),
        role: "alert",
        onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.clearTimer && _ctx.clearTimer(...args)),
        onMouseleave: _cache[2] || (_cache[2] = (...args) => _ctx.startTimer && _ctx.startTimer(...args)),
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.onClick && _ctx.onClick(...args))
      }, [
        _ctx.type || _ctx.iconClass ? (openBlock(), createElementBlock("i", {
          key: 0,
          class: normalizeClass(["el-notification__icon", [_ctx.typeClass, _ctx.iconClass]])
        }, null, 2)) : createCommentVNode("v-if", true),
        createElementVNode("div", {
          class: normalizeClass(["el-notification__group", { "is-with-icon": _ctx.typeClass || _ctx.iconClass }])
        }, [
          createElementVNode("h2", {
            class: "el-notification__title",
            textContent: toDisplayString(_ctx.title)
          }, null, 8, _hoisted_2),
          withDirectives(createElementVNode("div", {
            class: "el-notification__content",
            style: normalizeStyle(!!_ctx.title ? void 0 : { margin: 0 })
          }, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              !_ctx.dangerouslyUseHTMLString ? (openBlock(), createElementBlock("p", _hoisted_3, toDisplayString(_ctx.message), 1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createCommentVNode(" Caution here, message could've been compromized, nerver use user's input as message "),
                createCommentVNode(" eslint-disable-next-line "),
                createElementVNode("p", { innerHTML: _ctx.message }, null, 8, _hoisted_4)
              ], 2112))
            ])
          ], 4), [
            [vShow, _ctx.message]
          ]),
          _ctx.showClose ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "el-notification__closeBtn el-icon-close",
            onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.close && _ctx.close(...args), ["stop"]))
          })) : createCommentVNode("v-if", true)
        ], 2)
      ], 46, _hoisted_1), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 3
  }, 8, ["onBeforeLeave"]);
}

script.render = render;
script.__file = "packages/components/notification/src/notification.vue";

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
const notifications = {
  "top-left": [],
  "top-right": [],
  "bottom-left": [],
  "bottom-right": []
};
const GAP_SIZE = 16;
let seed = 1;
const notify = function(options = {}) {
  if (isServer)
    return { close: () => void 0 };
  if (typeof options === "string" || isVNode(options)) {
    options = { message: options };
  }
  const position = options.position || "top-right";
  let verticalOffset = options.offset || 0;
  notifications[position].forEach(({ vm: vm2 }) => {
    var _a;
    verticalOffset += (((_a = vm2.el) == null ? void 0 : _a.offsetHeight) || 0) + GAP_SIZE;
  });
  verticalOffset += GAP_SIZE;
  const id = `notification_${seed++}`;
  const userOnClose = options.onClose;
  const props = __spreadProps(__spreadValues({
    zIndex: PopupManager.nextZIndex(),
    offset: verticalOffset
  }, options), {
    id,
    onClose: () => {
      close(id, position, userOnClose);
    }
  });
  const container = document.createElement("div");
  const vm = createVNode(script, props, isVNode(props.message) ? {
    default: () => props.message
  } : null);
  vm.props.onDestroy = () => {
    render$1(null, container);
  };
  render$1(vm, container);
  notifications[position].push({ vm });
  document.body.appendChild(container.firstElementChild);
  return {
    close: () => {
      vm.component.proxy.visible = false;
    }
  };
};
notificationTypes.forEach((type) => {
  notify[type] = (options = {}) => {
    if (typeof options === "string" || isVNode(options)) {
      options = {
        message: options
      };
    }
    return notify(__spreadProps(__spreadValues({}, options), {
      type
    }));
  };
});
function close(id, position, userOnClose) {
  const orientedNotifications = notifications[position];
  const idx = orientedNotifications.findIndex(({ vm: vm2 }) => {
    var _a;
    return ((_a = vm2.component) == null ? void 0 : _a.props.id) === id;
  });
  if (idx === -1)
    return;
  const { vm } = orientedNotifications[idx];
  if (!vm)
    return;
  userOnClose == null ? void 0 : userOnClose(vm);
  const removedHeight = vm.el.offsetHeight;
  const verticalPos = position.split("-")[0];
  orientedNotifications.splice(idx, 1);
  const len = orientedNotifications.length;
  if (len < 1)
    return;
  for (let i = idx; i < len; i++) {
    const { el, component } = orientedNotifications[i].vm;
    const pos = parseInt(el.style[verticalPos], 10) - removedHeight - GAP_SIZE;
    component.props.offset = pos;
  }
}
function closeAll() {
  for (const orientedNotifications of Object.values(notifications)) {
    orientedNotifications.forEach(({ vm }) => {
      vm.component.proxy.visible = false;
    });
  }
}
notify.closeAll = closeAll;

const ElNotification = withInstallFunction(notify, "$notify");

export { ElNotification, ElNotification as default, notificationEmits, notificationProps, notificationTypes };
