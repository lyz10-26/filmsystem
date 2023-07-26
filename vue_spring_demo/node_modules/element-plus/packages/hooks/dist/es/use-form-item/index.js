import { inject, computed, getCurrentInstance, unref } from 'vue';
import { elFormKey, elFormItemKey } from 'element-plus/es/tokens';
import { buildProps } from 'element-plus/es/utils/props';
import { useGlobalConfig } from 'element-plus/es/utils/util';
const sizes = ['', 'large', 'medium', 'small', 'mini'];
export const useFormItemProps = buildProps({
    size: {
        type: String,
        values: sizes,
        default: '',
    },
    disabled: Boolean,
});
export const useFormItem = ({ size, disabled }) => {
    const vm = getCurrentInstance();
    const $ELEMENT = useGlobalConfig();
    const props = vm.proxy.$props;
    const form = inject(elFormKey, undefined);
    const formItem = inject(elFormItemKey, undefined);
    return {
        size: computed(() => {
            return (props.size ||
                unref(size) ||
                (formItem === null || formItem === void 0 ? void 0 : formItem.size) ||
                (form === null || form === void 0 ? void 0 : form.size) ||
                $ELEMENT.size ||
                '');
        }),
        disabled: computed(() => {
            return (props.disabled === true || unref(disabled) || (form === null || form === void 0 ? void 0 : form.disabled) || false);
        }),
    };
};
