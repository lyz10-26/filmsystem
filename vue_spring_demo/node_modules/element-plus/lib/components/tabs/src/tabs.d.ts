import type { PropType } from 'vue';
import type { BeforeLeave, ITabType, ITabPosition, Pane, RootTabs } from './token';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: PropType<ITabType>;
        default: string;
    };
    activeName: {
        type: StringConstructor;
        default: string;
    };
    closable: BooleanConstructor;
    addable: BooleanConstructor;
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    editable: BooleanConstructor;
    tabPosition: {
        type: PropType<ITabPosition>;
        default: string;
    };
    beforeLeave: {
        type: PropType<BeforeLeave>;
        default: null;
    };
    stretch: BooleanConstructor;
}, {
    nav$: import("vue").Ref<import("vue").DefineComponent<{
        panes: {
            type: PropType<Pane[]>;
            default: () => Pane[];
        };
        currentName: {
            type: StringConstructor;
            default: string;
        };
        editable: BooleanConstructor;
        onTabClick: {
            type: PropType<(tab: Pane, tabName: string, ev: Event) => void>;
            default: () => void;
        };
        onTabRemove: {
            type: PropType<(tab: Pane, ev: Event) => void>;
            default: () => void;
        };
        type: {
            type: PropType<ITabType>;
            default: string;
        };
        stretch: BooleanConstructor;
    }, {
        rootTabs: RootTabs;
        scrollable: import("vue").Ref<boolean | {
            next?: boolean | undefined;
            prev?: number | undefined;
        }>;
        navOffset: import("vue").Ref<number>;
        isFocus: import("vue").Ref<boolean>;
        focusable: import("vue").Ref<boolean>;
        navScroll$: import("vue").Ref<HTMLElement | null>;
        nav$: import("vue").Ref<HTMLElement | null>;
        el$: import("vue").Ref<HTMLElement | null>;
        sizeName: import("vue").ComputedRef<"height" | "width">;
        navStyle: import("vue").ComputedRef<{
            transform: string;
        }>;
        scrollPrev: () => void;
        scrollNext: () => void;
        scrollToActiveTab: () => void;
        update: () => void;
        changeTab: (e: any) => void;
        setFocus: () => void;
        removeFocus: () => void;
        visibilityChangeHandler: () => void;
        windowBlurHandler: () => void;
        windowFocusHandler: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
        panes?: unknown;
        currentName?: unknown;
        editable?: unknown;
        onTabClick?: unknown;
        onTabRemove?: unknown;
        type?: unknown;
        stretch?: unknown;
    } & {
        type: ITabType;
        stretch: boolean;
        editable: boolean;
        panes: Pane[];
        currentName: string;
        onTabClick: (tab: Pane, tabName: string, ev: Event) => void;
        onTabRemove: (tab: Pane, ev: Event) => void;
    } & {}>, {
        type: ITabType;
        stretch: boolean;
        editable: boolean;
        panes: Pane[];
        currentName: string;
        onTabClick: (tab: Pane, tabName: string, ev: Event) => void;
        onTabRemove: (tab: Pane, ev: Event) => void;
    }>>;
    handleTabClick: (tab: any, tabName: any, event: any) => void;
    handleTabRemove: (pane: any, ev: any) => void;
    handleTabAdd: () => void;
    currentName: import("vue").Ref<string>;
    panes: import("vue").Ref<never[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "input" | "tab-click" | "edit" | "tab-remove" | "tab-add")[], "update:modelValue" | "input" | "tab-click" | "edit" | "tab-remove" | "tab-add", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type?: unknown;
    activeName?: unknown;
    closable?: unknown;
    addable?: unknown;
    modelValue?: unknown;
    editable?: unknown;
    tabPosition?: unknown;
    beforeLeave?: unknown;
    stretch?: unknown;
} & {
    type: ITabType;
    closable: boolean;
    modelValue: string;
    stretch: boolean;
    editable: boolean;
    beforeLeave: BeforeLeave;
    activeName: string;
    addable: boolean;
    tabPosition: ITabPosition;
} & {}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    "onTab-click"?: ((...args: any[]) => any) | undefined;
    onEdit?: ((...args: any[]) => any) | undefined;
    "onTab-remove"?: ((...args: any[]) => any) | undefined;
    "onTab-add"?: ((...args: any[]) => any) | undefined;
}, {
    type: ITabType;
    closable: boolean;
    modelValue: string;
    stretch: boolean;
    editable: boolean;
    beforeLeave: BeforeLeave;
    activeName: string;
    addable: boolean;
    tabPosition: ITabPosition;
}>;
export default _default;
