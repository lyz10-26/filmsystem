'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('element-plus/lib/utils/config');
var hooks = require('element-plus/lib/hooks');
var version = require('./version');

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
      const localeProvides = hooks.localeProviderMaker(opts.locale);
      app.provide(hooks.LocaleInjectionKey, localeProvides);
    }
    app.config.globalProperties.$ELEMENT = option;
    config.setConfig(option);
  };
  return {
    version: version.version,
    install
  };
};

exports["default"] = makeInstaller;
