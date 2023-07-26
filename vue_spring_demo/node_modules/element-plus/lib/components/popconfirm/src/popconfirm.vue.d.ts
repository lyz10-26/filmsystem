import { Effect } from 'element-plus/es/components/popper';
declare const _default: import("vue").DefineComponent<{
    readonly title: import("../../../utils/props").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly confirmButtonText: import("../../../utils/props").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly cancelButtonText: import("../../../utils/props").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly confirmButtonType: import("../../../utils/props").BuildPropReturn<StringConstructor, "primary", unknown, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    readonly cancelButtonType: import("../../../utils/props").BuildPropReturn<StringConstructor, "text", unknown, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    readonly icon: import("../../../utils/props").BuildPropReturn<StringConstructor, "el-icon-question", unknown, unknown, unknown>;
    readonly iconColor: import("../../../utils/props").BuildPropReturn<StringConstructor, "#f90", unknown, unknown, unknown>;
    readonly hideIcon: import("../../../utils/props").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
}, {
    Effect: typeof Effect;
    visible: import("vue").Ref<boolean>;
    finalConfirmButtonText: import("vue").ComputedRef<string>;
    finalCancelButtonText: import("vue").ComputedRef<string>;
    confirm: () => void;
    cancel: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    confirm: () => boolean;
    cancel: () => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    readonly title?: unknown;
    readonly confirmButtonText?: unknown;
    readonly cancelButtonText?: unknown;
    readonly confirmButtonType?: unknown;
    readonly cancelButtonType?: unknown;
    readonly icon?: unknown;
    readonly iconColor?: unknown;
    readonly hideIcon?: unknown;
} & {
    icon: string;
    confirmButtonType: import("../../../utils/props").BuildPropType<StringConstructor, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    cancelButtonType: import("../../../utils/props").BuildPropType<StringConstructor, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    iconColor: string;
    hideIcon: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
} & {
    title?: string | undefined;
    confirmButtonText?: string | undefined;
    cancelButtonText?: string | undefined;
}> & {
    onCancel?: (() => any) | undefined;
    onConfirm?: (() => any) | undefined;
}, {
    title: string;
    icon: string;
    confirmButtonText: string;
    cancelButtonText: string;
    confirmButtonType: import("../../../utils/props").BuildPropType<StringConstructor, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    cancelButtonType: import("../../../utils/props").BuildPropType<StringConstructor, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    iconColor: string;
    hideIcon: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
