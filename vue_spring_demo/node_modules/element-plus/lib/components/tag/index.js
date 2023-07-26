'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var util = require('element-plus/lib/utils/util');
var props = require('element-plus/lib/utils/props');

const tagProps = props.buildProps({
  closable: Boolean,
  type: {
    type: String,
    values: ["success", "info", "warning", "danger", ""],
    default: ""
  },
  hit: Boolean,
  disableTransitions: Boolean,
  color: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    values: ["medium", "small", "mini"]
  },
  effect: {
    type: String,
    values: ["dark", "light", "plain"],
    default: "light"
  }
});
const tagEmits = {
  close: (evt) => evt instanceof MouseEvent,
  click: (evt) => evt instanceof MouseEvent
};

var script = vue.defineComponent({
  name: "ElTag",
  props: tagProps,
  emits: tagEmits,
  setup(props, { emit }) {
    const ELEMENT = util.useGlobalConfig();
    const tagSize = vue.computed(() => props.size || ELEMENT.size);
    const classes = vue.computed(() => {
      const { type, hit, effect } = props;
      return [
        "el-tag",
        type ? `el-tag--${type}` : "",
        tagSize.value ? `el-tag--${tagSize.value}` : "",
        effect ? `el-tag--${effect}` : "",
        hit && "is-hit"
      ];
    });
    const handleClose = (event) => {
      event.stopPropagation();
      emit("close", event);
    };
    const handleClick = (event) => {
      emit("click", event);
    };
    return {
      classes,
      handleClose,
      handleClick
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return !_ctx.disableTransitions ? (vue.openBlock(), vue.createElementBlock("span", {
    key: 0,
    class: vue.normalizeClass(_ctx.classes),
    style: vue.normalizeStyle({ backgroundColor: _ctx.color }),
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    vue.renderSlot(_ctx.$slots, "default"),
    _ctx.closable ? (vue.openBlock(), vue.createElementBlock("i", {
      key: 0,
      class: "el-tag__close el-icon-close",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
    })) : vue.createCommentVNode("v-if", true)
  ], 6)) : (vue.openBlock(), vue.createBlock(vue.Transition, {
    key: 1,
    name: "el-zoom-in-center"
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("span", {
        class: vue.normalizeClass(_ctx.classes),
        style: vue.normalizeStyle({ backgroundColor: _ctx.color }),
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default"),
        _ctx.closable ? (vue.openBlock(), vue.createElementBlock("i", {
          key: 0,
          class: "el-tag__close el-icon-close",
          onClick: _cache[2] || (_cache[2] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
        })) : vue.createCommentVNode("v-if", true)
      ], 6)
    ]),
    _: 3
  }));
}

script.render = render;
script.__file = "packages/components/tag/src/tag.vue";

const ElTag = withInstall.withInstall(script);

exports.ElTag = ElTag;
exports["default"] = ElTag;
exports.tagEmits = tagEmits;
exports.tagProps = tagProps;
