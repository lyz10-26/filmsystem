"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKorean = void 0;
function isKorean(text) {
    const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
    return reg.test(text);
}
exports.isKorean = isKorean;
