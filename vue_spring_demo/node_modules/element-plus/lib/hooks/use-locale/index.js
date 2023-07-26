"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocaleInject = exports.localeProviderMaker = exports.useLocale = exports.LocaleInjectionKey = exports.useLocaleProps = void 0;
const vue_1 = require("vue");
const en_1 = __importDefault(require("element-plus/lib/locale/lang/en"));
exports.useLocaleProps = {
    locale: {
        type: Object,
    },
};
exports.LocaleInjectionKey = 'ElLocaleInjection';
let localeObjCache;
function translate(path, option, current) {
    const paths = path.split('.');
    let value;
    for (let i = 0, j = paths.length; i < j; i++) {
        const property = paths[i];
        value = current[property];
        if (i === j - 1)
            return template(value, option);
        if (!value)
            return '';
        current = value;
    }
}
const useLocale = () => {
    const vm = (0, vue_1.getCurrentInstance)();
    const props = vm.props;
    const locale = (0, vue_1.computed)(() => props.locale || en_1.default);
    const lang = (0, vue_1.computed)(() => locale.value.name);
    const _translator = (...args) => {
        const [path, option] = args;
        return translate(path, option, locale.value);
    };
    const t = (...args) => {
        return _translator(...args);
    };
    const provides = {
        locale,
        lang,
        t,
    };
    localeObjCache = provides;
    (0, vue_1.provide)(exports.LocaleInjectionKey, provides);
};
exports.useLocale = useLocale;
function template(str, option) {
    if (!str || !option)
        return str;
    return str.replace(/\{(\w+)\}/g, (_, key) => {
        return option[key];
    });
}
const localeProviderMaker = (locale = en_1.default) => {
    const lang = (0, vue_1.ref)(locale.name);
    const localeRef = (0, vue_1.ref)(locale);
    return {
        lang,
        locale: localeRef,
        t: (...args) => {
            const [path, option] = args;
            return translate(path, option, localeRef.value);
        },
    };
};
exports.localeProviderMaker = localeProviderMaker;
const useLocaleInject = () => {
    return (0, vue_1.inject)(exports.LocaleInjectionKey, localeObjCache || {
        lang: (0, vue_1.ref)(en_1.default.name),
        locale: (0, vue_1.ref)(en_1.default),
        t: (...args) => {
            const [path, option] = args;
            return translate(path, option, en_1.default);
        },
    });
};
exports.useLocaleInject = useLocaleInject;
