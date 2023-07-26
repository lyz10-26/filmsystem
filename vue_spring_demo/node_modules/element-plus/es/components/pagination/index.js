import { withInstall } from 'element-plus/es/utils/with-install';
import { defineComponent, computed, openBlock, createElementBlock, toDisplayString, inject, ref, watch, resolveComponent, createVNode, withCtx, Fragment, renderList, createBlock, createTextVNode, watchEffect, withKeys, normalizeClass, createCommentVNode, getCurrentInstance, provide, h } from 'vue';
import { useLocaleInject } from 'element-plus/es/hooks';
import { debugWarn } from 'element-plus/es/utils/error';
import { buildProps, definePropType, mutable } from 'element-plus/es/utils/props';
import { elPaginationKey } from 'element-plus/es/tokens';
import isEqual from 'lodash/isEqual';
import { ElSelect, ElOption } from 'element-plus/es/components/select';
import ElInput from 'element-plus/es/components/input';

const paginationPrevProps = {
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  prevText: {
    type: String,
    default: ""
  }
};
var script$5 = defineComponent({
  name: "ElPaginationPrev",
  props: paginationPrevProps,
  emits: ["click"],
  setup(props) {
    const internalDisabled = computed(() => props.disabled || props.currentPage <= 1);
    return {
      internalDisabled
    };
  }
});

const _hoisted_1$5 = ["disabled", "aria-disabled"];
const _hoisted_2$2 = { key: 0 };
const _hoisted_3$2 = {
  key: 1,
  class: "el-icon el-icon-arrow-left"
};
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    type: "button",
    class: "btn-prev",
    disabled: _ctx.internalDisabled,
    "aria-disabled": _ctx.internalDisabled,
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
  }, [
    _ctx.prevText ? (openBlock(), createElementBlock("span", _hoisted_2$2, toDisplayString(_ctx.prevText), 1)) : (openBlock(), createElementBlock("i", _hoisted_3$2))
  ], 8, _hoisted_1$5);
}

script$5.render = render$5;
script$5.__file = "packages/components/pagination/src/components/prev.vue";

const paginationNextProps = {
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    default: 50
  },
  nextText: {
    type: String,
    default: ""
  }
};
var script$4 = defineComponent({
  name: "ElPaginationNext",
  props: paginationNextProps,
  emits: ["click"],
  setup(props) {
    const internalDisabled = computed(() => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0);
    return {
      internalDisabled
    };
  }
});

const _hoisted_1$4 = ["disabled", "aria-disabled"];
const _hoisted_2$1 = { key: 0 };
const _hoisted_3$1 = {
  key: 1,
  class: "el-icon el-icon-arrow-right"
};
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    type: "button",
    class: "btn-next",
    disabled: _ctx.internalDisabled,
    "aria-disabled": _ctx.internalDisabled,
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
  }, [
    _ctx.nextText ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(_ctx.nextText), 1)) : (openBlock(), createElementBlock("i", _hoisted_3$1))
  ], 8, _hoisted_1$4);
}

script$4.render = render$4;
script$4.__file = "packages/components/pagination/src/components/next.vue";

const usePagination = () => inject(elPaginationKey, {});

const paginationSizesProps = buildProps({
  pageSize: {
    type: Number,
    required: true
  },
  pageSizes: {
    type: definePropType(Array),
    default: () => mutable([10, 20, 30, 40, 50, 100])
  },
  popperClass: {
    type: String,
    default: ""
  },
  disabled: Boolean
});
var script$3 = defineComponent({
  name: "ElPaginationSizes",
  components: {
    ElSelect,
    ElOption
  },
  props: paginationSizesProps,
  emits: ["page-size-change"],
  setup(props, { emit }) {
    const { t } = useLocaleInject();
    const pagination = usePagination();
    const innerPageSize = ref(props.pageSize);
    watch(() => props.pageSizes, (newVal, oldVal) => {
      if (isEqual(newVal, oldVal))
        return;
      if (Array.isArray(newVal)) {
        const pageSize = newVal.indexOf(props.pageSize) > -1 ? props.pageSize : props.pageSizes[0];
        emit("page-size-change", pageSize);
      }
    });
    watch(() => props.pageSize, (newVal) => {
      innerPageSize.value = newVal;
    });
    const innerPagesizes = computed(() => props.pageSizes);
    function handleChange(val) {
      var _a;
      if (val !== innerPageSize.value) {
        innerPageSize.value = val;
        (_a = pagination.handleSizeChange) == null ? void 0 : _a.call(pagination, Number(val));
      }
    }
    return {
      innerPagesizes,
      innerPageSize,
      t,
      handleChange
    };
  }
});

