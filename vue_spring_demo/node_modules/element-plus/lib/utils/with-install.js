"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withNoopInstall = exports.withInstallFunction = exports.withInstall = void 0;
const shared_1 = require("@vue/shared");
const withInstall = (main, extra) => {
    ;
    main.install = (app) => {
        for (const comp of [main, ...Object.values(extra !== null && extra !== void 0 ? extra : {})]) {
            app.component(comp.name, comp);
        }
    };
    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            ;
            main[key] = comp;
        }
    }
    return main;
};
exports.withInstall = withInstall;
const withInstallFunction = (fn, name) => {
    ;
    fn.install = (app) => {
        app.config.globalProperties[name] = fn;
    };
    return fn;
};
exports.withInstallFunction = withInstallFunction;
const withNoopInstall = (component) => {
    ;
    component.install = shared_1.NOOP;
    return component;
};
exports.withNoopInstall = withNoopInstall;
