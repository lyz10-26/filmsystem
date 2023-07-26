import type { SFCWithInstall } from 'element-plus/es/utils/types';
declare const _Rate: SFCWithInstall<import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    lowThreshold: {
        type: NumberConstructor;
        default: number;
    };
    highThreshold: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    colors: {
        type: (ObjectConstructor | ArrayConstructor)[];
        default: () => string[];
    };
    voidColor: {
        type: StringConstructor;
        default: string;
    };
    disabledVoidColor: {
        type: StringConstructor;
        default: string;
    };
    iconClasses: {
        type: (ObjectConstructor | ArrayConstructor)[];
        default: () => string[];
    };
    voidIconClass: {
        type: StringConstructor;
        default: string;
    };
    disabledVoidIconClass: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowHalf: {
        type: BooleanConstructor;
        default: boolean;
    };
    showText: {
        type: BooleanConstructor;
        default: boolean;
    };
    showScore: {
        type: BooleanConstructor;
        default: boolean;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    texts: {
        type: import("vue").PropType<string[]>;
        default: () => string[];
    };
    scoreTemplate: {
        type: StringConstructor;
        default: string;
    };
}, {
    hoverIndex: import("vue").Ref<number>;
    currentValue: import("vue").Ref<number>;
    rateDisabled: import("vue").ComputedRef<boolean | undefined>;
    text: import("vue").ComputedRef<string>;
    decimalStyle: import("vue").ComputedRef<{
        color: any;
        width: string;
    }>;
    decimalIconClass: import("vue").ComputedRef<any>;
    classes: import("vue").ComputedRef<any[]>;
    showDecimalIcon: (item: number) => boolean;
    getIconStyle: (item: number) => {
        color: any;
    };
    selectValue: (value: number) => void;
    handleKey: (e: KeyboardEvent) => number | undefined;
    setCurrentValue: (value: number, event: MouseEvent) => void;
    resetCurrentValue: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "change" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    lowThreshold?: unknown;
    highThreshold?: unknown;
    max?: unknown;
    colors?: unknown;
    voidColor?: unknown;
    disabledVoidColor?: unknown;
    iconClasses?: unknown;
    voidIconClass?: unknown;
    disabledVoidIconClass?: unknown;
    disabled?: unknown;
    allowHalf?: unknown;
    showText?: unknown;
    showScore?: unknown;
    textColor?: unknown;
    texts?: unknown;
    scoreTemplate?: unknown;
} & {
    disabled: boolean;
    modelValue: number;
    max: number;
    textColor: string;
    colors: Record<string, any> | unknown[];
    showText: boolean;
    lowThreshold: number;
    highThreshold: number;
    voidColor: string;
    disabledVoidColor: string;
    iconClasses: Record<string, any> | unknown[];
    voidIconClass: string;
    disabledVoidIconClass: string;
    allowHalf: boolean;
    showScore: boolean;
    texts: string[];
    scoreTemplate: string;
} & {}> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    modelValue: number;
    max: number;
    textColor: string;
    colors: Record<string, any> | unknown[];
    showText: boolean;
    lowThreshold: number;
    highThreshold: number;
    voidColor: string;
    disabledVoidColor: string;
    iconClasses: Record<string, any> | unknown[];
    voidIconClass: string;
    disabledVoidIconClass: string;
    allowHalf: boolean;
    showScore: boolean;
    texts: string[];
    scoreTemplate: string;
}>>;
export default _Rate;
export declare const ElRate: SFCWithInstall<import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    lowThreshold: {
        type: NumberConstructor;
        default: number;
    };
    highThreshold: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    colors: {
        type: (ObjectConstructor | ArrayConstructor)[];
        default: () => string[];
    };
    voidColor: {
        type: StringConstructor;
        default: string;
    };
    disabledVoidColor: {
        type: StringConstructor;
        default: string;
    };
    iconClasses: {
        type: (ObjectConstructor | ArrayConstructor)[];
        default: () => string[];
    };
    voidIconClass: {
        type: StringConstructor;
        default: string;
    };
    disabledVoidIconClass: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowHalf: {
        type: BooleanConstructor;
        default: boolean;
    };
    showText: {
        type: BooleanConstructor;
        default: boolean;
    };
    showScore: {
        type: BooleanConstructor;
        default: boolean;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    texts: {
        type: import("vue").PropType<string[]>;
        default: () => string[];
    };
    scoreTemplate: {
        type: StringConstructor;
        default: string;
    };
}, {
    hoverIndex: import("vue").Ref<number>;
    currentValue: import("vue").Ref<number>;
    rateDisabled: import("vue").ComputedRef<boolean | undefined>;
    text: import("vue").ComputedRef<string>;
    decimalStyle: import("vue").ComputedRef<{
        color: any;
        width: string;
    }>;
    decimalIconClass: import("vue").ComputedRef<any>;
    classes: import("vue").ComputedRef<any[]>;
    showDecimalIcon: (item: number) => boolean;
    getIconStyle: (item: number) => {
        color: any;
    };
    selectValue: (value: number) => void;
    handleKey: (e: KeyboardEvent) => number | undefined;
    setCurrentValue: (value: number, event: MouseEvent) => void;
    resetCurrentValue: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "change" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    lowThreshold?: unknown;
    highThreshold?: unknown;
    max?: unknown;
    colors?: unknown;
    voidColor?: unknown;
    disabledVoidColor?: unknown;
    iconClasses?: unknown;
    voidIconClass?: unknown;
    disabledVoidIconClass?: unknown;
    disabled?: unknown;
    allowHalf?: unknown;
    showText?: unknown;
    showScore?: unknown;
    textColor?: unknown;
    texts?: unknown;
    scoreTemplate?: unknown;
} & {
    disabled: boolean;
    modelValue: number;
    max: number;
    textColor: string;
    colors: Record<string, any> | unknown[];
    showText: boolean;
    lowThreshold: number;
    highThreshold: number;
    voidColor: string;
    disabledVoidColor: string;
    iconClasses: Record<string, any> | unknown[];
    voidIconClass: string;
    disabledVoidIconClass: string;
    allowHalf: boolean;
    showScore: boolean;
    texts: string[];
    scoreTemplate: string;
} & {}> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    modelValue: number;
    max: number;
    textColor: string;
    colors: Record<string, any> | unknown[];
    showText: boolean;
    lowThreshold: number;
    highThreshold: number;
    voidColor: string;
    disabledVoidColor: string;
    iconClasses: Record<string, any> | unknown[];
    voidIconClass: string;
    disabledVoidIconClass: string;
    allowHalf: boolean;
    showScore: boolean;
    texts: string[];
    scoreTemplate: string;
}>>;