const _hoisted_1$3 = { class: "el-pagination__sizes" };
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  return openBlock(), createElementBlock("span", _hoisted_1$3, [
    createVNode(_component_el_select, {
      "model-value": _ctx.innerPageSize,
      disabled: _ctx.disabled,
      "popper-class": _ctx.popperClass,
      size: "mini",
      onChange: _ctx.handleChange
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.innerPagesizes, (item) => {
          return openBlock(), createBlock(_component_el_option, {
            key: item,
            value: item,
            label: item + _ctx.t("el.pagination.pagesize")
          }, null, 8, ["value", "label"]);
        }), 128))
      ]),
      _: 1
    }, 8, ["model-value", "disabled", "popper-class", "onChange"])
  ]);
}

script$3.render = render$3;
script$3.__file = "packages/components/pagination/src/components/sizes.vue";

var script$2 = defineComponent({
  name: "ElPaginationJumper",
  components: {
    ElInput
  },
  setup() {
    const { t } = useLocaleInject();
    const { pageCount, disabled, currentPage, changeEvent } = usePagination();
    const userInput = ref();
    const innerValue = computed(() => {
      var _a;
      return (_a = userInput.value) != null ? _a : currentPage == null ? void 0 : currentPage.value;
    });
    function handleInput(val) {
      userInput.value = +val;
    }
    function handleChange(val) {
      changeEvent == null ? void 0 : changeEvent(+val);
      userInput.value = void 0;
    }
    return {
      pageCount,
      disabled,
      innerValue,
      t,
      handleInput,
      handleChange
    };
  }
});

const _hoisted_1$2 = { class: "el-pagination__jump" };
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  return openBlock(), createElementBlock("span", _hoisted_1$2, [
    createTextVNode(toDisplayString(_ctx.t("el.pagination.goto")) + " ", 1),
    createVNode(_component_el_input, {
      size: "mini",
      class: "el-pagination__editor is-in-pagination",
      min: 1,
      max: _ctx.pageCount,
      disabled: _ctx.disabled,
      "model-value": _ctx.innerValue,
      type: "number",
      "onUpdate:modelValue": _ctx.handleInput,
      onChange: _ctx.handleChange
    }, null, 8, ["max", "disabled", "model-value", "onUpdate:modelValue", "onChange"]),
    createTextVNode(" " + toDisplayString(_ctx.t("el.pagination.pageClassifier")), 1)
  ]);
}

script$2.render = render$2;
script$2.__file = "packages/components/pagination/src/components/jumper.vue";

const paginationTotalProps = {
  total: {
    type: Number,
    default: 1e3
  }
};
var script$1 = defineComponent({
  name: "ElPaginationTotal",
  props: paginationTotalProps,
  setup() {
    const { t } = useLocaleInject();
    return {
      t
    };
  }
});

const _hoisted_1$1 = { class: "el-pagination__total" };
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1$1, toDisplayString(_ctx.t("el.pagination.total", {
    total: _ctx.total
  })), 1);
}

script$1.render = render$1;
script$1.__file = "packages/components/pagination/src/components/total.vue";

