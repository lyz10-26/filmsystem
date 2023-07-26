export declare const ElSkeleton: import("../../utils/types").SFCWithInstall<import("vue").DefineComponent<{
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
}>> & {
    SkeletonItem: import("vue").DefineComponent<{
        variant: {
            type: import("vue").PropType<import("./src/types").Variants>;
            default: string;
        };
    }, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
        variant?: unknown;
    } & {
        variant: import("./src/types").Variants;
    } & {}>, {
        variant: import("./src/types").Variants;
    }>;
};
export default ElSkeleton;
export declare const ElSkeletonItem: import("../../utils/types").SFCWithInstall<import("vue").DefineComponent<{
    variant: {
        type: import("vue").PropType<import("./src/types").Variants>;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    variant?: unknown;
} & {
    variant: import("./src/types").Variants;
} & {}>, {
    variant: import("./src/types").Variants;
}>>;
export * from './src/types';
