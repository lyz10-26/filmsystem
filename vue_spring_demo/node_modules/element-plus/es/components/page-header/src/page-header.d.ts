import type { ExtractPropTypes } from 'vue';
export declare const pageHeaderProps: {
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "el-icon-back";
    };
    readonly title: StringConstructor;
    readonly content: {
        readonly type: StringConstructor;
        readonly default: "";
    };
};
export declare type PageHeaderProps = ExtractPropTypes<typeof pageHeaderProps>;
export declare const pageHeaderEmits: {
    back: () => boolean;
};
export declare type PageHeaderEmits = typeof pageHeaderEmits;
