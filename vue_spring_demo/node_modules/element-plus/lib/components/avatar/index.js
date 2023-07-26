'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var props = require('element-plus/lib/utils/props');

const avatarProps = props.buildProps({
  size: {
    type: [Number, String],
    values: ["large", "medium", "small"],
    default: "large",
    validator: (val) => typeof val === "number"
  },
  shape: {
    type: String,
    values: ["circle", "square"],
    default: "circle"
  },
  icon: String,
  src: {
    type: String,
    default: ""
  },
  alt: String,
  srcSet: String,
  fit: {
    type: props.definePropType(String),
    default: "cover"
  }
});
const avatarEmits = {
  error: (evt) => evt instanceof Event
};

var script = vue.defineComponent({
  name: "ElAvatar",
  props: avatarProps,
  emits: avatarEmits,
  setup(props, { emit }) {
    const hasLoadError = vue.ref(false);
    const avatarClass = vue.computed(() => {
      const { size, icon, shape } = props;
      const classList = ["el-avatar"];
      if (size && typeof size === "string")
        classList.push(`el-avatar--${size}`);
      if (icon)
        classList.push("el-avatar--icon");
      if (shape)
        classList.push(`el-avatar--${shape}`);
      return classList;
    });
    const sizeStyle = vue.computed(() => {
      const { size } = props;
      return typeof size === "number" ? {
        height: `${size}px`,
        width: `${size}px`,
        lineHeight: `${size}px`
      } : {};
    });
    const fitStyle = vue.computed(() => ({
      objectFit: props.fit
    }));
    vue.watch(() => props.src, () => hasLoadError.value = false);
    function handleError(e) {
      hasLoadError.value = true;
      emit("error", e);
    }
    return {
      hasLoadError,
      avatarClass,
      sizeStyle,
      fitStyle,
      handleError
    };
  }
});

const _hoisted_1 = ["src", "alt", "srcset"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("span", {
    class: vue.normalizeClass(_ctx.avatarClass),
    style: vue.normalizeStyle(_ctx.sizeStyle)
  }, [
    (_ctx.src || _ctx.srcSet) && !_ctx.hasLoadError ? (vue.openBlock(), vue.createElementBlock("img", {
      key: 0,
      src: _ctx.src,
      alt: _ctx.alt,
      srcset: _ctx.srcSet,
      style: vue.normalizeStyle(_ctx.fitStyle),
      onError: _cache[0] || (_cache[0] = (...args) => _ctx.handleError && _ctx.handleError(...args))
    }, null, 44, _hoisted_1)) : _ctx.icon ? (vue.openBlock(), vue.createElementBlock("i", {
      key: 1,
      class: vue.normalizeClass(_ctx.icon)
    }, null, 2)) : vue.renderSlot(_ctx.$slots, "default", { key: 2 })
  ], 6);
}

script.render = render;
script.__file = "packages/components/avatar/src/avatar.vue";

const ElAvatar = withInstall.withInstall(script);

exports.ElAvatar = ElAvatar;
exports.avatarEmits = avatarEmits;
exports.avatarProps = avatarProps;
exports["default"] = ElAvatar;
