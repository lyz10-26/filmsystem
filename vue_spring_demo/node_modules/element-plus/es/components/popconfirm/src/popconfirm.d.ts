import type { ExtractPropTypes } from 'vue';
export declare const popconfirmProps: {
    readonly title: import("element-plus/es/utils/props").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly confirmButtonText: import("element-plus/es/utils/props").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly cancelButtonText: import("element-plus/es/utils/props").BuildPropReturn<StringConstructor, unknown, unknown, unknown, unknown>;
    readonly confirmButtonType: import("element-plus/es/utils/props").BuildPropReturn<StringConstructor, "primary", unknown, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    readonly cancelButtonType: import("element-plus/es/utils/props").BuildPropReturn<StringConstructor, "text", unknown, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
    readonly icon: import("element-plus/es/utils/props").BuildPropReturn<StringConstructor, "el-icon-question", unknown, unknown, unknown>;
    readonly iconColor: import("element-plus/es/utils/props").BuildPropReturn<StringConstructor, "#f90", unknown, unknown, unknown>;
    readonly hideIcon: import("element-plus/es/utils/props").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
};
export declare type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>;
export declare const popconfirmEmits: {
    confirm: () => boolean;
    cancel: () => boolean;
};
export declare type PopconfirmEmits = typeof popconfirmEmits;
