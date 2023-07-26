import type { ExtractPropTypes } from 'vue';
export declare const breadcrumbProps: {
    readonly separator: {
        readonly type: StringConstructor;
        readonly default: "/";
    };
    readonly separatorClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
};
export declare type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>;
