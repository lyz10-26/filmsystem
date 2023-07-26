declare const _default: import("vue").DefineComponent<{
    readonly title: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly description: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly type: import("../../../utils/props").BuildPropReturn<StringConstructor, "info", unknown, "success" | "warning" | "error" | "info", unknown>;
    readonly closable: import("../../../utils/props").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly closeText: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly showIcon: BooleanConstructor;
    readonly center: BooleanConstructor;
    readonly effect: import("../../../utils/props").BuildPropReturn<StringConstructor, "light", unknown, "light" | "dark", unknown>;
}, {
    visible: import("vue").Ref<boolean>;
    typeClass: import("vue").ComputedRef<string>;
    iconClass: import("vue").ComputedRef<"el-icon-success" | "el-icon-warning" | "el-icon-error" | "el-icon-info">;
    isBigIcon: import("vue").ComputedRef<"" | "is-big">;
    isBoldTitle: import("vue").ComputedRef<"" | "is-bold">;
    close: (evt: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: (evt: MouseEvent) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    readonly title?: unknown;
    readonly description?: unknown;
    readonly type?: unknown;
    readonly closable?: unknown;
    readonly closeText?: unknown;
    readonly showIcon?: unknown;
    readonly center?: unknown;
    readonly effect?: unknown;
} & {
    type: import("../../../utils/props").BuildPropType<StringConstructor, "success" | "warning" | "error" | "info", unknown>;
    description: string;
    title: string;
    closable: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
    closeText: string;
    effect: import("../../../utils/props").BuildPropType<StringConstructor, "light" | "dark", unknown>;
    showIcon: boolean;
    center: boolean;
} & {}> & {
    onClose?: ((evt: MouseEvent) => any) | undefined;
}, {
    type: import("../../../utils/props").BuildPropType<StringConstructor, "success" | "warning" | "error" | "info", unknown>;
    description: string;
    title: string;
    closable: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
    closeText: string;
    effect: import("../../../utils/props").BuildPropType<StringConstructor, "light" | "dark", unknown>;
    showIcon: boolean;
    center: boolean;
}>;
export default _default;
