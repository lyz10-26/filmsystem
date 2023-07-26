import type { SFCWithInstall } from 'element-plus/es/utils/types';
declare const _CascaderPanel: SFCWithInstall<import("vue").DefineComponent<{
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    renderLabel: import("vue").PropType<import("./src/node").RenderLabel>;
    modelValue: import("vue").PropType<import("./src/node").CascaderValue>;
    options: {
        type: import("vue").PropType<import("./src/node").CascaderOption[]>;
        default: () => import("./src/node").CascaderOption[];
    };
    props: {
        type: import("vue").PropType<import("./src/node").CascaderProps>;
        default: () => import("./src/node").CascaderProps;
    };
}, {
    menuList: import("vue").Ref<never[]>;
    menus: import("vue").Ref<import("./src/node").default[][]>;
    checkedNodes: import("vue").Ref<import("./src/node").default[]>;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleCheckChange: (node: import("./src/node").default, checked: boolean, emitClose?: boolean | undefined) => void;
    getFlattedNodes: (leafOnly: boolean) => import("./src/node").default[];
    getCheckedNodes: (leafOnly: boolean) => import("./src/node").default[];
    clearCheckedNodes: () => void;
    calculateCheckedValue: () => void;
    scrollToExpandingNode: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "close" | "expand-change")[], "change" | "close" | "update:modelValue" | "expand-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    border?: unknown;
    renderLabel?: unknown;
    modelValue?: unknown;
    options?: unknown;
    props?: unknown;
} & {
    props: import("./src/node").CascaderProps;
    border: boolean;
    options: import("./src/node").CascaderOption[];
} & {
    modelValue?: import("./src/node").CascaderValue | undefined;
    renderLabel?: import("./src/node").RenderLabel | undefined;
}> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onExpand-change"?: ((...args: any[]) => any) | undefined;
}, {
    props: import("./src/node").CascaderProps;
    border: boolean;
    options: import("./src/node").CascaderOption[];
}>>;
export default _CascaderPanel;
export declare const ElCascaderPanel: SFCWithInstall<import("vue").DefineComponent<{
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    renderLabel: import("vue").PropType<import("./src/node").RenderLabel>;
    modelValue: import("vue").PropType<import("./src/node").CascaderValue>;
    options: {
        type: import("vue").PropType<import("./src/node").CascaderOption[]>;
        default: () => import("./src/node").CascaderOption[];
    };
    props: {
        type: import("vue").PropType<import("./src/node").CascaderProps>;
        default: () => import("./src/node").CascaderProps;
    };
}, {
    menuList: import("vue").Ref<never[]>;
    menus: import("vue").Ref<import("./src/node").default[][]>;
    checkedNodes: import("vue").Ref<import("./src/node").default[]>;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleCheckChange: (node: import("./src/node").default, checked: boolean, emitClose?: boolean | undefined) => void;
    getFlattedNodes: (leafOnly: boolean) => import("./src/node").default[];
    getCheckedNodes: (leafOnly: boolean) => import("./src/node").default[];
    clearCheckedNodes: () => void;
    calculateCheckedValue: () => void;
    scrollToExpandingNode: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "close" | "expand-change")[], "change" | "close" | "update:modelValue" | "expand-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    border?: unknown;
    renderLabel?: unknown;
    modelValue?: unknown;
    options?: unknown;
    props?: unknown;
} & {
    props: import("./src/node").CascaderProps;
    border: boolean;
    options: import("./src/node").CascaderOption[];
} & {
    modelValue?: import("./src/node").CascaderValue | undefined;
    renderLabel?: import("./src/node").RenderLabel | undefined;
}> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onExpand-change"?: ((...args: any[]) => any) | undefined;
}, {
    props: import("./src/node").CascaderProps;
    border: boolean;
    options: import("./src/node").CascaderOption[];
}>>;
export * from './src/types';
export * from './src/config';
