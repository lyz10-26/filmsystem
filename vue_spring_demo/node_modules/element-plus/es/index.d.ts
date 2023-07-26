export * from './components';
export * from './directives';
export * from './hooks';
export * from './tokens';
export { default as makeInstaller } from './make-installer';
export { default } from './defaults';
export declare const install: (app: import("vue").App<any>, opts: import("./utils/config").InstallOptions) => void;
export declare const version: string;
