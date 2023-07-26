export declare const ElButton: import("../../utils/types").SFCWithInstall<import("vue").DefineComponent<{
    readonly type: import("../../utils/props").BuildPropReturn<StringConstructor, "", unknown, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    readonly icon: import("../../utils/props").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly nativeType: import("../../utils/props").BuildPropReturn<StringConstructor, "button", unknown, "button" | "reset" | "submit", unknown>;
    readonly loading: BooleanConstructor;
    readonly plain: BooleanConstructor;
    readonly autofocus: BooleanConstructor;
    readonly round: BooleanConstructor;
    readonly circle: BooleanConstructor;
    readonly size: import("../../utils/props").BuildPropReturn<StringConstructor, "", unknown, "" | "small" | "large" | "medium" | "mini", unknown>;
    readonly disabled: BooleanConstructor;
}, {
    buttonSize: import("vue").ComputedRef<any>;
    buttonType: import("vue").ComputedRef<"default" | "success" | "warning" | "info" | "text" | "primary" | "danger">;
    buttonDisabled: import("vue").ComputedRef<boolean>;
    handleClick: (evt: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (evt: MouseEvent) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    readonly type?: unknown;
    readonly icon?: unknown;
    readonly nativeType?: unknown;
    readonly loading?: unknown;
    readonly plain?: unknown;
    readonly autofocus?: unknown;
    readonly round?: unknown;
    readonly circle?: unknown;
    readonly size?: unknown;
    readonly disabled?: unknown;
} & {
    type: import("../../utils/props").BuildPropType<StringConstructor, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    disabled: boolean;
    size: import("../../utils/props").BuildPropType<StringConstructor, "" | "small" | "large" | "medium" | "mini", unknown>;
    round: boolean;
    circle: boolean;
    icon: string;
    loading: boolean;
    nativeType: import("../../utils/props").BuildPropType<StringConstructor, "button" | "reset" | "submit", unknown>;
    plain: boolean;
    autofocus: boolean;
} & {}> & {
    onClick?: ((evt: MouseEvent) => any) | undefined;
}, {
    type: import("../../utils/props").BuildPropType<StringConstructor, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    disabled: boolean;
    size: import("../../utils/props").BuildPropType<StringConstructor, "" | "small" | "large" | "medium" | "mini", unknown>;
    round: boolean;
    circle: boolean;
    icon: string;
    loading: boolean;
    nativeType: import("../../utils/props").BuildPropType<StringConstructor, "button" | "reset" | "submit", unknown>;
    plain: boolean;
    autofocus: boolean;
}>> & {
    ButtonGroup: import("vue").DefineComponent<{
        readonly size: import("../../utils/props").BuildPropReturn<StringConstructor, "", unknown, "" | "small" | "large" | "medium" | "mini", unknown>;
        readonly type: import("../../utils/props").BuildPropReturn<StringConstructor, "", unknown, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    }, void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
        readonly size?: unknown;
        readonly type?: unknown;
    } & {
        type: import("../../utils/props").BuildPropType<StringConstructor, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
        size: import("../../utils/props").BuildPropType<StringConstructor, "" | "small" | "large" | "medium" | "mini", unknown>;
    } & {}>, {
        type: import("../../utils/props").BuildPropType<StringConstructor, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
        size: import("../../utils/props").BuildPropType<StringConstructor, "" | "small" | "large" | "medium" | "mini", unknown>;
    }>;
};
export declare const ElButtonGroup: import("../../utils/types").SFCWithInstall<import("vue").DefineComponent<{
    readonly size: import("../../utils/props").BuildPropReturn<StringConstructor, "", unknown, "" | "small" | "large" | "medium" | "mini", unknown>;
    readonly type: import("../../utils/props").BuildPropReturn<StringConstructor, "", unknown, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
}, void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    readonly size?: unknown;
    readonly type?: unknown;
} & {
    type: import("../../utils/props").BuildPropType<StringConstructor, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    size: import("../../utils/props").BuildPropType<StringConstructor, "" | "small" | "large" | "medium" | "mini", unknown>;
} & {}>, {
    type: import("../../utils/props").BuildPropType<StringConstructor, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    size: import("../../utils/props").BuildPropType<StringConstructor, "" | "small" | "large" | "medium" | "mini", unknown>;
}>>;
export default ElButton;
export * from './src/button';
