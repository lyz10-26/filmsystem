"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aria_1 = require("../aria");
class SubMenu {
    constructor(parent, domNode) {
        this.parent = parent;
        this.domNode = domNode;
        this.subIndex = 0;
        this.subIndex = 0;
        this.init();
    }
    init() {
        this.subMenuItems = this.domNode.querySelectorAll('li');
        this.addListeners();
    }
    gotoSubIndex(idx) {
        if (idx === this.subMenuItems.length) {
            idx = 0;
        }
        else if (idx < 0) {
            idx = this.subMenuItems.length - 1;
        }
        ;
        this.subMenuItems[idx].focus();
        this.subIndex = idx;
    }
    addListeners() {
        const parentNode = this.parent.domNode;
        Array.prototype.forEach.call(this.subMenuItems, (el) => {
            el.addEventListener('keydown', (event) => {
                let prevDef = false;
                switch (event.code) {
                    case aria_1.EVENT_CODE.down: {
                        this.gotoSubIndex(this.subIndex + 1);
                        prevDef = true;
                        break;
                    }
                    case aria_1.EVENT_CODE.up: {
                        this.gotoSubIndex(this.subIndex - 1);
                        prevDef = true;
                        break;
                    }
                    case aria_1.EVENT_CODE.tab: {
                        (0, aria_1.triggerEvent)(parentNode, 'mouseleave');
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
                    event.stopPropagation();
                }
                return false;
            });
        });
    }
}
exports.default = SubMenu;
