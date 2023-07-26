"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isServer_1 = __importDefault(require("./isServer"));
const configs = __importStar(require("./config"));
const dom_1 = require("./dom");
const aria_1 = require("./aria");
const onTouchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
const onModalClick = () => {
    PopupManager === null || PopupManager === void 0 ? void 0 : PopupManager.doOnModalClick();
};
let hasModal = false;
let zIndex;
const getModal = function () {
    if (isServer_1.default)
        return;
    let modalDom = PopupManager.modalDom;
    if (modalDom) {
        hasModal = true;
    }
    else {
        hasModal = false;
        modalDom = document.createElement('div');
        PopupManager.modalDom = modalDom;
        (0, dom_1.on)(modalDom, 'touchmove', onTouchMove);
        (0, dom_1.on)(modalDom, 'click', onModalClick);
    }
    return modalDom;
};
const instances = {};
const PopupManager = {
    modalFade: true,
    modalDom: undefined,
    zIndex,
    getInstance(id) {
        return instances[id];
    },
    register(id, instance) {
        if (id && instance) {
            instances[id] = instance;
        }
    },
    deregister(id) {
        if (id) {
            instances[id] = null;
            delete instances[id];
        }
    },
    nextZIndex() {
        return ++PopupManager.zIndex;
    },
    modalStack: [],
    doOnModalClick() {
        const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
        if (!topItem)
            return;
        const instance = PopupManager.getInstance(topItem.id);
        if (instance && instance.closeOnClickModal.value) {
            instance.close();
        }
    },
    openModal(id, zIndex, dom, modalClass, modalFade) {
        if (isServer_1.default)
            return;
        if (!id || zIndex === undefined)
            return;
        this.modalFade = modalFade;
        const modalStack = this.modalStack;
        for (let i = 0, j = modalStack.length; i < j; i++) {
            const item = modalStack[i];
            if (item.id === id) {
                return;
            }
        }
        const modalDom = getModal();
        (0, dom_1.addClass)(modalDom, 'v-modal');
        if (this.modalFade && !hasModal) {
            (0, dom_1.addClass)(modalDom, 'v-modal-enter');
        }
        if (modalClass) {
            const classArr = modalClass.trim().split(/\s+/);
            classArr.forEach((item) => (0, dom_1.addClass)(modalDom, item));
        }
        setTimeout(() => {
            (0, dom_1.removeClass)(modalDom, 'v-modal-enter');
        }, 200);
        if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
            dom.parentNode.appendChild(modalDom);
        }
        else {
            document.body.appendChild(modalDom);
        }
        if (zIndex) {
            modalDom.style.zIndex = String(zIndex);
        }
        modalDom.tabIndex = 0;
        modalDom.style.display = '';
        this.modalStack.push({ id, zIndex, modalClass });
    },
    closeModal(id) {
        const modalStack = this.modalStack;
        const modalDom = getModal();
        if (modalStack.length > 0) {
            const topItem = modalStack[modalStack.length - 1];
            if (topItem.id === id) {
                if (topItem.modalClass) {
                    const classArr = topItem.modalClass.trim().split(/\s+/);
                    classArr.forEach((item) => (0, dom_1.removeClass)(modalDom, item));
                }
                modalStack.pop();
                if (modalStack.length > 0) {
                    modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
                }
            }
            else {
                for (let i = modalStack.length - 1; i >= 0; i--) {
                    if (modalStack[i].id === id) {
                        modalStack.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if (modalStack.length === 0) {
            if (this.modalFade) {
                (0, dom_1.addClass)(modalDom, 'v-modal-leave');
            }
            setTimeout(() => {
                if (modalStack.length === 0) {
                    if (modalDom.parentNode)
                        modalDom.parentNode.removeChild(modalDom);
                    modalDom.style.display = 'none';
                    PopupManager.modalDom = undefined;
                }
                (0, dom_1.removeClass)(modalDom, 'v-modal-leave');
            }, 200);
        }
    },
};
Object.defineProperty(PopupManager, 'zIndex', {
    configurable: true,
    get() {
        if (zIndex === undefined) {
            zIndex = configs.getConfig('zIndex') || 2000;
        }
        return zIndex;
    },
    set(value) {
        zIndex = value;
    },
});
const getTopPopup = function () {
    if (isServer_1.default)
        return;
    if (PopupManager.modalStack.length > 0) {
        const topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
        if (!topPopup)
            return;
        const instance = PopupManager.getInstance(topPopup.id);
        return instance;
    }
};
if (!isServer_1.default) {
    (0, dom_1.on)(window, 'keydown', function (event) {
        if (event.code === aria_1.EVENT_CODE.esc) {
            const topPopup = getTopPopup();
            if (topPopup && topPopup.closeOnPressEscape.value) {
                topPopup.handleClose
                    ? topPopup.handleClose()
                    : topPopup.handleAction
                        ? topPopup.handleAction('cancel')
                        : topPopup.close();
            }
        }
    });
}
exports.default = PopupManager;
