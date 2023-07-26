import type { PropType } from 'vue';
import type { ComponentSize } from 'element-plus/es/utils/types';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (BooleanConstructor | NumberConstructor | StringConstructor)[];
        default: string;
    };
    size: {
        type: PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
    fill: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
}, {
    handleKeydown: (e: any) => void;
    radioGroupSize: import("vue").ComputedRef<ComponentSize>;
    radioGroup: import("vue").Ref<null>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "change" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    size?: unknown;
    fill?: unknown;
    textColor?: unknown;
    disabled?: unknown;
} & {
    fill: string;
    disabled: boolean;
    modelValue: string | number | boolean;
    textColor: string;
} & {
    size?: ComponentSize | undefined;
}> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    fill: string;
    disabled: boolean;
    modelValue: string | number | boolean;
    textColor: string;
}>;
export default _default;
