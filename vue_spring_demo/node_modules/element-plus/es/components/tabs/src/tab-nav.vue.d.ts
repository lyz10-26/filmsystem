import type { PropType } from 'vue';
import type { Nullable } from 'element-plus/es/utils/types';
import type { RootTabs, Pane, ITabType } from './token';
declare type RefElement = Nullable<HTMLElement>;
declare const _default: import("vue").DefineComponent<{
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
    navScroll$: import("vue").Ref<RefElement>;
    nav$: import("vue").Ref<RefElement>;
    el$: import("vue").Ref<RefElement>;
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
}>;
export default _default;
