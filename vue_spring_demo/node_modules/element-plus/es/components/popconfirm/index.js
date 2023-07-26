import { withInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, ref, computed, resolveComponent, openBlock, createBlock, withCtx, renderSlot, createElementVNode, createElementBlock, normalizeClass, normalizeStyle, createCommentVNode, createTextVNode, toDisplayString, createVNode } from 'vue';
import ElButton, { buttonType } from 'element-plus/es/components/button';
import ElPopper, { Effect } from 'element-plus/es/components/popper';
import { useLocaleInject } from 'element-plus/es/hooks';
import { buildProps } from 'element-plus/es/utils/props';

const popconfirmProps = buildProps({
  title: {
    type: String
  },
  confirmButtonText: {
    type: String
  },
  cancelButtonText: {
    type: String
  },
  confirmButtonType: {
    type: String,
    values: buttonType,
    default: "primary"
  },
  cancelButtonType: {
    type: String,
    values: buttonType,
    default: "text"
  },
  icon: {
    type: String,
    default: "el-icon-question"
  },
  iconColor: {
    type: String,
    default: "#f90"
  },
  hideIcon: {
    type: Boolean,
    default: false
  }
});
const popconfirmEmits = {
  confirm: () => true,
  cancel: () => true
};

var script = defineComponent({
  name: "ElPopconfirm",
  components: {
    ElButton,
    ElPopper
  },
  props: popconfirmProps,
  emits: popconfirmEmits,
  setup(props, { emit }) {
    const { t } = useLocaleInject();
    const visible = ref(false);
    const confirm = () => {
      visible.value = false;
      emit("confirm");
    };
    const cancel = () => {
      visible.value = false;
      emit("cancel");
    };
    const finalConfirmButtonText = computed(() => props.confirmButtonText || t("el.popconfirm.confirmButtonText"));
    const finalCancelButtonText = computed(() => props.cancelButtonText || t("el.popconfirm.cancelButtonText"));
    return {
      Effect,
      visible,
      finalConfirmButtonText,
      finalCancelButtonText,
      confirm,
      cancel
    };
  }
});

const _hoisted_1 = { class: "el-popconfirm" };
const _hoisted_2 = { class: "el-popconfirm__main" };
const _hoisted_3 = { class: "el-popconfirm__action" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");
  const _component_el_popper = resolveComponent("el-popper");
  return openBlock(), createBlock(_component_el_popper, {
    visible: _ctx.visible,
    "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => _ctx.visible = $event),
    trigger: "click",
    effect: _ctx.Effect.LIGHT,
    "popper-class": "el-popover",
    "append-to-body": "",
    "fallback-placements": ["bottom", "top", "right", "left"]
  }, {
    trigger: withCtx(() => [
      renderSlot(_ctx.$slots, "reference")
    ]),
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1, [
        createElementVNode("p", _hoisted_2, [
          !_ctx.hideIcon ? (openBlock(), createElementBlock("i", {
            key: 0,
            class: normalizeClass([_ctx.icon, "el-popconfirm__icon"]),
            style: normalizeStyle({ color: _ctx.iconColor })
          }, null, 6)) : createCommentVNode("v-if", true),
          createTextVNode(" " + toDisplayString(_ctx.title), 1)
        ]),
        createElementVNode("div", _hoisted_3, [
          createVNode(_component_el_button, {
            size: "mini",
            type: _ctx.cancelButtonType,
            onClick: _ctx.cancel
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.finalCancelButtonText), 1)
            ]),
            _: 1
          }, 8, ["type", "onClick"]),
          createVNode(_component_el_button, {
            size: "mini",
            type: _ctx.confirmButtonType,
            onClick: _ctx.confirm
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.finalConfirmButtonText), 1)
            ]),
            _: 1
          }, 8, ["type", "onClick"])
        ])
      ])
    ]),
    _: 3
  }, 8, ["visible", "effect"]);
}

script.render = render;
script.__file = "packages/components/popconfirm/src/popconfirm.vue";

const ElPopconfirm = withInstall(script);

export { ElPopconfirm, ElPopconfirm as default, popconfirmEmits, popconfirmProps };
