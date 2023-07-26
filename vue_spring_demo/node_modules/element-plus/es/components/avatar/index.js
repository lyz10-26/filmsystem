import { withInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, ref, computed, watch, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot } from 'vue';
import { buildProps, definePropType } from 'element-plus/es/utils/props';

const avatarProps = buildProps({
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
    type: definePropType(String),
    default: "cover"
  }
});
const avatarEmits = {
  error: (evt) => evt instanceof Event
};

var script = defineComponent({
  name: "ElAvatar",
  props: avatarProps,
  emits: avatarEmits,
  setup(props, { emit }) {
    const hasLoadError = ref(false);
    const avatarClass = computed(() => {
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
    const sizeStyle = computed(() => {
      const { size } = props;
      return typeof size === "number" ? {
        height: `${size}px`,
        width: `${size}px`,
        lineHeight: `${size}px`
      } : {};
    });
    const fitStyle = computed(() => ({
      objectFit: props.fit
    }));
    watch(() => props.src, () => hasLoadError.value = false);
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
  return openBlock(), createElementBlock("span", {
    class: normalizeClass(_ctx.avatarClass),
    style: normalizeStyle(_ctx.sizeStyle)
  }, [
    (_ctx.src || _ctx.srcSet) && !_ctx.hasLoadError ? (openBlock(), createElementBlock("img", {
      key: 0,
      src: _ctx.src,
      alt: _ctx.alt,
      srcset: _ctx.srcSet,
      style: normalizeStyle(_ctx.fitStyle),
      onError: _cache[0] || (_cache[0] = (...args) => _ctx.handleError && _ctx.handleError(...args))
    }, null, 44, _hoisted_1)) : _ctx.icon ? (openBlock(), createElementBlock("i", {
      key: 1,
      class: normalizeClass(_ctx.icon)
    }, null, 2)) : renderSlot(_ctx.$slots, "default", { key: 2 })
  ], 6);
}

script.render = render;
script.__file = "packages/components/avatar/src/avatar.vue";

const ElAvatar = withInstall(script);

export { ElAvatar, avatarEmits, avatarProps, ElAvatar as default };
