'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withInstall = require('element-plus/lib/utils/with-install');
var vue = require('vue');
var constants = require('element-plus/lib/utils/constants');

var script$1 = vue.defineComponent({
  name: "ElSteps",
  props: {
    space: {
      type: [Number, String],
      default: ""
    },
    active: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: "horizontal",
      validator: (val) => ["horizontal", "vertical"].includes(val)
    },
    alignCenter: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    finishStatus: {
      type: String,
      default: "finish",
      validator: (val) => ["wait", "process", "finish", "error", "success"].includes(val)
    },
    processStatus: {
      type: String,
      default: "process",
      validator: (val) => ["wait", "process", "finish", "error", "success"].includes(val)
    }
  },
  emits: [constants.CHANGE_EVENT],
  setup(props, { emit }) {
    const steps = vue.ref([]);
    vue.watch(steps, () => {
      steps.value.forEach((instance, index) => {
        instance.setIndex(index);
      });
    });
    vue.provide("ElSteps", { props, steps });
    vue.watch(() => props.active, (newVal, oldVal) => {
      emit(constants.CHANGE_EVENT, newVal, oldVal);
    });
    return {
      steps
    };
  }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass([
      "el-steps",
      _ctx.simple ? "el-steps--simple" : `el-steps--${_ctx.direction}`
    ])
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 2);
}

script$1.render = render$1;
script$1.__file = "packages/components/steps/src/index.vue";

