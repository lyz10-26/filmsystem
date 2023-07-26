"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModelToggle = exports.useModelToggleEmits = exports.useModelToggleProps = void 0;
const vue_1 = require("vue");
const shared_1 = require("@vue/shared");
const util_1 = require("element-plus/lib/utils/util");
const constants_1 = require("element-plus/lib/utils/constants");
const isServer_1 = __importDefault(require("element-plus/lib/utils/isServer"));
exports.useModelToggleProps = {
    modelValue: {
        type: Boolean,
        default: null,
    },
    'onUpdate:modelValue': Function,
};
exports.useModelToggleEmits = [constants_1.UPDATE_MODEL_EVENT];
const useModelToggle = ({ indicator, shouldHideWhenRouteChanges, shouldProceed, onShow, onHide, }) => {
    const { appContext, props, proxy, emit } = (0, vue_1.getCurrentInstance)();
    const hasUpdateHandler = (0, vue_1.computed)(() => (0, shared_1.isFunction)(props['onUpdate:modelValue']));
    const isModelBindingAbsent = (0, vue_1.computed)(() => props.modelValue === null);
    const doShow = () => {
        if (indicator.value === true) {
            return;
        }
        indicator.value = true;
        if ((0, shared_1.isFunction)(onShow)) {
            onShow();
        }
    };
    const doHide = () => {
        if (indicator.value === false) {
            return;
        }
        indicator.value = false;
        if ((0, shared_1.isFunction)(onHide)) {
            onHide();
        }
    };
    const show = () => {
        if (props.disabled === true ||
            ((0, shared_1.isFunction)(shouldProceed) && !shouldProceed()))
            return;
        const shouldEmit = hasUpdateHandler.value && !isServer_1.default;
        if (shouldEmit) {
            emit(constants_1.UPDATE_MODEL_EVENT, true);
        }
        if (isModelBindingAbsent.value || !shouldEmit) {
            doShow();
        }
    };
    const hide = () => {
        if (props.disabled === true || isServer_1.default)
            return;
        const shouldEmit = hasUpdateHandler.value && !isServer_1.default;
        if (shouldEmit) {
            emit(constants_1.UPDATE_MODEL_EVENT, false);
        }
        if (isModelBindingAbsent.value || !shouldEmit) {
            doHide();
        }
    };
    const onChange = (val) => {
        if (!(0, util_1.isBool)(val))
            return;
        if (props.disabled && val) {
            if (hasUpdateHandler.value) {
                emit(constants_1.UPDATE_MODEL_EVENT, false);
            }
        }
        else if (indicator.value !== val) {
            if (val) {
                doShow();
            }
            else {
                doHide();
            }
        }
    };
    const toggle = () => {
        if (indicator.value) {
            hide();
        }
        else {
            show();
        }
    };
    (0, vue_1.watch)(() => props.modelValue, onChange);
    if (shouldHideWhenRouteChanges &&
        appContext.config.globalProperties.$route !== undefined) {
        (0, vue_1.watch)(() => (Object.assign({}, proxy.$route)), () => {
            if (shouldHideWhenRouteChanges.value && indicator.value) {
                hide();
            }
        });
    }
    (0, vue_1.onMounted)(() => {
        onChange(props.modelValue);
    });
    return {
        hide,
        show,
        toggle,
    };
};
exports.useModelToggle = useModelToggle;
