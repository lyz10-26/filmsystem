"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = exports.getConfig = void 0;
let $ELEMENT = {};
const setConfig = (option) => {
    $ELEMENT = option;
};
exports.setConfig = setConfig;
const getConfig = (key) => {
    return $ELEMENT[key];
};
exports.getConfig = getConfig;
