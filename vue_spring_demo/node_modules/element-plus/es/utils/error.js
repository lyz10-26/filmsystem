class ElementPlusError extends Error {
    constructor(m) {
        super(m);
        this.name = 'ElementPlusError';
    }
}
export function throwError(scope, m) {
    throw new ElementPlusError(`[${scope}] ${m}`);
}
export function debugWarn(scope, message) {
    if (process.env.NODE_ENV !== 'production') {
        console.warn(new ElementPlusError(`[${scope}] ${message}`));
    }
}
