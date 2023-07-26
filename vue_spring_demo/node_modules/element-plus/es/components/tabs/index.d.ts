export declare const ElTabs: import("../../utils/types").SFCWithInstall<import("vue").DefineComponent<{
    type: {
        type: import("vue").PropType<import("./src/token").ITabType>;
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
        type: import("vue").PropType<import("./src/token").ITabPosition>;
        default: string;
    };
    beforeLeave: {
        type: import("vue").PropType<import("./src/token").BeforeLeave>;
        default: null;
    };
    stretch: BooleanConstructor;
}, {
    nav$: import("vue").Ref<import("vue").DefineComponent<{
        panes: {
            type: import("vue").PropType<import("./src/token").Pane[]>;
            default: () => import("./src/token").Pane[];
        };
        currentName: {
            type: StringConstructor;
            default: string;
        };
        editable: BooleanConstructor;
        onTabClick: {
            type: import("vue").PropType<(tab: import("./src/token").Pane, tabName: string, ev: Event) => void>;
            default: () => void;
        };
        onTabRemove: {
            type: import("vue").PropType<(tab: import("./src/token").Pane, ev: Event) => void>;
            default: () => void;
        };
        type: {
            type: import("vue").PropType<import("./src/token").ITabType>;
            default: string;
        };
        stretch: BooleanConstructor;
    }, {
        rootTabs: import("./src/token").RootTabs;
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
        type: import("./src/token").ITabType;
        stretch: boolean;
        editable: boolean;
        panes: import("./src/token").Pane[];
        currentName: string;
        onTabClick: (tab: import("./src/token").Pane, tabName: string, ev: Event) => void;
        onTabRemove: (tab: import("./src/token").Pane, ev: Event) => void;
    } & {}>, {
        type: import("./src/token").ITabType;
        stretch: boolean;
        editable: boolean;
        panes: import("./src/token").Pane[];
        currentName: string;
        onTabClick: (tab: import("./src/token").Pane, tabName: string, ev: Event) => void;
        onTabRemove: (tab: import("./src/token").Pane, ev: Event) => void;
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
    type: import("./src/token").ITabType;
    closable: boolean;
    modelValue: string;
    stretch: boolean;
    editable: boolean;
    beforeLeave: import("./src/token").BeforeLeave;
    activeName: string;
    addable: boolean;
    tabPosition: import("./src/token").ITabPosition;
} & {}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    "onTab-click"?: ((...args: any[]) => any) | undefined;
    onEdit?: ((...args: any[]) => any) | undefined;
    "onTab-remove"?: ((...args: any[]) => any) | undefined;
    "onTab-add"?: ((...args: any[]) => any) | undefined;
}, {
    type: import("./src/token").ITabType;
    closable: boolean;
    modelValue: string;
    stretch: boolean;
    editable: boolean;
    beforeLeave: import("./src/token").BeforeLeave;
    activeName: string;
    addable: boolean;
    tabPosition: import("./src/token").ITabPosition;
}>> & {
    TabPane: import("vue").DefineComponent<{
        label: {
            type: StringConstructor;
            default: string;
        };
        name: {
            type: StringConstructor;
            default: string;
        };
        closable: BooleanConstructor;
        disabled: BooleanConstructor;
        lazy: BooleanConstructor;
    }, {
        index: import("vue").Ref<string>;
        loaded: import("vue").Ref<boolean>;
        isClosable: import("vue").ComputedRef<boolean>;
        active: import("vue").ComputedRef<boolean>;
        paneName: import("vue").ComputedRef<string>;
        shouldBeRender: import("vue").ComputedRef<boolean>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
        label?: unknown;
        name?: unknown;
        closable?: unknown;
        disabled?: unknown;
        lazy?: unknown;
    } & {
        name: string;
        closable: boolean;
        disabled: boolean;
        label: string;
        lazy: boolean;
    } & {}>, {
        name: string;
        closable: boolean;
        disabled: boolean;
        label: string;
        lazy: boolean;
    }>;
};
export default ElTabs;
export declare const ElTabPane: import("../../utils/types").SFCWithInstall<import("vue").DefineComponent<{
    label: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    closable: BooleanConstructor;
    disabled: BooleanConstructor;
    lazy: BooleanConstructor;
}, {
    index: import("vue").Ref<string>;
    loaded: import("vue").Ref<boolean>;
    isClosable: import("vue").ComputedRef<boolean>;
    active: import("vue").ComputedRef<boolean>;
    paneName: import("vue").ComputedRef<string>;
    shouldBeRender: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    label?: unknown;
    name?: unknown;
    closable?: unknown;
    disabled?: unknown;
    lazy?: unknown;
} & {
    name: string;
    closable: boolean;
    disabled: boolean;
    label: string;
    lazy: boolean;
} & {}>, {
    name: string;
    closable: boolean;
    disabled: boolean;
    label: string;
    lazy: boolean;
}>>;
