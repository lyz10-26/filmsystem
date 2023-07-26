import installer from './defaults';
export { default } from './defaults';
export * from 'element-plus/es/components';
export * from 'element-plus/es/directives';
export * from 'element-plus/es/hooks';
export * from 'element-plus/es/tokens';
export { default as makeInstaller } from './make-installer';

const install = installer.install;
const version = installer.version;

export { install, version };
