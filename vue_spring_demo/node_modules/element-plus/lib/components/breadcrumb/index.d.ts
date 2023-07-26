export declare const ElBreadcrumb: import("../../utils/types").SFCWithInstall<import("vue").DefineComponent<{
    readonly separator: {
        readonly type: StringConstructor;
        readonly default: "/";
    };
    readonly separatorClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
}, {
    breadcrumb: import("vue").Ref<HTMLDivElement | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    readonly separator?: unknown;
    readonly separatorClass?: unknown;
} & {
    separator: string;
    separatorClass: string;
} & {}>, {
    separator: string;
    separatorClass: string;
}>> & {
    BreadcrumbItem: import("vue").DefineComponent<{
        readonly to: import("../../utils/props").BuildPropReturn<import("../../utils/props").PropWrapper<import("vue-router").RouteLocationRaw>, "", unknown, unknown, unknown>;
        readonly replace: import("../../utils/props").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    }, {
        link: import("vue").Ref<HTMLSpanElement | undefined>;
        separator: string | undefined;
        separatorClass: string | undefined;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
        readonly to?: unknown;
        readonly replace?: unknown;
    } & {
        replace: import("../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
        to: import("../../utils/props").BuildPropType<import("../../utils/props").PropWrapper<import("vue-router").RouteLocationRaw>, unknown, unknown>;
    } & {}>, {
        replace: import("../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
        to: import("../../utils/props").BuildPropType<import("../../utils/props").PropWrapper<import("vue-router").RouteLocationRaw>, unknown, unknown>;
    }>;
};
export declare const ElBreadcrumbItem: import("../../utils/types").SFCWithInstall<import("vue").DefineComponent<{
    readonly to: import("../../utils/props").BuildPropReturn<import("../../utils/props").PropWrapper<import("vue-router").RouteLocationRaw>, "", unknown, unknown, unknown>;
    readonly replace: import("../../utils/props").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
}, {
    link: import("vue").Ref<HTMLSpanElement | undefined>;
    separator: string | undefined;
    separatorClass: string | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    readonly to?: unknown;
    readonly replace?: unknown;
} & {
    replace: import("../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
    to: import("../../utils/props").BuildPropType<import("../../utils/props").PropWrapper<import("vue-router").RouteLocationRaw>, unknown, unknown>;
} & {}>, {
    replace: import("../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
    to: import("../../utils/props").BuildPropType<import("../../utils/props").PropWrapper<import("vue-router").RouteLocationRaw>, unknown, unknown>;
}>>;
export default ElBreadcrumb;
export * from './src/breadcrumb';
export * from './src/breadcrumb-item';
