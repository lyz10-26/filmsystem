import type { InjectionKey } from 'vue';
import type { ButtonProps } from 'element-plus/lib/components/button';
export interface ElButtonGroupContext {
    size?: ButtonProps['size'];
    type?: ButtonProps['type'];
}
export declare const elButtonGroupKey: InjectionKey<ElButtonGroupContext>;
