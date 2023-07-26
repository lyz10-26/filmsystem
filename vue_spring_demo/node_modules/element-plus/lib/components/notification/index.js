'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var isServer = require('element-plus/lib/utils/isServer');
var PopupManager = require('element-plus/lib/utils/popup-manager');
var util = require('element-plus/lib/utils/util');
var core = require('@vueuse/core');
var aria = require('element-plus/lib/utils/aria');
var props = require('element-plus/lib/utils/props');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);
var PopupManager__default = /*#__PURE__*/_interopDefaultLegacy(PopupManager);

const notificationTypes = [
  "success",
  "info",
  "warning",
  "error"
];
const notificationProps = props.buildProps({
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
    type: props.definePropType([String, Object]),
    default: ""
  },
  offset: {
    type: Number,
    default: 0
  },
  onClick: {
    type: props.definePropType(Function),
    default: () => void 0
  },
  onClose: {
    type: props.definePropType(Function),
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
var script = vue.defineComponent({
  name: "ElNotification",
  props: notificationProps,
  emits: notificationEmits,
  setup(props) {
    const visible = vue.ref(false);
    let timer = void 0;
    const typeClass = vue.computed(() => typeMap[props.type]);
    const horizontalClass = vue.computed(() => props.position.endsWith("right") ? "right" : "left");
    const verticalProperty = vue.computed(() => props.position.startsWith("top") ? "top" : "bottom");
    const positionStyle = vue.computed(() => {
      return {
        [verticalProperty.value]: `${props.offset}px`,
        zIndex: props.zIndex
      };
    });
    function startTimer() {
      if (props.duration > 0) {
        ({ stop: timer } = core.useTimeoutFn(() => {
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
      if (code === aria.EVENT_CODE.delete || code === aria.EVENT_CODE.backspace) {
        clearTimer();
      } else if (code === aria.EVENT_CODE.esc) {
        if (visible.value) {
          close();
        }
      } else {
        startTimer();
      }
    }
    vue.onMounted(() => {
      startTimer();
      visible.value = true;
    });
    core.useEventListener(document, "keydown", onKeydown);
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
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "el-notification-fade",
    onBeforeLeave: _ctx.onClose,
    onAfterLeave: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("destroy"))
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createElementVNode("div", {
        id: _ctx.id,
        class: vue.normalizeClass(["el-notification", _ctx.customClass, _ctx.horizontalClass]),
        style: vue.normalizeStyle(_ctx.positionStyle),
        role: "alert",
        onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.clearTimer && _ctx.clearTimer(...args)),
        onMouseleave: _cache[2] || (_cache[2] = (...args) => _ctx.startTimer && _ctx.startTimer(...args)),
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.onClick && _ctx.onClick(...args))
      }, [
        _ctx.type || _ctx.iconClass ? (vue.openBlock(), vue.createElementBlock("i", {
          key: 0,
          class: vue.normalizeClass(["el-notification__icon", [_ctx.typeClass, _ctx.iconClass]])
        }, null, 2)) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("div", {
          class: vue.normalizeClass(["el-notification__group", { "is-with-icon": _ctx.typeClass || _ctx.iconClass }])
        }, [
          vue.createElementVNode("h2", {
            class: "el-notification__title",
            textContent: vue.toDisplayString(_ctx.title)
          }, null, 8, _hoisted_2),
          vue.withDirectives(vue.createElementVNode("div", {
            class: "el-notification__content",
            style: vue.normalizeStyle(!!_ctx.title ? void 0 : { margin: 0 })
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              !_ctx.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_3, vue.toDisplayString(_ctx.message), 1)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                vue.createCommentVNode(" Caution here, message could've been compromized, nerver use user's input as message "),
                vue.createCommentVNode(" eslint-disable-next-line "),
                vue.createElementVNode("p", { innerHTML: _ctx.message }, null, 8, _hoisted_4)
              ], 2112))
            ])
          ], 4), [
            [vue.vShow, _ctx.message]
          ]),
          _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: "el-notification__closeBtn el-icon-close",
            onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.close && _ctx.close(...args), ["stop"]))
          })) : vue.createCommentVNode("v-if", true)
        ], 2)
      ], 46, _hoisted_1), [
        [vue.vShow, _ctx.visible]
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
  if (isServer__default["default"])
    return { close: () => void 0 };
  if (typeof options === "string" || util.isVNode(options)) {
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
    zIndex: PopupManager__default["default"].nextZIndex(),
    offset: verticalOffset
  }, options), {
    id,
    onClose: () => {
      close(id, position, userOnClose);
    }
  });
  const container = document.createElement("div");
  const vm = vue.createVNode(script, props, util.isVNode(props.message) ? {
    default: () => props.message
  } : null);
  vm.props.onDestroy = () => {
    vue.render(null, container);
  };
  vue.render(vm, container);
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
    if (typeof options === "string" || util.isVNode(options)) {
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

const ElNotification = withInstall.withInstallFunction(notify, "$notify");

exports.ElNotification = ElNotification;
exports["default"] = ElNotification;
exports.notificationEmits = notificationEmits;
exports.notificationProps = notificationProps;
exports.notificationTypes = notificationTypes;
