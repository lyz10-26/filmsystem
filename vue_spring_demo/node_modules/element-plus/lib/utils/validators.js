"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDatePickType = exports.isValidComponentSize = exports.isValidWidthUnit = void 0;
const util_1 = require("./util");
const isValidWidthUnit = (val) => {
    if ((0, util_1.isNumber)(val)) {
        return true;
    }
    else {
        return (['px', 'rem', 'em', 'vw', '%', 'vmin', 'vmax'].some((unit) => val.endsWith(unit)) || val.startsWith('calc'));
    }
};
exports.isValidWidthUnit = isValidWidthUnit;
const isValidComponentSize = (val) => ['', 'large', 'medium', 'small', 'mini'].includes(val);
exports.isValidComponentSize = isValidComponentSize;
const isValidDatePickType = (val) => [
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
exports.isValidDatePickType = isValidDatePickType;
