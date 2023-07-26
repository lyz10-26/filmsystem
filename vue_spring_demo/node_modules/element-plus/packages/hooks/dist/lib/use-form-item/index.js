"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormItem = exports.useFormItemProps = void 0;
const vue_1 = require("vue");
const tokens_1 = require("element-plus/lib/tokens");
const props_1 = require("element-plus/lib/utils/props");
const util_1 = require("element-plus/lib/utils/util");
const sizes = ['', 'large', 'medium', 'small', 'mini'];
exports.useFormItemProps = (0, props_1.buildProps)({
    size: {
        type: String,
        values: sizes,
        default: '',
    },
    disabled: Boolean,
});
const useFormItem = ({ size, disabled }) => {
    const vm = (0, vue_1.getCurrentInstance)();
    const $ELEMENT = (0, util_1.useGlobalConfig)();
    const props = vm.proxy.$props;
    const form = (0, vue_1.inject)(tokens_1.elFormKey, undefined);
    const formItem = (0, vue_1.inject)(tokens_1.elFormItemKey, undefined);
    return {
        size: (0, vue_1.computed)(() => {
            return (props.size ||
                (0, vue_1.unref)(size) ||
                (formItem === null || formItem === void 0 ? void 0 : formItem.size) ||
                (form === null || form === void 0 ? void 0 : form.size) ||
                $ELEMENT.size ||
                '');
        }),
        disabled: (0, vue_1.computed)(() => {
            return (props.disabled === true || (0, vue_1.unref)(disabled) || (form === null || form === void 0 ? void 0 : form.disabled) || false);
        }),
    };
};
exports.useFormItem = useFormItem;
