declare const _default: import("vue").DefineComponent<{
    label: {
        type: (BooleanConstructor | NumberConstructor | StringConstructor)[];
        default: string;
    };
    disabled: BooleanConstructor;
    name: {
        type: StringConstructor;
        default: string;
    };
}, {
    isGroup: import("vue").ComputedRef<boolean>;
    size: import("vue").ComputedRef<import("../../../utils/types").ComponentSize>;
    isDisabled: import("vue").ComputedRef<boolean | undefined>;
    tabIndex: import("vue").ComputedRef<0 | -1>;
    value: import("vue").WritableComputedRef<string | number | boolean>;
    focus: import("vue").Ref<boolean>;
    activeStyle: import("vue").ComputedRef<{
        backgroundColor: string;
        borderColor: string;
        boxShadow: string;
        color: string;
    }>;
    radioRef: import("vue").Ref<HTMLInputElement | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    label?: unknown;
    disabled?: unknown;
    name?: unknown;
} & {
    name: string;
    disabled: boolean;
    label: string | number | boolean;
} & {}>, {
    name: string;
    disabled: boolean;
    label: string | number | boolean;
}>;
export default _default;
