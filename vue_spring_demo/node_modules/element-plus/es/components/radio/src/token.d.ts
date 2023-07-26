import type { InjectionKey } from 'vue';
import type { ComponentSize } from 'element-plus/es/utils/types';
declare type IModelType = boolean | string | number;
export interface RadioGroupContext {
    name: 'ElRadioGroup';
    modelValue: IModelType;
    fill: string;
    textColor: string;
    disabled: boolean;
    size: ComponentSize;
    radioGroupSize: ComponentSize;
    changeEvent: (val: IModelType) => void;
}
declare const radioGroupKey: InjectionKey<RadioGroupContext>;
export default radioGroupKey;