const paginationPagerProps = {
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    required: true
  },
  pagerCount: {
    type: Number,
    default: 7
  },
  disabled: Boolean
};
var script = defineComponent({
  name: "ElPaginationPager",
  props: paginationPagerProps,
  emits: ["change"],
  setup(props, { emit }) {
    const showPrevMore = ref(false);
    const showNextMore = ref(false);
    const quicknextIconClass = ref("el-icon-more");
    const quickprevIconClass = ref("el-icon-more");
    const pagers = computed(() => {
      const pagerCount = props.pagerCount;
      const halfPagerCount = (pagerCount - 1) / 2;
      const currentPage = Number(props.currentPage);
      const pageCount = Number(props.pageCount);
      let showPrevMore2 = false;
      let showNextMore2 = false;
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore2 = true;
        }
        if (currentPage < pageCount - halfPagerCount) {
          showNextMore2 = true;
        }
      }
      const array = [];
      if (showPrevMore2 && !showNextMore2) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore2 && showNextMore2) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (showPrevMore2 && showNextMore2) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i);
        }
      }
      return array;
    });
    watchEffect(() => {
      const halfPagerCount = (props.pagerCount - 1) / 2;
      showPrevMore.value = false;
      showNextMore.value = false;
      if (props.pageCount > props.pagerCount) {
        if (props.currentPage > props.pagerCount - halfPagerCount) {
          showPrevMore.value = true;
        }
        if (props.currentPage < props.pageCount - halfPagerCount) {
          showNextMore.value = true;
        }
      }
    });
    watchEffect(() => {
      if (!showPrevMore.value)
        quickprevIconClass.value = "el-icon-more";
    });
    watchEffect(() => {
      if (!showNextMore.value)
        quicknextIconClass.value = "el-icon-more";
    });
    function onMouseenter(direction) {
      if (props.disabled)
        return;
      if (direction === "left") {
        quickprevIconClass.value = "el-icon-d-arrow-left";
      } else {
        quicknextIconClass.value = "el-icon-d-arrow-right";
      }
    }
    function onEnter(e) {
      const target = e.target;
      if (target.tagName.toLowerCase() === "li" && Array.from(target.classList).includes("number")) {
        const newPage = Number(target.textContent);
        if (newPage !== props.currentPage) {
          emit("change", newPage);
        }
      }
    }
    function onPagerClick(event) {
      const target = event.target;
      if (target.tagName.toLowerCase() === "ul" || props.disabled) {
        return;
      }
      let newPage = Number(target.textContent);
      const pageCount = props.pageCount;
      const currentPage = props.currentPage;
      const pagerCountOffset = props.pagerCount - 2;
      if (target.className.includes("more")) {
        if (target.className.includes("quickprev")) {
          newPage = currentPage - pagerCountOffset;
        } else if (target.className.includes("quicknext")) {
          newPage = currentPage + pagerCountOffset;
        }
      }
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }
        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }
      if (newPage !== currentPage) {
        emit("change", newPage);
      }
    }
    return {
      showPrevMore,
      showNextMore,
      quicknextIconClass,
      quickprevIconClass,
      pagers,
      onMouseenter,
      onPagerClick,
      onEnter
    };
  }
});

const _hoisted_1 = ["aria-current"];
const _hoisted_2 = ["aria-current"];
const _hoisted_3 = ["aria-current"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("ul", {
    class: "el-pager",
    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.onPagerClick && _ctx.onPagerClick(...args)),
    onKeyup: _cache[5] || (_cache[5] = withKeys((...args) => _ctx.onEnter && _ctx.onEnter(...args), ["enter"]))
  }, [
    _ctx.pageCount > 0 ? (openBlock(), createElementBlock("li", {
      key: 0,
      class: normalizeClass([{ active: _ctx.currentPage === 1, disabled: _ctx.disabled }, "number"]),
      "aria-current": _ctx.currentPage === 1,
      tabindex: "0"
    }, " 1 ", 10, _hoisted_1)) : createCommentVNode("v-if", true),
    _ctx.showPrevMore ? (openBlock(), createElementBlock("li", {
      key: 1,
      class: normalizeClass(["el-icon more btn-quickprev", [_ctx.quickprevIconClass, { disabled: _ctx.disabled }]]),
      onMouseenter: _cache[0] || (_cache[0] = ($event) => _ctx.onMouseenter("left")),
      onMouseleave: _cache[1] || (_cache[1] = ($event) => _ctx.quickprevIconClass = "el-icon-more")
    }, null, 34)) : createCommentVNode("v-if", true),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pagers, (pager) => {
      return openBlock(), createElementBlock("li", {
        key: pager,
        class: normalizeClass([{ active: _ctx.currentPage === pager, disabled: _ctx.disabled }, "number"]),
        "aria-current": _ctx.currentPage === pager,
        tabindex: "0"
      }, toDisplayString(pager), 11, _hoisted_2);
    }), 128)),
    _ctx.showNextMore ? (openBlock(), createElementBlock("li", {
      key: 2,
      class: normalizeClass(["el-icon more btn-quicknext", [_ctx.quicknextIconClass, { disabled: _ctx.disabled }]]),
      onMouseenter: _cache[2] || (_cache[2] = ($event) => _ctx.onMouseenter("right")),
      onMouseleave: _cache[3] || (_cache[3] = ($event) => _ctx.quicknextIconClass = "el-icon-more")
    }, null, 34)) : createCommentVNode("v-if", true),
    _ctx.pageCount > 1 ? (openBlock(), createElementBlock("li", {
      key: 3,
      class: normalizeClass([{ active: _ctx.currentPage === _ctx.pageCount, disabled: _ctx.disabled }, "number"]),
      "aria-current": _ctx.currentPage === _ctx.pageCount,
      tabindex: "0"
    }, toDisplayString(_ctx.pageCount), 11, _hoisted_3)) : createCommentVNode("v-if", true)
  ], 32);
}

