"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocale = exports.use = exports.t = exports.restoreHandler = exports.i18n = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const error_1 = require("element-plus/lib/utils/error");
const en_1 = __importDefault(require("./lang/en"));
let lang = en_1.default;
let i18nHandler = null;
const i18n = (fn) => {
    i18nHandler = fn;
};
exports.i18n = i18n;
const restoreHandler = () => (i18nHandler = defaultTranslator);
exports.restoreHandler = restoreHandler;
function template(str, option) {
    if (!str || !option)
        return str;
    return str.replace(/\{(\w+)\}/g, (_, key) => {
        return option[key];
    });
}
const defaultTranslator = (...args) => {
    const [path, option] = args;
    let value;
    const array = path.split('.');
    let current = lang;
    for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i];
        value = current[property];
        if (i === j - 1)
            return template(value, option);
        if (!value)
            return '';
        current = value;
    }
};
const t = (...args) => {
    if (i18nHandler) {
        const translation = i18nHandler(...args);
        return translation || defaultTranslator(...args);
    }
    return defaultTranslator(...args);
};
exports.t = t;
const use = (l) => {
    (0, error_1.debugWarn)('deprecation', `:
      The previous i18n usage is deprecated please update to
      the new one to get reactive i18n translations, refer to:
      https://element-plus.org/#/en-US/component/i18n
    `);
    lang = l || lang;
    if (lang.name) {
        dayjs_1.default.locale(lang.name);
    }
};
exports.use = use;
exports.setLocale = exports.use;
