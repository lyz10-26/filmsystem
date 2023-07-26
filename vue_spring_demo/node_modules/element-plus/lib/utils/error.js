"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugWarn = exports.throwError = void 0;
class ElementPlusError extends Error {
    constructor(m) {
        super(m);
        this.name = 'ElementPlusError';
    }
}
function throwError(scope, m) {
    throw new ElementPlusError(`[${scope}] ${m}`);
}
exports.throwError = throwError;
function debugWarn(scope, message) {
    if (process.env.NODE_ENV !== 'production') {
        console.warn(new ElementPlusError(`[${scope}] ${message}`));
    }
}
exports.debugWarn = debugWarn;