script.render = render;
script.__file = "packages/components/pagination/src/components/pager.vue";

const isAbsent = (v) => typeof v !== "number";
const paginationProps = buildProps({
  total: Number,
  pageSize: Number,
  defaultPageSize: Number,
  currentPage: Number,
  defaultCurrentPage: Number,
  pageCount: Number,
  pagerCount: {
    type: Number,
    validator: (value) => {
      return typeof value === "number" && (value | 0) === value && value > 4 && value < 22 && value % 2 === 1;
    },
    default: 7
  },
  layout: {
    type: String,
    default: ["prev", "pager", "next", "jumper", "->", "total"].join(", ")
  },
  pageSizes: {
    type: definePropType(Array),
    default: () => mutable([10, 20, 30, 40, 50, 100])
  },
  popperClass: {
    type: String,
    default: ""
  },
  prevText: {
    type: String,
    default: ""
  },
  nextText: {
    type: String,
    default: ""
  },
  small: Boolean,
  background: Boolean,
  disabled: Boolean,
  hideOnSinglePage: Boolean
});
const paginationEmits = {
  "update:current-page": (val) => typeof val === "number",
  "update:page-size": (val) => typeof val === "number",
  "size-change": (val) => typeof val === "number",
  "current-change": (val) => typeof val === "number",
  "prev-click": (val) => typeof val === "number",
  "next-click": (val) => typeof val === "number"
};
const componentName = "ElPagination";
var Pagination = defineComponent({
  name: componentName,
  props: paginationProps,
  emits: paginationEmits,
  setup(props, { emit, slots }) {
    const { t } = useLocaleInject();
    const vnodeProps = getCurrentInstance().vnode.props || {};
    const hasCurrentPageListener = "onUpdate:currentPage" in vnodeProps || "onUpdate:current-page" in vnodeProps || "onCurrentChange" in vnodeProps;
    const hasPageSizeListener = "onUpdate:pageSize" in vnodeProps || "onUpdate:page-size" in vnodeProps || "onSizeChange" in vnodeProps;
    const assertValidUsage = computed(() => {
      if (isAbsent(props.total) && isAbsent(props.pageCount))
        return false;
      if (!isAbsent(props.currentPage) && !hasCurrentPageListener)
        return false;
      if (props.layout.includes("sizes")) {
        if (!isAbsent(props.pageCount)) {
          if (!hasPageSizeListener)
            return false;
        } else if (!isAbsent(props.total)) {
          if (!isAbsent(props.pageSize)) {
            if (!hasPageSizeListener) {
              return false;
            }
          }
        }
      }
      return true;
    });
    const innerPageSize = ref(isAbsent(props.defaultPageSize) ? 10 : props.defaultPageSize);
    const innerCurrentPage = ref(isAbsent(props.defaultCurrentPage) ? 1 : props.defaultCurrentPage);
    const pageSizeBridge = computed({
      get() {
        return isAbsent(props.pageSize) ? innerPageSize.value : props.pageSize;
      },
      set(v) {
        if (isAbsent(props.pageSize)) {
          innerPageSize.value = v;
        }
        if (hasPageSizeListener) {
          emit("update:page-size", v);
          emit("size-change", v);
        }
      }
    });
    const pageCountBridge = computed(() => {
      let pageCount = 0;
      if (!isAbsent(props.pageCount)) {
        pageCount = props.pageCount;
      } else if (!isAbsent(props.total)) {
        pageCount = Math.max(1, Math.ceil(props.total / pageSizeBridge.value));
      }
      return pageCount;
    });
    const currentPageBridge = computed({
      get() {
        return isAbsent(props.currentPage) ? innerCurrentPage.value : props.currentPage;
      },
      set(v) {
        let newCurrentPage = v;
        if (v < 1) {
          newCurrentPage = 1;
        } else if (v > pageCountBridge.value) {
          newCurrentPage = pageCountBridge.value;
        }
        if (isAbsent(props.currentPage)) {
          innerCurrentPage.value = newCurrentPage;
        }
        if (hasCurrentPageListener) {
          emit("update:current-page", newCurrentPage);
          emit("current-change", newCurrentPage);
        }
      }
    });
    watch(pageCountBridge, (val) => {
      if (currentPageBridge.value > val)
        currentPageBridge.value = val;
    });
    function handleCurrentChange(val) {
      currentPageBridge.value = val;
    }
    function handleSizeChange(val) {
      pageSizeBridge.value = val;
      const newPageCount = pageCountBridge.value;
      if (currentPageBridge.value > newPageCount) {
        currentPageBridge.value = newPageCount;
      }
    }
    function prev() {
      if (props.disabled)
        return;
      currentPageBridge.value -= 1;
      emit("prev-click", currentPageBridge.value);
    }
    function next() {
      if (props.disabled)
        return;
      currentPageBridge.value += 1;
      emit("next-click", currentPageBridge.value);
    }
    provide(elPaginationKey, {
      pageCount: pageCountBridge,
      disabled: computed(() => props.disabled),
      currentPage: currentPageBridge,
      changeEvent: handleCurrentChange,
      handleSizeChange
    });
    return () => {
      var _a, _b;
      if (!assertValidUsage.value) {
        debugWarn(componentName, t("el.pagination.deprecationWarning"));
        return null;
      }
      if (!props.layout)
        return null;
      if (props.hideOnSinglePage && pageCountBridge.value <= 1)
        return null;
      const rootChildren = [];
      const rightWrapperChildren = [];
      const rightWrapperRoot = h("div", { class: "el-pagination__rightwrapper" }, rightWrapperChildren);
      const TEMPLATE_MAP = {
        prev: h(script$5, {
          disabled: props.disabled,
          currentPage: currentPageBridge.value,
          prevText: props.prevText,
          onClick: prev
        }),
        jumper: h(script$2),
        pager: h(script, {
          currentPage: currentPageBridge.value,
          pageCount: pageCountBridge.value,
          pagerCount: props.pagerCount,
          onChange: handleCurrentChange,
          disabled: props.disabled
        }),
        next: h(script$4, {
          disabled: props.disabled,
          currentPage: currentPageBridge.value,
          pageCount: pageCountBridge.value,
          nextText: props.nextText,
          onClick: next
        }),
        sizes: h(script$3, {
          pageSize: pageSizeBridge.value,
          pageSizes: props.pageSizes,
          popperClass: props.popperClass,
          disabled: props.disabled
        }),
        slot: (_b = (_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : null,
        total: h(script$1, { total: isAbsent(props.total) ? 0 : props.total })
      };
      const components = props.layout.split(",").map((item) => item.trim());
      let haveRightWrapper = false;
      components.forEach((c) => {
        if (c === "->") {
          haveRightWrapper = true;
          return;
        }
        if (!haveRightWrapper) {
          rootChildren.push(TEMPLATE_MAP[c]);
        } else {
          rightWrapperChildren.push(TEMPLATE_MAP[c]);
        }
      });
      if (haveRightWrapper && rightWrapperChildren.length > 0) {
        rootChildren.unshift(rightWrapperRoot);
      }
      return h("div", {
        role: "pagination",
        "aria-label": "pagination",
        class: [
          "el-pagination",
          {
            "is-background": props.background,
            "el-pagination--small": props.small
          }
        ]
      }, rootChildren);
    };
  }
});

const ElPagination = withInstall(Pagination);

export { ElPagination, ElPagination as default, paginationEmits, paginationProps };