var script = vue.defineComponent({
  name: "ElStep",
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "",
      validator: (val) => ["", "wait", "process", "finish", "error", "success"].includes(val)
    }
  },
  setup(props) {
    const index = vue.ref(-1);
    const lineStyle = vue.ref({});
    const internalStatus = vue.ref("");
    const parent = vue.inject("ElSteps");
    const currentInstance = vue.getCurrentInstance();
    vue.onMounted(() => {
      vue.watch([
        () => parent.props.active,
        () => parent.props.processStatus,
        () => parent.props.finishStatus
      ], ([active]) => {
        updateStatus(active);
      }, { immediate: true });
    });
    vue.onBeforeUnmount(() => {
      parent.steps.value = parent.steps.value.filter((instance) => instance.uid !== currentInstance.uid);
    });
    const currentStatus = vue.computed(() => {
      return props.status || internalStatus.value;
    });
    const prevStatus = vue.computed(() => {
      const prevStep = parent.steps.value[index.value - 1];
      return prevStep ? prevStep.currentStatus : "wait";
    });
    const isCenter = vue.computed(() => {
      return parent.props.alignCenter;
    });
    const isVertical = vue.computed(() => {
      return parent.props.direction === "vertical";
    });
    const isSimple = vue.computed(() => {
      return parent.props.simple;
    });
    const stepsCount = vue.computed(() => {
      return parent.steps.value.length;
    });
    const isLast = vue.computed(() => {
      var _a;
      return ((_a = parent.steps.value[stepsCount.value - 1]) == null ? void 0 : _a.uid) === currentInstance.uid;
    });
    const space = vue.computed(() => {
      return isSimple.value ? "" : parent.props.space;
    });
    const style = vue.computed(() => {
      const style2 = {
        flexBasis: typeof space.value === "number" ? `${space.value}px` : space.value ? space.value : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%`
      };
      if (isVertical.value)
        return style2;
      if (isLast.value) {
        style2.maxWidth = `${100 / stepsCount.value}%`;
      }
      return style2;
    });
    const setIndex = (val) => {
      index.value = val;
    };
    const calcProgress = (status) => {
      let step = 100;
      const style2 = {};
      style2.transitionDelay = `${150 * index.value}ms`;
      if (status === parent.props.processStatus) {
        step = 0;
      } else if (status === "wait") {
        step = 0;
        style2.transitionDelay = `${-150 * index.value}ms`;
      }
      style2.borderWidth = step && !isSimple.value ? "1px" : 0;
      style2[parent.props.direction === "vertical" ? "height" : "width"] = `${step}%`;
      lineStyle.value = style2;
    };
    const updateStatus = (activeIndex) => {
      if (activeIndex > index.value) {
        internalStatus.value = parent.props.finishStatus;
      } else if (activeIndex === index.value && prevStatus.value !== "error") {
        internalStatus.value = parent.props.processStatus;
      } else {
        internalStatus.value = "wait";
      }
      const prevChild = parent.steps.value[stepsCount.value - 1];
      if (prevChild)
        prevChild.calcProgress(internalStatus.value);
    };
    const stepItemState = vue.reactive({
      uid: vue.computed(() => currentInstance.uid),
      currentStatus,
      setIndex,
      calcProgress
    });
    parent.steps.value = [...parent.steps.value, stepItemState];
    return {
      index,
      lineStyle,
      currentStatus,
      isCenter,
      isVertical,
      isSimple,
      isLast,
      space,
      style,
      parent,
      setIndex,
      calcProgress,
      updateStatus
    };
  }
});

const _hoisted_1 = { class: "el-step__line" };
const _hoisted_2 = {
  key: 1,
  class: "el-step__icon-inner"
};
const _hoisted_3 = { class: "el-step__main" };
const _hoisted_4 = {
  key: 0,
  class: "el-step__arrow"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    style: vue.normalizeStyle(_ctx.style),
    class: vue.normalizeClass([
      "el-step",
      _ctx.isSimple ? "is-simple" : `is-${_ctx.parent.props.direction}`,
      _ctx.isLast && !_ctx.space && !_ctx.isCenter && "is-flex",
      _ctx.isCenter && !_ctx.isVertical && !_ctx.isSimple && "is-center"
    ])
  }, [
    vue.createCommentVNode(" icon & line "),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(["el-step__head", `is-${_ctx.currentStatus}`])
    }, [
      vue.createElementVNode("div", _hoisted_1, [
        vue.createElementVNode("i", {
          class: "el-step__line-inner",
          style: vue.normalizeStyle(_ctx.lineStyle)
        }, null, 4)
      ]),
      vue.createElementVNode("div", {
        class: vue.normalizeClass(["el-step__icon", `is-${_ctx.icon ? "icon" : "text"}`])
      }, [
        _ctx.currentStatus !== "success" && _ctx.currentStatus !== "error" ? vue.renderSlot(_ctx.$slots, "icon", { key: 0 }, () => [
          _ctx.icon ? (vue.openBlock(), vue.createElementBlock("i", {
            key: 0,
            class: vue.normalizeClass(["el-step__icon-inner", _ctx.icon])
          }, null, 2)) : vue.createCommentVNode("v-if", true),
          !_ctx.icon && !_ctx.isSimple ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, vue.toDisplayString(_ctx.index + 1), 1)) : vue.createCommentVNode("v-if", true)
        ]) : (vue.openBlock(), vue.createElementBlock("i", {
          key: 1,
          class: vue.normalizeClass([
            "el-step__icon-inner",
            "is-status",
            `el-icon-${_ctx.currentStatus === "success" ? "check" : "close"}`
          ])
        }, null, 2))
      ], 2)
    ], 2),
    vue.createCommentVNode(" title & description "),
    vue.createElementVNode("div", _hoisted_3, [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(["el-step__title", `is-${_ctx.currentStatus}`])
      }, [
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.title), 1)
        ])
      ], 2),
      _ctx.isSimple ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4)) : (vue.openBlock(), vue.createElementBlock("div", {
        key: 1,
        class: vue.normalizeClass(["el-step__description", `is-${_ctx.currentStatus}`])
      }, [
        vue.renderSlot(_ctx.$slots, "description", {}, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.description), 1)
        ])
      ], 2))
    ])
  ], 6);
}

script.render = render;
script.__file = "packages/components/steps/src/item.vue";

const ElSteps = withInstall.withInstall(script$1, {
  Step: script
});
const ElStep = withInstall.withNoopInstall(script);

exports.ElStep = ElStep;
exports.ElSteps = ElSteps;
exports["default"] = ElSteps;
