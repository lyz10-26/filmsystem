"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const dom_1 = require("element-plus/lib/utils/dom");
const aria_1 = require("element-plus/lib/utils/aria");
const isServer_1 = __importDefault(require("element-plus/lib/utils/isServer"));
const modalStack = [];
const closeModal = (e) => {
    if (modalStack.length === 0)
        return;
    if (e.code === aria_1.EVENT_CODE.esc) {
        e.stopPropagation();
        const topModal = modalStack[modalStack.length - 1];
        topModal.handleClose();
    }
};
exports.default = (instance, visibleRef) => {
    (0, vue_1.watch)(() => visibleRef.value, (val) => {
        if (val) {
            modalStack.push(instance);
        }
        else {
            modalStack.splice(modalStack.findIndex((modal) => modal === instance), 1);
        }
    });
};
if (!isServer_1.default) {
    (0, dom_1.on)(document, 'keydown', closeModal);
}
