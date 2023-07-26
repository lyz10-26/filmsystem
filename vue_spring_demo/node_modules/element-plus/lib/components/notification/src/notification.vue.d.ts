import type { CSSProperties } from 'vue';
import type { NotificationProps } from './notification';
export declare const typeMap: Record<NotificationProps['type'], string>;
declare const _default: import("vue").DefineComponent<{
    readonly customClass: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly dangerouslyUseHTMLString: import("../../../utils/props").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly duration: import("../../../utils/props").BuildPropReturn<NumberConstructor, 4500, unknown, unknown, unknown>;
    readonly iconClass: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly id: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly message: import("../../../utils/props").BuildPropReturn<import("../../../utils/props").PropWrapper<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>, "", unknown, unknown, unknown>;
    readonly offset: import("../../../utils/props").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly onClick: import("../../../utils/props").BuildPropReturn<import("../../../utils/props").PropWrapper<() => void>, () => undefined, unknown, unknown, unknown>;
    readonly onClose: import("../../../utils/props").BuildPropReturn<import("../../../utils/props").PropWrapper<() => void>, unknown, true, unknown, unknown>;
    readonly position: import("../../../utils/props").BuildPropReturn<StringConstructor, "top-right", unknown, "top-right" | "top-left" | "bottom-right" | "bottom-left", unknown>;
    readonly showClose: import("../../../utils/props").BuildPropReturn<BooleanConstructor, true, unknown, unknown, unknown>;
    readonly title: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, unknown, unknown>;
    readonly type: import("../../../utils/props").BuildPropReturn<StringConstructor, "", unknown, "" | "success" | "warning" | "error" | "info", unknown>;
    readonly zIndex: import("../../../utils/props").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
}, {
    horizontalClass: import("vue").ComputedRef<"right" | "left">;
    typeClass: import("vue").ComputedRef<string>;
    positionStyle: import("vue").ComputedRef<CSSProperties>;
    visible: import("vue").Ref<boolean>;
    close: () => void;
    clearTimer: () => void;
    startTimer: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    destroy: () => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    readonly customClass?: unknown;
    readonly dangerouslyUseHTMLString?: unknown;
    readonly duration?: unknown;
    readonly iconClass?: unknown;
    readonly id?: unknown;
    readonly message?: unknown;
    readonly offset?: unknown;
    readonly onClick?: unknown;
    readonly onClose?: unknown;
    readonly position?: unknown;
    readonly showClose?: unknown;
    readonly title?: unknown;
    readonly type?: unknown;
    readonly zIndex?: unknown;
} & {
    type: import("../../../utils/props").BuildPropType<StringConstructor, "" | "success" | "warning" | "error" | "info", unknown>;
    zIndex: number;
    offset: number;
    position: import("../../../utils/props").BuildPropType<StringConstructor, "top-right" | "top-left" | "bottom-right" | "bottom-left", unknown>;
    title: string;
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
} & {
    onClick?: (() => void) | undefined;
}> & {
    onDestroy?: (() => any) | undefined;
}, {
    type: import("../../../utils/props").BuildPropType<StringConstructor, "" | "success" | "warning" | "error" | "info", unknown>;
    zIndex: number;
    offset: number;
    position: import("../../../utils/props").BuildPropType<StringConstructor, "top-right" | "top-left" | "bottom-right" | "bottom-left", unknown>;
    title: string;
    iconClass: string;
    id: string;
    onClick: () => void;
    showClose: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
    customClass: string;
    message: import("../../../utils/props").BuildPropType<import("../../../utils/props").PropWrapper<string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>, unknown, unknown>;
    duration: number;
    dangerouslyUseHTMLString: import("../../../utils/props").BuildPropType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
