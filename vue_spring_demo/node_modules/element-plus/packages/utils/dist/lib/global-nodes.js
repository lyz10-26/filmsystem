"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeGlobalNodesTarget = exports.removeGlobalNode = exports.createGlobalNode = void 0;
const isServer_1 = __importDefault(require("./isServer"));
const globalNodes = [];
let target = isServer_1.default ? undefined : document.body;
function createGlobalNode(id) {
    const el = document.createElement('div');
    if (id !== undefined) {
        el.id = id;
    }
    target.appendChild(el);
    globalNodes.push(el);
    return el;
}
exports.createGlobalNode = createGlobalNode;
function removeGlobalNode(el) {
    globalNodes.splice(globalNodes.indexOf(el), 1);
    el.remove();
}
exports.removeGlobalNode = removeGlobalNode;
function changeGlobalNodesTarget(el) {
    if (el !== target) {
        target = el;
        globalNodes.forEach((el) => {
            if (el.contains(target) === false) {
                target.appendChild(el);
            }
        });
    }
}
exports.changeGlobalNodesTarget = changeGlobalNodesTarget;
