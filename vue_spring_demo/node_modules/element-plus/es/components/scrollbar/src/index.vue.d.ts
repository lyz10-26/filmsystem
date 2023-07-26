import type { CSSProperties, PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    maxHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    native: {
        type: BooleanConstructor;
        default: boolean;
    };
    wrapStyle: {
        type: PropType<string | CSSProperties[]>;
        default: string;
    };
    wrapClass: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    viewClass: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    viewStyle: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    noresize: BooleanConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
    always: {
        type: BooleanConstructor;
        default: boolean;
    };
    minSize: {
        type: NumberConstructor;
        default: number;
    };
}, {
    moveX: import("vue").Ref<number>;
    moveY: import("vue").Ref<number>;
    ratioX: import("vue").Ref<number>;
    ratioY: import("vue").Ref<number>;
    sizeWidth: import("vue").Ref<string>;
    sizeHeight: import("vue").Ref<string>;
    style: import("vue").ComputedRef<CSSProperties>;
    scrollbar: import("vue").Ref<null>;
    wrap: import("vue").Ref<null>;
    resize: import("vue").Ref<null>;
    update: () => void;
    handleScroll: () => void;
    setScrollTop: (value: number) => void;
    setScrollLeft: (value: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "scroll"[], "scroll", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    height?: unknown;
    maxHeight?: unknown;
    native?: unknown;
    wrapStyle?: unknown;
    wrapClass?: unknown;
    viewClass?: unknown;
    viewStyle?: unknown;
    noresize?: unknown;
    tag?: unknown;
    always?: unknown;
    minSize?: unknown;
} & {
    height: string | number;
    always: boolean;
    maxHeight: string | number;
    native: boolean;
    wrapStyle: string | CSSProperties[];
    wrapClass: string | unknown[];
    viewClass: string | unknown[];
    viewStyle: string | unknown[];
    noresize: boolean;
    tag: string;
    minSize: number;
} & {}> & {
    onScroll?: ((...args: any[]) => any) | undefined;
}, {
    height: string | number;
    always: boolean;
    maxHeight: string | number;
    native: boolean;
    wrapStyle: string | CSSProperties[];
    wrapClass: string | unknown[];
    viewClass: string | unknown[];
    viewStyle: string | unknown[];
    noresize: boolean;
    tag: string;
    minSize: number;
}>;
export default _default;
