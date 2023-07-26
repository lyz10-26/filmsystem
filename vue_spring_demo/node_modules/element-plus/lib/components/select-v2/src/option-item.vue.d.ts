declare const _default: import("vue").DefineComponent<{
    data: ArrayConstructor;
    disabled: BooleanConstructor;
    hovering: BooleanConstructor;
    item: ObjectConstructor;
    index: NumberConstructor;
    style: ObjectConstructor;
    selected: BooleanConstructor;
    created: BooleanConstructor;
}, {
    hoverItem: () => void;
    selectOptionClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("hover" | "select")[], "hover" | "select", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    data?: unknown;
    disabled?: unknown;
    hovering?: unknown;
    item?: unknown;
    index?: unknown;
    style?: unknown;
    selected?: unknown;
    created?: unknown;
} & {
    disabled: boolean;
    hovering: boolean;
    created: boolean;
    selected: boolean;
} & {
    style?: Record<string, any> | undefined;
    data?: unknown[] | undefined;
    index?: number | undefined;
    item?: Record<string, any> | undefined;
}> & {
    onSelect?: ((...args: any[]) => any) | undefined;
    onHover?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    hovering: boolean;
    created: boolean;
    selected: boolean;
}>;
export default _default;
