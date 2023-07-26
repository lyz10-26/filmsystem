"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePopperHook = exports.usePopperProps = exports.usePopperControlProps = exports.LIGHT_EFFECT = exports.DARK_EFFECT = void 0;
const vue_1 = require("vue");
const shared_1 = require("@vue/shared");
const core_1 = require("@popperjs/core");
const directives_1 = require("element-plus/lib/directives");
const util_1 = require("element-plus/lib/utils/util");
const vnode_1 = require("element-plus/lib/utils/vnode");
const dom_1 = require("element-plus/lib/utils/dom");
const popup_manager_1 = __importDefault(require("element-plus/lib/utils/popup-manager"));
const error_1 = require("element-plus/lib/utils/error");
const use_teleport_1 = __importDefault(require("../use-teleport"));
const use_timeout_1 = __importDefault(require("../use-timeout"));
const use_model_toggle_1 = require("../use-model-toggle");
const use_transition_fallthrough_1 = require("../use-transition-fallthrough");
const use_popper_options_1 = require("./use-popper-options");
const use_target_events_1 = require("./use-target-events");
exports.DARK_EFFECT = 'dark';
exports.LIGHT_EFFECT = 'light';
exports.usePopperControlProps = {
    appendToBody: {
        type: Boolean,
        default: true,
    },
    arrowOffset: {
        type: Number,
    },
    popperOptions: use_popper_options_1.defaultPopperOptions,
    popperClass: {
        type: String,
        default: '',
    },
};
exports.usePopperProps = Object.assign(Object.assign({}, exports.usePopperControlProps), { autoClose: {
        type: Number,
        default: 0,
    }, content: {
        type: String,
        default: '',
    }, class: String, style: Object, hideAfter: {
        type: Number,
        default: 200,
    }, disabled: {
        type: Boolean,
        default: false,
    }, effect: {
        type: String,
        default: exports.DARK_EFFECT,
    }, enterable: {
        type: Boolean,
        default: true,
    }, manualMode: {
        type: Boolean,
        default: false,
    }, showAfter: {
        type: Number,
        default: 0,
    }, pure: {
        type: Boolean,
        default: false,
    }, showArrow: {
        type: Boolean,
        default: true,
    }, transition: {
        type: String,
        default: 'el-fade-in-linear',
    }, trigger: {
        type: [String, Array],
        default: use_target_events_1.DEFAULT_TRIGGER,
    }, visible: {
        type: Boolean,
        default: undefined,
    }, stopPopperMouseEvent: {
        type: Boolean,
        default: true,
    } });
