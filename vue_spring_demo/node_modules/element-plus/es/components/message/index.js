import { withInstallFunction } from 'element-plus/es/utils/with-install';
import { defineComponent, ref, computed, onMounted, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, normalizeStyle, createElementBlock, createCommentVNode, renderSlot, toDisplayString, Fragment, withModifiers, vShow, createVNode, render as render$1 } from 'vue';
import { isVNode } from 'element-plus/es/utils/util';
import PopupManager from 'element-plus/es/utils/popup-manager';
import isServer from 'element-plus/es/utils/isServer';
import { useEventListener, useTimeoutFn } from '@vueuse/core';
import { EVENT_CODE } from 'element-plus/es/utils/aria';
import { buildProps, definePropType } from 'element-plus/es/utils/props';

const messageTypes = ["success", "info", "warning", "error"];
const messageProps = buildProps({
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
    type: definePropType([String, Object]),
    default: ""
  },
  onClose: {
    type: definePropType(Function),
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
var script = defineComponent({
  name: "ElMessage",
  props: messageProps,
  emits: messageEmits,
  setup(props) {
    const visible = ref(false);
    let timer = void 0;
    const typeClass = computed(() => {
      var _a;
      return props.iconClass ? props.iconClass : (_a = typeMap[props.type]) != null ? _a : "";
    });
    const customStyle = computed(() => ({
      top: `${props.offset}px`,
      zIndex: props.zIndex
    }));
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
    function keydown({ code }) {
      if (code === EVENT_CODE.esc) {
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
    useEventListener(document, "keydown", keydown);
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
  return openBlock(), createBlock(Transition, {
    name: "el-message-fade",
    onBeforeLeave: _ctx.onClose,
    onAfterLeave: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("destroy"))
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        id: _ctx.id,
        class: normalizeClass([
          "el-message",
          _ctx.type && !_ctx.iconClass ? `el-message--${_ctx.type}` : "",
          _ctx.center ? "is-center" : "",
          _ctx.showClose ? "is-closable" : "",
          _ctx.customClass
        ]),
        style: normalizeStyle(_ctx.customStyle),
        role: "alert",
        onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.clearTimer && _ctx.clearTimer(...args)),
        onMouseleave: _cache[2] || (_cache[2] = (...args) => _ctx.startTimer && _ctx.startTimer(...args))
      }, [
        _ctx.type || _ctx.iconClass ? (openBlock(), createElementBlock("i", {
          key: 0,
          class: normalizeClass(["el-message__icon", _ctx.typeClass, _ctx.iconClass])
        }, null, 2)) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default", {}, () => [
          !_ctx.dangerouslyUseHTMLString ? (openBlock(), createElementBlock("p", _hoisted_2, toDisplayString(_ctx.message), 1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
            createElementVNode("p", {
              class: "el-message__content",
              innerHTML: _ctx.message
            }, null, 8, _hoisted_3)
          ], 2112))
        ]),
        _ctx.showClose ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "el-message__closeBtn el-icon-close",
          onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.close && _ctx.close(...args), ["stop"]))
        })) : createCommentVNode("v-if", true)
      ], 46, _hoisted_1), [
        [vShow, _ctx.visible]
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
  if (isServer)
    return { close: () => void 0 };
  if (typeof options === "string" || isVNode(options)) {
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
    zIndex: PopupManager.nextZIndex(),
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
  const vm = createVNode(script, props, isVNode(props.message) ? { default: () => message2 } : null);
  vm.props.onDestroy = () => {
    render$1(null, container);
  };
  render$1(vm, container);
  instances.push({ vm });
  document.body.appendChild(container.firstElementChild);
  return {
    close: () => vm.component.proxy.visible = false
  };
};
messageTypes.forEach((type) => {
  message[type] = (options = {}) => {
    if (typeof options === "string" || isVNode(options)) {
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

const ElMessage = withInstallFunction(message, "$message");

export { ElMessage, ElMessage as default, messageEmits, messageProps, messageTypes };
