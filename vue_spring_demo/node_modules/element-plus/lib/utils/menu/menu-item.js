"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aria_1 = require("../aria");
const submenu_1 = __importDefault(require("./submenu"));
class MenuItem {
    constructor(domNode) {
        this.domNode = domNode;
        this.submenu = null;
        this.submenu = null;
        this.init();
    }
    init() {
        this.domNode.setAttribute('tabindex', '0');
        const menuChild = this.domNode.querySelector('.el-menu');
        if (menuChild) {
            this.submenu = new submenu_1.default(this, menuChild);
        }
        this.addListeners();
    }
    addListeners() {
        this.domNode.addEventListener('keydown', (event) => {
            let prevDef = false;
            switch (event.code) {
                case aria_1.EVENT_CODE.down: {
                    (0, aria_1.triggerEvent)(event.currentTarget, 'mouseenter');
                    this.submenu && this.submenu.gotoSubIndex(0);
                    prevDef = true;
                    break;
                }
                case aria_1.EVENT_CODE.up: {
                    (0, aria_1.triggerEvent)(event.currentTarget, 'mouseenter');
                    this.submenu &&
                        this.submenu.gotoSubIndex(this.submenu.subMenuItems.length - 1);
                    prevDef = true;
                    break;
                }
                case aria_1.EVENT_CODE.tab: {
                    (0, aria_1.triggerEvent)(event.currentTarget, 'mouseleave');
                    break;
                }
                case aria_1.EVENT_CODE.enter:
                case aria_1.EVENT_CODE.space: {
                    prevDef = true;
                    event.currentTarget.click();
                    break;
                }
            }
            if (prevDef) {
                event.preventDefault();
            }
        });
    }
}
exports.default = MenuItem;
