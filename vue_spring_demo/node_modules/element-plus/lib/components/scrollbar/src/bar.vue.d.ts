import type { Ref } from 'vue';
declare const _default: import("vue").DefineComponent<{
    vertical: BooleanConstructor;
    size: StringConstructor;
    move: NumberConstructor;
    ratio: NumberConstructor;
    always: BooleanConstructor;
}, {
    instance: Ref<null>;
    thumb: Ref<null>;
    bar: import("vue").ComputedRef<{
        offset: string;
        scroll: string;
        scrollSize: string;
        size: string;
        key: string;
        axis: string;
        client: string;
        direction: string;
    } | {
        offset: string;
        scroll: string;
        scrollSize: string;
        size: string;
        key: string;
        axis: string;
        client: string;
        direction: string;
    }>;
    clickTrackHandler: (e: MouseEvent) => void;
    clickThumbHandler: (e: MouseEvent) => void;
    thumbStyle: import("vue").ComputedRef<any>;
    visible: Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    vertical?: unknown;
    size?: unknown;
    move?: unknown;
    ratio?: unknown;
    always?: unknown;
} & {
    vertical: boolean;
    always: boolean;
} & {
    size?: string | undefined;
    move?: number | undefined;
    ratio?: number | undefined;
}>, {
    vertical: boolean;
    always: boolean;
}>;
export default _default;
