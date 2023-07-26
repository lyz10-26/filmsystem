"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPopperOptions = exports.defaultModifiers = exports.DEFAULT_FALLBACK_PLACEMENTS = void 0;
exports.DEFAULT_FALLBACK_PLACEMENTS = [];
exports.defaultModifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 12],
        },
    },
    {
        name: 'preventOverflow',
        options: {
            padding: {
                top: 2,
                bottom: 2,
                left: 5,
                right: 5,
            },
        },
    },
    {
        name: 'flip',
        options: {
            padding: 5,
            fallbackPlacements: [],
        },
    },
    {
        name: 'computeStyles',
        options: {
            gpuAcceleration: true,
            adaptive: true,
        },
    },
];
exports.defaultPopperOptions = {
    type: Object,
    default: () => {
        return {
            fallbackPlacements: exports.DEFAULT_FALLBACK_PLACEMENTS,
            strategy: 'fixed',
            modifiers: exports.defaultModifiers,
        };
    },
};
