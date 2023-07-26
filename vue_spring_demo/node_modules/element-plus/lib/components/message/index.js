'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var util = require('element-plus/lib/utils/util');
var PopupManager = require('element-plus/lib/utils/popup-manager');
var isServer = require('element-plus/lib/utils/isServer');
var core = require('@vueuse/core');
var aria = require('element-plus/lib/utils/aria');
var props = require('element-plus/lib/utils/props');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var PopupManager__default = /*#__PURE__*/_interopDefaultLegacy(PopupManager);
var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);

const messageTypes = ["success", "info", "warning", "error"];
const messageProps = props.buildProps({
  customClass: {
    type: String,
    default: ""
  },
  center: {
    type: Boolean,
    default: false
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3e3
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
  onClose: {
    type: props.definePropType(Function),
    required: false
  },
  showClose: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    values: messageTypes,
    default: "info"
  },
  offset: {
    type: Number,
    default: 20
  },
  zIndex: {
    type: Number,
    default: 0
  }
});
const messageEmits = {
  destroy: () => true
};

const typeMap = {
  success: "el-icon-success",
  info: "el-icon-info",
  warning: "el-icon-warning",
  error: "el-icon-error"
};
var script = vue.defineComponent({
  name: "ElMessage",
  props: messageProps,
  emits: messageEmits,
  setup(props) {
    const visible = vue.ref(false);
    let timer = void 0;
    const typeClass = vue.computed(() => {
      var _a;
      return props.iconClass ? props.iconClass : (_a = typeMap[props.type]) != null ? _a : "";
    });
    const customStyle = vue.computed(() => ({
      top: `${props.offset}px`,
      zIndex: props.zIndex
    }));
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
    function keydown({ code }) {
      if (code === aria.EVENT_CODE.esc) {
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
    core.useEventListener(document, "keydown", keydown);
    return {
      typeClass,
      customStyle,
      visible,
      close,
      clearTimer,
      startTimer
    };
  }
});

const _hoisted_1 = ["id"];
const _hoisted_2 = {
  key: 0,
  class: "el-message__content"
};
const _hoisted_3 = ["innerHTML"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "el-message-fade",
    onBeforeLeave: _ctx.onClose,
    onAfterLeave: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("destroy"))
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createElementVNode("div", {
        id: _ctx.id,
        class: vue.normalizeClass([
          "el-message",
          _ctx.type && !_ctx.iconClass ? `el-message--${_ctx.type}` : "",
          _ctx.center ? "is-center" : "",
          _ctx.showClose ? "is-closable" : "",
          _ctx.customClass
        ]),
        style: vue.normalizeStyle(_ctx.customStyle),
        role: "alert",
        onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.clearTimer && _ctx.clearTimer(...args)),
        onMouseleave: _cache[2] || (_cache[2] = (...args) => _ctx.startTimer && _ctx.startTimer(...args))
      }, [
        _ctx.type || _ctx.iconClass ? (vue.openBlock(), vue.createElementBlock("i", {
          key: 0,
          class: vue.normalizeClass(["el-message__icon", _ctx.typeClass, _ctx.iconClass])
        }, null, 2)) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          !_ctx.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_2, vue.toDisplayString(_ctx.message), 1)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
            vue.createElementVNode("p", {
              class: "el-message__content",
              innerHTML: _ctx.message
            }, null, 8, _hoisted_3)
          ], 2112))
        ]),
        _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: "el-message__closeBtn el-icon-close",
          onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.close && _ctx.close(...args), ["stop"]))
        })) : vue.createCommentVNode("v-if", true)
      ], 46, _hoisted_1), [
        [vue.vShow, _ctx.visible]
      ])
    ]),
    _: 3
  }, 8, ["onBeforeLeave"]);
}

script.render = render;
script.__file = "packages/components/message/src/message.vue";

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
const instances = [];
let seed = 1;
const message = function(options = {}) {
  if (isServer__default["default"])
    return { close: () => void 0 };
  if (typeof options === "string" || util.isVNode(options)) {
    options = { message: options };
  }
  let verticalOffset = options.offset || 20;
  instances.forEach(({ vm: vm2 }) => {
    var _a;
    verticalOffset += (((_a = vm2.el) == null ? void 0 : _a.offsetHeight) || 0) + 16;
  });
  verticalOffset += 16;
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const props = __spreadProps(__spreadValues({
    zIndex: PopupManager__default["default"].nextZIndex(),
    offset: verticalOffset
  }, options), {
    id,
    onClose: () => {
      close(id, userOnClose);
    }
  });
  const container = document.createElement("div");
  container.className = `container_${id}`;
  const message2 = props.message;
  const vm = vue.createVNode(script, props, util.isVNode(props.message) ? { default: () => message2 } : null);
  vm.props.onDestroy = () => {
    vue.render(null, container);
  };
  vue.render(vm, container);
  instances.push({ vm });
  document.body.appendChild(container.firstElementChild);
  return {
    close: () => vm.component.proxy.visible = false
  };
};
messageTypes.forEach((type) => {
  message[type] = (options = {}) => {
    if (typeof options === "string" || util.isVNode(options)) {
      options = {
        message: options
      };
    }
    return message(__spreadProps(__spreadValues({}, options), {
      type
    }));
  };
});
function close(id, userOnClose) {
  const idx = instances.findIndex(({ vm: vm2 }) => id === vm2.component.props.id);
  if (idx === -1)
    return;
  const { vm } = instances[idx];
  if (!vm)
    return;
  userOnClose == null ? void 0 : userOnClose(vm);
  const removedHeight = vm.el.offsetHeight;
  instances.splice(idx, 1);
  const len = instances.length;
  if (len < 1)
    return;
  for (let i = idx; i < len; i++) {
    const pos = parseInt(instances[i].vm.el.style["top"], 10) - removedHeight - 16;
    instances[i].vm.component.props.offset = pos;
  }
}
function closeAll() {
  var _a;
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].vm.component;
    (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.close();
  }
}
message.closeAll = closeAll;

const ElMessage = withInstall.withInstallFunction(message, "$message");

exports.ElMessage = ElMessage;
exports["default"] = ElMessage;
exports.messageEmits = messageEmits;
exports.messageProps = messageProps;
exports.messageTypes = messageTypes;
