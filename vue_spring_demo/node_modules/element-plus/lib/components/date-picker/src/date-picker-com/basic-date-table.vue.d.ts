import dayjs from 'dayjs';
import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    date: {
        type: PropType<dayjs.Dayjs>;
    };
    minDate: {
        type: PropType<dayjs.Dayjs>;
    };
    maxDate: {
        type: PropType<dayjs.Dayjs>;
    };
    parsedValue: {
        type: PropType<dayjs.Dayjs | dayjs.Dayjs[]>;
    };
    selectionMode: {
        type: StringConstructor;
        default: string;
    };
    showWeekNumber: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledDate: {
        type: FunctionConstructor;
    };
    cellClassName: {
        type: FunctionConstructor;
    };
    rangeState: {
        type: ObjectConstructor;
        default: () => {
            endDate: null;
            selecting: boolean;
        };
    };
}, {
    handleMouseMove: (event: any) => void;
    t: (...args: any[]) => string;
    rows: import("vue").ComputedRef<never[][]>;
    isWeekActive: (cell: any) => boolean;
    getCellClasses: (cell: any) => string;
    WEEKS: import("vue").ComputedRef<string[]>;
    handleClick: (event: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select" | "pick" | "changerange")[], "select" | "pick" | "changerange", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    date?: unknown;
    minDate?: unknown;
    maxDate?: unknown;
    parsedValue?: unknown;
    selectionMode?: unknown;
    showWeekNumber?: unknown;
    disabledDate?: unknown;
    cellClassName?: unknown;
    rangeState?: unknown;
} & {
    selectionMode: string;
    showWeekNumber: boolean;
    rangeState: Record<string, any>;
} & {
    date?: dayjs.Dayjs | undefined;
    disabledDate?: Function | undefined;
    cellClassName?: Function | undefined;
    parsedValue?: dayjs.Dayjs | dayjs.Dayjs[] | undefined;
    minDate?: dayjs.Dayjs | undefined;
    maxDate?: dayjs.Dayjs | undefined;
}> & {
    onSelect?: ((...args: any[]) => any) | undefined;
    onPick?: ((...args: any[]) => any) | undefined;
    onChangerange?: ((...args: any[]) => any) | undefined;
}, {
    selectionMode: string;
    showWeekNumber: boolean;
    rangeState: Record<string, any>;
}>;
export default _default;
