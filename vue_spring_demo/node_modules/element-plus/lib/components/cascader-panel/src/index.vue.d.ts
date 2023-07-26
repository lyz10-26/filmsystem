import Node from './node';
import type { PropType, Ref } from 'vue';
import type { CascaderValue, CascaderOption, RenderLabel } from './node';
declare const _default: import("vue").DefineComponent<{
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    renderLabel: PropType<RenderLabel>;
    modelValue: PropType<CascaderValue>;
    options: {
        type: PropType<CascaderOption[]>;
        default: () => CascaderOption[];
    };
    props: {
        type: PropType<import("./node").CascaderProps>;
        default: () => import("./node").CascaderProps;
    };
}, {
    menuList: Ref<never[]>;
    menus: Ref<Node[][]>;
    checkedNodes: Ref<Node[]>;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleCheckChange: (node: Node, checked: boolean, emitClose?: boolean | undefined) => void;
    getFlattedNodes: (leafOnly: boolean) => Node[];
    getCheckedNodes: (leafOnly: boolean) => Node[];
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
    props: import("./node").CascaderProps;
    border: boolean;
    options: CascaderOption[];
} & {
    modelValue?: CascaderValue | undefined;
    renderLabel?: RenderLabel | undefined;
}> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onExpand-change"?: ((...args: any[]) => any) | undefined;
}, {
    props: import("./node").CascaderProps;
    border: boolean;
    options: CascaderOption[];
}>;
export default _default;
