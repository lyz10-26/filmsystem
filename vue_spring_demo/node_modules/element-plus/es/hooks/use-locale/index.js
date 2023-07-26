import { computed, getCurrentInstance, inject, provide, ref } from 'vue';
import English from 'element-plus/es/locale/lang/en';
export const useLocaleProps = {
    locale: {
        type: Object,
    },
};
export const LocaleInjectionKey = 'ElLocaleInjection';
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
export const useLocale = () => {
    const vm = getCurrentInstance();
    const props = vm.props;
    const locale = computed(() => props.locale || English);
    const lang = computed(() => locale.value.name);
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
    provide(LocaleInjectionKey, provides);
};
function template(str, option) {
    if (!str || !option)
        return str;
    return str.replace(/\{(\w+)\}/g, (_, key) => {
        return option[key];
    });
}
export const localeProviderMaker = (locale = English) => {
    const lang = ref(locale.name);
    const localeRef = ref(locale);
    return {
        lang,
        locale: localeRef,
        t: (...args) => {
            const [path, option] = args;
            return translate(path, option, localeRef.value);
        },
    };
};
export const useLocaleInject = () => {
    return inject(LocaleInjectionKey, localeObjCache || {
        lang: ref(English.name),
        locale: ref(English),
        t: (...args) => {
            const [path, option] = args;
            return translate(path, option, English);
        },
    });
};
