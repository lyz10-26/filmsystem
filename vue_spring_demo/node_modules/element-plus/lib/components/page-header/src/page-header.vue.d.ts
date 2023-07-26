declare const _default: import("vue").DefineComponent<{
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "el-icon-back";
    };
    readonly title: StringConstructor;
    readonly content: {
        readonly type: StringConstructor;
        readonly default: "";
    };
}, {
    handleClick: () => void;
    t: (...args: any[]) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    back: () => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    readonly icon?: unknown;
    readonly title?: unknown;
    readonly content?: unknown;
} & {
    content: string;
    icon: string;
} & {
    title?: string | undefined;
}> & {
    onBack?: (() => any) | undefined;
}, {
    content: string;
    icon: string;
}>;
export default _default;
