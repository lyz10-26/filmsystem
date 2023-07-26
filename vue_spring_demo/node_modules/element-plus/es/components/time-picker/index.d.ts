import CommonPicker from './src/common/picker.vue';
import TimePickPanel from './src/time-picker-com/panel-time-pick.vue';
import type { SFCWithInstall } from 'element-plus/es/utils/types';
export * from './src/common/date-utils';
export * from './src/common/constant';
export * from './src/common/props';
declare const _TimePicker: SFCWithInstall<import("vue").DefineComponent<{
    isRange: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    popperClass: {
        type: StringConstructor;
        default: string;
    };
    format: {
        type: StringConstructor;
    };
    valueFormat: {
        type: import("vue").PropType<string>;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    prefixIcon: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: import("vue").PropType<import("element-plus/es/utils/types").ComponentSize>;
        validator: (val: string) => boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    popperOptions: {
        type: import("vue").PropType<Partial<import("@popperjs/core").Options>>;
        default: () => {};
    };
    modelValue: {
        type: import("vue").PropType<string | Date | Date[]>;
        default: string;
    };
    rangeSeparator: {
        type: StringConstructor;
        default: string;
    };
    startPlaceholder: StringConstructor;
    endPlaceholder: StringConstructor;
    defaultValue: {
        type: import("vue").PropType<Date | Date[]>;
    };
    defaultTime: {
        type: import("vue").PropType<Date | Date[]>;
    };
    disabledHours: {
        type: FunctionConstructor;
    };
    disabledMinutes: {
        type: FunctionConstructor;
    };
    disabledSeconds: {
        type: FunctionConstructor;
    };
    disabledDate: {
        type: FunctionConstructor;
    };
    cellClassName: {
        type: FunctionConstructor;
    };
    shortcuts: {
        type: ArrayConstructor;
        default: () => never[];
    };
    arrowControl: {
        type: BooleanConstructor;
        default: boolean;
    };
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    unlinkPanels: BooleanConstructor;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isRange?: unknown;
    name?: unknown;
    popperClass?: unknown;
    format?: unknown;
    valueFormat?: unknown;
    type?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    editable?: unknown;
    prefixIcon?: unknown;
    size?: unknown;
    readonly?: unknown;
    disabled?: unknown;
    placeholder?: unknown;
    popperOptions?: unknown;
    modelValue?: unknown;
    rangeSeparator?: unknown;
    startPlaceholder?: unknown;
    endPlaceholder?: unknown;
    defaultValue?: unknown;
    defaultTime?: unknown;
    disabledHours?: unknown;
    disabledMinutes?: unknown;
    disabledSeconds?: unknown;
    disabledDate?: unknown;
    cellClassName?: unknown;
    shortcuts?: unknown;
    arrowControl?: unknown;
    validateEvent?: unknown;
    unlinkPanels?: unknown;
} & {
    type: string;
    name: string | unknown[];
    disabled: boolean;
    popperClass: string;
    popperOptions: Partial<import("@popperjs/core").Options>;
    modelValue: string | Date | Date[];
    placeholder: string;
    readonly: boolean;
    clearable: boolean;
    prefixIcon: string;
    validateEvent: boolean;
    clearIcon: string;
    editable: boolean;
    rangeSeparator: string;
    isRange: boolean;
    shortcuts: unknown[];
    arrowControl: boolean;
    unlinkPanels: boolean;
} & {
    size?: import("element-plus/es/utils/types").ComponentSize | undefined;
    format?: string | undefined;
    valueFormat?: string | undefined;
    startPlaceholder?: string | undefined;
    endPlaceholder?: string | undefined;
    defaultValue?: Date | Date[] | undefined;
    defaultTime?: Date | Date[] | undefined;
    disabledHours?: Function | undefined;
    disabledMinutes?: Function | undefined;
    disabledSeconds?: Function | undefined;
    disabledDate?: Function | undefined;
    cellClassName?: Function | undefined;
}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    name: string | unknown[];
    disabled: boolean;
    popperClass: string;
    popperOptions: Partial<import("@popperjs/core").Options>;
    modelValue: string | Date | Date[];
    placeholder: string;
    readonly: boolean;
    clearable: boolean;
    prefixIcon: string;
    validateEvent: boolean;
    clearIcon: string;
    editable: boolean;
    rangeSeparator: string;
    isRange: boolean;
    shortcuts: unknown[];
    arrowControl: boolean;
    unlinkPanels: boolean;
}>>;
export { CommonPicker, TimePickPanel };
export default _TimePicker;
export declare const ElTimePicker: SFCWithInstall<import("vue").DefineComponent<{
    isRange: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    popperClass: {
        type: StringConstructor;
        default: string;
    };
    format: {
        type: StringConstructor;
    };
    valueFormat: {
        type: import("vue").PropType<string>;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    prefixIcon: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: import("vue").PropType<import("element-plus/es/utils/types").ComponentSize>;
        validator: (val: string) => boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    popperOptions: {
        type: import("vue").PropType<Partial<import("@popperjs/core").Options>>;
        default: () => {};
    };
    modelValue: {
        type: import("vue").PropType<string | Date | Date[]>;
        default: string;
    };
    rangeSeparator: {
        type: StringConstructor;
        default: string;
    };
    startPlaceholder: StringConstructor;
    endPlaceholder: StringConstructor;
    defaultValue: {
        type: import("vue").PropType<Date | Date[]>;
    };
    defaultTime: {
        type: import("vue").PropType<Date | Date[]>;
    };
    disabledHours: {
        type: FunctionConstructor;
    };
    disabledMinutes: {
        type: FunctionConstructor;
    };
    disabledSeconds: {
        type: FunctionConstructor;
    };
    disabledDate: {
        type: FunctionConstructor;
    };
    cellClassName: {
        type: FunctionConstructor;
    };
    shortcuts: {
        type: ArrayConstructor;
        default: () => never[];
    };
    arrowControl: {
        type: BooleanConstructor;
        default: boolean;
    };
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    unlinkPanels: BooleanConstructor;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isRange?: unknown;
    name?: unknown;
    popperClass?: unknown;
    format?: unknown;
    valueFormat?: unknown;
    type?: unknown;
    clearable?: unknown;
    clearIcon?: unknown;
    editable?: unknown;
    prefixIcon?: unknown;
    size?: unknown;
    readonly?: unknown;
    disabled?: unknown;
    placeholder?: unknown;
    popperOptions?: unknown;
    modelValue?: unknown;
    rangeSeparator?: unknown;
    startPlaceholder?: unknown;
    endPlaceholder?: unknown;
    defaultValue?: unknown;
    defaultTime?: unknown;
    disabledHours?: unknown;
    disabledMinutes?: unknown;
    disabledSeconds?: unknown;
    disabledDate?: unknown;
    cellClassName?: unknown;
    shortcuts?: unknown;
    arrowControl?: unknown;
    validateEvent?: unknown;
    unlinkPanels?: unknown;
} & {
    type: string;
    name: string | unknown[];
    disabled: boolean;
    popperClass: string;
    popperOptions: Partial<import("@popperjs/core").Options>;
    modelValue: string | Date | Date[];
    placeholder: string;
    readonly: boolean;
    clearable: boolean;
    prefixIcon: string;
    validateEvent: boolean;
    clearIcon: string;
    editable: boolean;
    rangeSeparator: string;
    isRange: boolean;
    shortcuts: unknown[];
    arrowControl: boolean;
    unlinkPanels: boolean;
} & {
    size?: import("element-plus/es/utils/types").ComponentSize | undefined;
    format?: string | undefined;
    valueFormat?: string | undefined;
    startPlaceholder?: string | undefined;
    endPlaceholder?: string | undefined;
    defaultValue?: Date | Date[] | undefined;
    defaultTime?: Date | Date[] | undefined;
    disabledHours?: Function | undefined;
    disabledMinutes?: Function | undefined;
    disabledSeconds?: Function | undefined;
    disabledDate?: Function | undefined;
    cellClassName?: Function | undefined;
}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    name: string | unknown[];
    disabled: boolean;
    popperClass: string;
    popperOptions: Partial<import("@popperjs/core").Options>;
    modelValue: string | Date | Date[];
    placeholder: string;
    readonly: boolean;
    clearable: boolean;
    prefixIcon: string;
    validateEvent: boolean;
    clearIcon: string;
    editable: boolean;
    rangeSeparator: string;
    isRange: boolean;
    shortcuts: unknown[];
    arrowControl: boolean;
    unlinkPanels: boolean;
}>>;
