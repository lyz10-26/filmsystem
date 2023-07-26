"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("element-plus/lib/utils/dom");
const isServer_1 = __importDefault(require("element-plus/lib/utils/isServer"));
const nodeList = new Map();
let startClick;
if (!isServer_1.default) {
    (0, dom_1.on)(document, 'mousedown', (e) => (startClick = e));
    (0, dom_1.on)(document, 'mouseup', (e) => {
        for (const handlers of nodeList.values()) {
            for (const { documentHandler } of handlers) {
                documentHandler(e, startClick);
            }
        }
    });
}
function createDocumentHandler(el, binding) {
    let excludes = [];
    if (Array.isArray(binding.arg)) {
        excludes = binding.arg;
    }
    else if (binding.arg instanceof HTMLElement) {
        excludes.push(binding.arg);
    }
    return function (mouseup, mousedown) {
        const popperRef = binding.instance.popperRef;
        const mouseUpTarget = mouseup.target;
        const mouseDownTarget = mousedown === null || mousedown === void 0 ? void 0 : mousedown.target;
        const isBound = !binding || !binding.instance;
        const isTargetExists = !mouseUpTarget || !mouseDownTarget;
        const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
        const isSelf = el === mouseUpTarget;
        const isTargetExcluded = (excludes.length &&
            excludes.some((item) => item === null || item === void 0 ? void 0 : item.contains(mouseUpTarget))) ||
            (excludes.length && excludes.includes(mouseDownTarget));
        const isContainedByPopper = popperRef &&
            (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
        if (isBound ||
            isTargetExists ||
            isContainedByEl ||
            isSelf ||
            isTargetExcluded ||
            isContainedByPopper) {
            return;
        }
        binding.value(mouseup, mousedown);
    };
}
const ClickOutside = {
    beforeMount(el, binding) {
        if (!nodeList.has(el)) {
            nodeList.set(el, []);
        }
        nodeList.get(el).push({
            documentHandler: createDocumentHandler(el, binding),
            bindingFn: binding.value,
        });
    },
    updated(el, binding) {
        if (!nodeList.has(el)) {
            nodeList.set(el, []);
        }
        const handlers = nodeList.get(el);
        const oldHandlerIndex = handlers.findIndex((item) => item.bindingFn === binding.oldValue);
        const newHandler = {
            documentHandler: createDocumentHandler(el, binding),
            bindingFn: binding.value,
        };
        if (oldHandlerIndex >= 0) {
            handlers.splice(oldHandlerIndex, 1, newHandler);
        }
        else {
            handlers.push(newHandler);
        }
    },
    unmounted(el) {
        nodeList.delete(el);
    },
};
exports.default = ClickOutside;
