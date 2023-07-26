declare const _default: import("vue").DefineComponent<{
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    count: {
        type: NumberConstructor;
        default: number;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    throttle: {
        type: NumberConstructor;
    };
}, {
    uiLoading: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    animated?: unknown;
    count?: unknown;
    rows?: unknown;
    loading?: unknown;
    throttle?: unknown;
} & {
    loading: boolean;
    rows: number;
    animated: boolean;
    count: number;
} & {
    throttle?: number | undefined;
}>, {
    loading: boolean;
    rows: number;
    animated: boolean;
    count: number;
}>;
export default _default;
