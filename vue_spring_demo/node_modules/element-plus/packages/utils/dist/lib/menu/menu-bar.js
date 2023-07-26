"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_item_1 = __importDefault(require("./menu-item"));
class Menu {
    constructor(domNode) {
        this.domNode = domNode;
        this.init();
    }
    init() {
        const menuChildren = this.domNode.childNodes;
        Array.from(menuChildren, (child) => {
            if (child.nodeType === 1) {
                new menu_item_1.default(child);
            }
        });
    }
}
exports.default = Menu;
