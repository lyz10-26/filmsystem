import { isNumber } from './util';
export const isValidWidthUnit = (val) => {
    if (isNumber(val)) {
        return true;
    }
    else {
        return (['px', 'rem', 'em', 'vw', '%', 'vmin', 'vmax'].some((unit) => val.endsWith(unit)) || val.startsWith('calc'));
    }
};
export const isValidComponentSize = (val) => ['', 'large', 'medium', 'small', 'mini'].includes(val);
export const isValidDatePickType = (val) => [
    'year',
    'month',
    'date',
    'dates',
    'week',
    'datetime',
    'datetimerange',
    'daterange',
    'monthrange',
].includes(val);
