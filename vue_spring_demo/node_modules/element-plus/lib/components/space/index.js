'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var shared = require('@vue/shared');
var vnode = require('element-plus/lib/utils/vnode');
var util = require('element-plus/lib/utils/util');
var props = require('element-plus/lib/utils/props');

const spaceItem = props.buildProps({
  prefixCls: {
    type: String,
    default: "el-space"
  }
});
var script = vue.defineComponent({
  props: spaceItem,
  setup(props) {
    const classes = vue.computed(() => [`${props.prefixCls}__item`]);
    return {
      classes
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.classes)
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 2);
}

script.render = render;
script.__file = "packages/components/space/src/item.vue";

const SIZE_MAP = {
  mini: 4,
  small: 8,
  medium: 12,
  large: 16
};
function useSpace(props) {
  const classes = vue.computed(() => [
    "el-space",
    `el-space--${props.direction}`,
    props.class
  ]);
  const horizontalSize = vue.ref(0);
  const verticalSize = vue.ref(0);
  const containerStyle = vue.computed(() => {
    const wrapKls = props.wrap || props.fill ? { flexWrap: "wrap", marginBottom: `-${verticalSize.value}px` } : {};
    const alignment = {
      alignItems: props.alignment
    };
    return [wrapKls, alignment, props.style];
  });
  const itemStyle = vue.computed(() => {
    const itemBaseStyle = {
      paddingBottom: `${verticalSize.value}px`,
      marginRight: `${horizontalSize.value}px`
    };
    const fillStyle = props.fill ? { flexGrow: 1, minWidth: `${props.fillRatio}%` } : {};
    return [itemBaseStyle, fillStyle];
  });
  vue.watchEffect(() => {
    const { size = "small", wrap, direction: dir, fill } = props;
    if (Array.isArray(size)) {
      const [h = 0, v = 0] = size;
      horizontalSize.value = h;
      verticalSize.value = v;
    } else {
      let val;
      if (util.isNumber(size)) {
        val = size;
      } else {
        val = SIZE_MAP[size] || SIZE_MAP.small;
      }
      if ((wrap || fill) && dir === "horizontal") {
        horizontalSize.value = verticalSize.value = val;
      } else {
        if (dir === "horizontal") {
          horizontalSize.value = val;
          verticalSize.value = 0;
        } else {
          verticalSize.value = val;
          horizontalSize.value = 0;
        }
      }
    }
  });
  return {
    classes,
    containerStyle,
    itemStyle
  };
}

const spaceProps = props.buildProps({
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  class: {
    type: props.definePropType([
      String,
      Object,
      Array
    ]),
    default: ""
  },
  style: {
    type: props.definePropType([String, Array, Object]),
    default: ""
  },
  alignment: {
    type: props.definePropType(String),
    default: "center"
  },
  prefixCls: {
    type: String
  },
  spacer: {
    type: props.definePropType([Object, String, Number, Array]),
    default: null,
    validator: (val) => vue.isVNode(val) || util.isNumber(val) || shared.isString(val)
  },
  wrap: {
    type: Boolean,
    default: false
  },
  fill: {
    type: Boolean,
    default: false
  },
  fillRatio: {
    type: Number,
    default: 100
  },
  size: {
    type: [String, Array, Number],
    values: props.componentSize,
    validator: (val) => {
      return util.isNumber(val) || util.isArray(val) && val.length === 2 && val.every((i) => util.isNumber(i));
    }
  }
});
var Space = vue.defineComponent({
  name: "ElSpace",
  props: spaceProps,
  setup(props, { slots }) {
    const { classes, containerStyle, itemStyle } = useSpace(props);
    return () => {
      var _a;
      const { spacer, prefixCls, direction } = props;
      const children = vue.renderSlot(slots, "default", { key: 0 }, () => []);
      if (((_a = children.children) != null ? _a : []).length === 0)
        return null;
      if (util.isArray(children.children)) {
        let extractedChildren = [];
        children.children.forEach((child, loopKey) => {
          if (vnode.isFragment(child)) {
            if (util.isArray(child.children)) {
              child.children.forEach((nested, key) => {
                extractedChildren.push(vue.createVNode(script, {
                  style: itemStyle.value,
                  prefixCls,
                  key: `nested-${key}`
                }, {
                  default: () => [nested]
                }, vnode.PatchFlags.PROPS | vnode.PatchFlags.STYLE, ["style", "prefixCls"]));
              });
            }
          } else if (vnode.isValidElementNode(child)) {
            extractedChildren.push(vue.createVNode(script, {
              style: itemStyle.value,
              prefixCls,
              key: `LoopKey${loopKey}`
            }, {
              default: () => [child]
            }, vnode.PatchFlags.PROPS | vnode.PatchFlags.STYLE, ["style", "prefixCls"]));
          }
        });
        if (spacer) {
          const len = extractedChildren.length - 1;
          extractedChildren = extractedChildren.reduce((acc, child, idx) => {
            const children2 = [...acc, child];
            if (idx !== len) {
              children2.push(vue.createVNode("span", {
                style: [
                  itemStyle.value,
                  direction === "vertical" ? "width: 100%" : null
                ],
                key: idx
              }, [
                vue.isVNode(spacer) ? spacer : vue.createTextVNode(spacer, vnode.PatchFlags.TEXT)
              ], vnode.PatchFlags.STYLE));
            }
            return children2;
          }, []);
        }
        return vue.createVNode("div", {
          class: classes.value,
          style: containerStyle.value
        }, extractedChildren, vnode.PatchFlags.STYLE | vnode.PatchFlags.CLASS);
      }
      return children.children;
    };
  }
});

const ElSpace = withInstall.withInstall(Space);

exports.ElSpace = ElSpace;
exports["default"] = ElSpace;
exports.spaceProps = spaceProps;
exports.useSpace = useSpace;
