import type { ExtractPropTypes } from 'vue';
export declare const buttonGroupProps: {
    readonly size: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, "" | "small" | "large" | "medium" | "mini", unknown>;
    readonly type: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
};
export declare type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>;