const usePopperHook = () => {
    const vm = (0, vue_1.getCurrentInstance)();
    const props = vm.props;
    const { slots } = vm;
    const arrowRef = (0, vue_1.ref)(null);
    const triggerRef = (0, vue_1.ref)(null);
    const popperRef = (0, vue_1.ref)(null);
    const popperStyle = (0, vue_1.ref)({ zIndex: popup_manager_1.default.nextZIndex() });
    const visible = (0, vue_1.ref)(false);
    const isManual = (0, vue_1.computed)(() => props.manualMode || props.trigger === 'manual');
    const popperId = `el-popper-${(0, util_1.generateId)()}`;
    let popperInstance = null;
    const { renderTeleport, showTeleport, hideTeleport } = (0, use_teleport_1.default)(popupRenderer, (0, vue_1.toRef)(props, 'appendToBody'));
    const { show, hide } = (0, use_model_toggle_1.useModelToggle)({
        indicator: visible,
        onShow,
        onHide,
    });
    const { registerTimeout, cancelTimeout } = (0, use_timeout_1.default)();
    function onShow() {
        popperStyle.value.zIndex = popup_manager_1.default.nextZIndex();
        (0, vue_1.nextTick)(initializePopper);
    }
    function onHide() {
        hideTeleport();
        (0, vue_1.nextTick)(detachPopper);
    }
    function delayShow() {
        if (isManual.value || props.disabled)
            return;
        showTeleport();
        registerTimeout(show, props.showAfter);
    }
    function delayHide() {
        if (isManual.value)
            return;
        registerTimeout(hide, props.hideAfter);
    }
    function onToggle() {
        if (visible.value) {
            delayShow();
        }
        else {
            delayHide();
        }
    }
    function detachPopper() {
        var _a;
        (_a = popperInstance === null || popperInstance === void 0 ? void 0 : popperInstance.destroy) === null || _a === void 0 ? void 0 : _a.call(popperInstance);
        popperInstance = null;
    }
    function onPopperMouseEnter() {
        if (props.enterable && props.trigger !== 'click') {
            cancelTimeout();
        }
    }
    function onPopperMouseLeave() {
        const { trigger } = props;
        const shouldPrevent = ((0, util_1.isString)(trigger) && (trigger === 'click' || trigger === 'focus')) ||
            (trigger.length === 1 &&
                (trigger[0] === 'click' || trigger[0] === 'focus'));
        if (shouldPrevent)
            return;
        delayHide();
    }
    function initializePopper() {
        if (!visible.value || popperInstance !== null) {
            return;
        }
        const unwrappedTrigger = triggerRef.value;
        const $el = (0, util_1.isHTMLElement)(unwrappedTrigger)
            ? unwrappedTrigger
            : unwrappedTrigger.$el;
        popperInstance = (0, core_1.createPopper)($el, popperRef.value, buildPopperOptions());
        popperInstance.update();
    }
    function buildPopperOptions() {
        const modifiers = [...use_popper_options_1.defaultModifiers, ...props.popperOptions.modifiers];
        if (props.showArrow) {
            modifiers.push({
                name: 'arrow',
                options: {
                    padding: props.arrowOffset || 5,
                    element: arrowRef.value,
                },
            });
        }
        return Object.assign(Object.assign({}, props.popperOptions), { modifiers });
    }
    const { onAfterEnter, onAfterLeave, onBeforeEnter, onBeforeLeave } = (0, use_transition_fallthrough_1.useTransitionFallthrough)();
    const events = (0, use_target_events_1.useTargetEvents)(delayShow, delayHide, onToggle);
    const arrowRefAttacher = (0, util_1.refAttacher)(arrowRef);
    const popperRefAttacher = (0, util_1.refAttacher)(popperRef);
    const triggerRefAttacher = (0, util_1.refAttacher)(triggerRef);
    function popupRenderer() {
        const mouseUpAndDown = props.stopPopperMouseEvent ? dom_1.stop : shared_1.NOOP;
        return (0, vue_1.h)(vue_1.Transition, {
            name: props.transition,
            onAfterEnter,
            onAfterLeave,
            onBeforeEnter,
            onBeforeLeave,
        }, {
            default: () => () => visible.value
                ? (0, vue_1.h)('div', {
                    'aria-hidden': false,
                    class: [
                        props.popperClass,
                        'el-popper',
                        `is-${props.effect}`,
                        props.pure ? 'is-pure' : '',
                    ],
                    style: popperStyle.value,
                    id: popperId,
                    ref: popperRefAttacher,
                    role: 'tooltip',
                    onMouseenter: onPopperMouseEnter,
                    onMouseleave: onPopperMouseLeave,
                    onClick: dom_1.stop,
                    onMousedown: mouseUpAndDown,
                    onMouseup: mouseUpAndDown,
                }, [
                    (0, vue_1.renderSlot)(slots, 'default', {}, () => [
                        (0, vue_1.toDisplayString)(props.content),
                    ]),
                    arrowRenderer(),
                ])
                : null,
        });
    }
    function arrowRenderer() {
        return props.showArrow
            ? (0, vue_1.h)('div', {
                ref: arrowRefAttacher,
                class: 'el-popper__arrow',
                'data-popper-arrow': '',
            }, null)
            : null;
    }
    function triggerRenderer(triggerProps) {
        var _a;
        const trigger = (_a = slots.trigger) === null || _a === void 0 ? void 0 : _a.call(slots);
        const firstElement = (0, vnode_1.getFirstValidNode)(trigger, 1);
        if (!firstElement)
            (0, error_1.throwError)('renderTrigger', 'trigger expects single rooted node');
        return (0, vue_1.cloneVNode)(firstElement, triggerProps, true);
    }
    function render() {
        const trigger = triggerRenderer(Object.assign({ 'aria-describedby': popperId, class: props.class, style: props.style, ref: triggerRefAttacher }, events));
        return (0, vue_1.h)(vue_1.Fragment, null, [
            isManual.value
                ? trigger
                : (0, vue_1.withDirectives)(trigger, [[directives_1.ClickOutside, delayHide]]),
            renderTeleport(),
        ]);
    }
    return {
        render,
    };
};
exports.usePopperHook = usePopperHook;
