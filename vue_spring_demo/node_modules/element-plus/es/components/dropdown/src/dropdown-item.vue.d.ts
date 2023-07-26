declare const _default: import("vue").DefineComponent<{
    command: {
        type: (ObjectConstructor | NumberConstructor | StringConstructor)[];
        default: () => {};
    };
    disabled: BooleanConstructor;
    divided: BooleanConstructor;
    icon: StringConstructor;
}, {
    handleClick: (e: UIEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    command?: unknown;
    disabled?: unknown;
    divided?: unknown;
    icon?: unknown;
} & {
    disabled: boolean;
    command: string | number | Record<string, any>;
    divided: boolean;
} & {
    icon?: string | undefined;
}>, {
    disabled: boolean;
    command: string | number | Record<string, any>;
    divided: boolean;
}>;
export default _default;
