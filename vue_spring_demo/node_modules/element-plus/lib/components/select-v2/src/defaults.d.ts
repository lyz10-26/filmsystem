import type { PropType } from 'vue';
import type { ComponentSize } from 'element-plus/es/utils/types';
import type { OptionType } from './select.types';
import type { Options } from 'element-plus/es/components/popper';
export declare const SelectProps: {
    allowCreate: BooleanConstructor;
    autocomplete: {
        type: PropType<"none" | "both" | "inline" | "list">;
        default: string;
    };
    automaticDropdown: BooleanConstructor;
    clearable: BooleanConstructor;
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
    collapseTags: BooleanConstructor;
    defaultFirstOption: BooleanConstructor;
    disabled: BooleanConstructor;
    estimatedOptionHeight: {
        type: NumberConstructor;
        default: undefined;
    };
    filterable: BooleanConstructor;
    filterMethod: FunctionConstructor;
    height: {
        type: NumberConstructor;
        default: number;
    };
    itemHeight: {
        type: NumberConstructor;
        default: number;
    };
    id: StringConstructor;
    loading: BooleanConstructor;
    loadingText: StringConstructor;
    label: StringConstructor;
    modelValue: PropType<any>;
    multiple: BooleanConstructor;
    multipleLimit: {
        type: NumberConstructor;
        default: number;
    };
    name: StringConstructor;
    noDataText: StringConstructor;
    noMatchText: StringConstructor;
    remoteMethod: FunctionConstructor;
    reserveKeyword: BooleanConstructor;
    options: {
        type: PropType<OptionType<any>[]>;
        required: boolean;
    };
    placeholder: {
        type: StringConstructor;
    };
    popperAppendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    popperClass: {
        type: StringConstructor;
        default: string;
    };
    popperOptions: {
        type: PropType<Partial<Options>>;
        default: () => Partial<Options>;
    };
    remote: BooleanConstructor;
    size: {
        type: PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
    valueKey: {
        type: StringConstructor;
        default: string;
    };
};
export declare const OptionProps: {
    data: ArrayConstructor;
    disabled: BooleanConstructor;
    hovering: BooleanConstructor;
    item: ObjectConstructor;
    index: NumberConstructor;
    style: ObjectConstructor;
    selected: BooleanConstructor;
    created: BooleanConstructor;
};
