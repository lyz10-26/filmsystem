import { setConfig } from 'element-plus/es/utils/config';
import { localeProviderMaker, LocaleInjectionKey } from 'element-plus/es/hooks';
import { version } from './version';

const makeInstaller = (components = []) => {
  const apps = [];
  const install = (app, opts) => {
    const defaultInstallOpt = {
      size: "",
      zIndex: 2e3
    };
    const option = Object.assign(defaultInstallOpt, opts);
    if (apps.includes(app))
      return;
    apps.push(app);
    components.forEach((c) => {
      app.use(c);
    });
    if (option.locale) {
      const localeProvides = localeProviderMaker(opts.locale);
      app.provide(LocaleInjectionKey, localeProvides);
    }
    app.config.globalProperties.$ELEMENT = option;
    setConfig(option);
  };
  return {
    version,
    install
  };
};

export { makeInstaller as default };
