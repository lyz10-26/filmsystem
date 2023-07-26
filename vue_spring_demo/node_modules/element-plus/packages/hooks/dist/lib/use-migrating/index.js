"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const error_1 = require("element-plus/lib/utils/error");
const util_1 = require("element-plus/lib/utils/util");
const useMigrating = function () {
    (0, vue_1.onMounted)(() => {
        const instance = (0, vue_1.getCurrentInstance)();
        if (process.env.NODE_ENV === 'production')
            return;
        if (!instance.vnode)
            return;
        const { props = {} } = getMigratingConfig();
        const { data } = instance;
        const definedProps = data.attrs || {};
        for (let propName in definedProps) {
            propName = (0, util_1.kebabCase)(propName);
            if (props[propName]) {
                (0, error_1.debugWarn)('Element Migrating', `[${instance.proxy.$options.name}][Attribute]: ${props[propName]}`);
            }
        }
    });
    const getMigratingConfig = function () {
        return {
            props: {},
            events: {},
        };
    };
    return {
        getMigratingConfig,
    };
};
exports.default = useMigrating;
