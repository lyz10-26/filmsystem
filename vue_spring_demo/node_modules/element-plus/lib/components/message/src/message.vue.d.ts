import type { CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    readonly customClass: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly center: import("../../../utils/props").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly dangerouslyUseHTMLString: import("../../../utils/props").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly duration: import("../../../utils/props").BuildPropReturn<NumberConstructor, 3000, unknown, unknown, unknown>;
    readonly iconClass: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly id: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly message: import("../../../utils/props").BuildPropReturn<import("../../../utils/props").PropWrapper<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>, "", unknown, unknown, unknown>;
    readonly onClose: import("../../../utils/props").BuildPropReturn<import("../../../utils/props").PropWrapper<() => void>, unknown, false, unknown, unknown>;
    readonly showClose: import("../../../utils/props").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly type: import("../../../utils/props").BuildPropReturn<StringConstructor, "info", unknown, "success" | "warning" | "error" | "info", unknown>;
    readonly offset: import("../../../utils/props").BuildPropReturn<NumberConstructor, 20, unknown, unknown, unknown>;
    readonly zIndex: import("../../../utils/props").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
}, {
    typeClass: import("vue").ComputedRef<string>;
    customStyle: import("vue").ComputedRef<CSSProperties>;
    visible: import("vue").Ref<boolean>;
    close: () => void;
    clearTimer: () => void;
    startTimer: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    destroy: () => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    readonly customClass?: unknown;
    readonly center?: unknown;
    readonly dangerouslyUseHTMLString?: unknown;
    readonly duration?: unknown;
    readonly iconClass?: unknown;
    readonly id?: unknown;
    readonly message?: unknown;
    readonly onClose?: unknown;
    readonly showClose?: unknown;
    readonly type?: unknown;
    readonly offset?: unknown;
    readonly zIndex?: unknown;
} & {
    type: import("../../../utils/props").BuildPropType<StringConstructor, "success" | "warning" | "error" | "info", unknown>;
    zIndex: number;
    offset: number;
    center: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
    iconClass: string;
    id: string;
    showClose: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
    customClass: string;
    message: import("../../../utils/props").BuildPropType<import("../../../utils/props").PropWrapper<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>, unknown, unknown>;
    duration: number;
    dangerouslyUseHTMLString: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
} & {
    onClose?: (() => void) | undefined;
}> & {
    onDestroy?: (() => any) | undefined;
}, {
    type: import("../../../utils/props").BuildPropType<StringConstructor, "success" | "warning" | "error" | "info", unknown>;
    zIndex: number;
    offset: number;
    center: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
    onClose: () => void;
    iconClass: string;
    id: string;
    showClose: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
    customClass: string;
    message: import("../../../utils/props").BuildPropType<import("../../../utils/props").PropWrapper<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>, unknown, unknown>;
    duration: number;
    dangerouslyUseHTMLString: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
