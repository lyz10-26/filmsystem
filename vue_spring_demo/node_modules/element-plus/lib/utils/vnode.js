"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedProps = exports.renderBlock = exports.renderIf = exports.getFirstValidNode = exports.isValidElementNode = exports.isTemplate = exports.isComment = exports.isText = exports.isFragment = exports.PatchFlags = exports.SCOPE = void 0;
const vue_1 = require("vue");
const shared_1 = require("@vue/shared");
const error_1 = require("./error");
const TEMPLATE = 'template';
exports.SCOPE = 'VNode';
var PatchFlags;
(function (PatchFlags) {
    PatchFlags[PatchFlags["TEXT"] = 1] = "TEXT";
    PatchFlags[PatchFlags["CLASS"] = 2] = "CLASS";
    PatchFlags[PatchFlags["STYLE"] = 4] = "STYLE";
    PatchFlags[PatchFlags["PROPS"] = 8] = "PROPS";
    PatchFlags[PatchFlags["FULL_PROPS"] = 16] = "FULL_PROPS";
    PatchFlags[PatchFlags["HYDRATE_EVENTS"] = 32] = "HYDRATE_EVENTS";
    PatchFlags[PatchFlags["STABLE_FRAGMENT"] = 64] = "STABLE_FRAGMENT";
    PatchFlags[PatchFlags["KEYED_FRAGMENT"] = 128] = "KEYED_FRAGMENT";
    PatchFlags[PatchFlags["UNKEYED_FRAGMENT"] = 256] = "UNKEYED_FRAGMENT";
    PatchFlags[PatchFlags["NEED_PATCH"] = 512] = "NEED_PATCH";
    PatchFlags[PatchFlags["DYNAMIC_SLOTS"] = 1024] = "DYNAMIC_SLOTS";
    PatchFlags[PatchFlags["HOISTED"] = -1] = "HOISTED";
    PatchFlags[PatchFlags["BAIL"] = -2] = "BAIL";
})(PatchFlags = exports.PatchFlags || (exports.PatchFlags = {}));
const isFragment = (node) => (0, vue_1.isVNode)(node) && node.type === vue_1.Fragment;
exports.isFragment = isFragment;
const isText = (node) => node.type === vue_1.Text;
exports.isText = isText;
const isComment = (node) => node.type === vue_1.Comment;
exports.isComment = isComment;
const isTemplate = (node) => node.type === TEMPLATE;
exports.isTemplate = isTemplate;
function getChildren(node, depth) {
    if ((0, exports.isComment)(node))
        return;
    if ((0, exports.isFragment)(node) || (0, exports.isTemplate)(node)) {
        return depth > 0
            ? (0, exports.getFirstValidNode)(node.children, depth - 1)
            : undefined;
    }
    return node;
}
const isValidElementNode = (node) => (0, vue_1.isVNode)(node) && !(0, exports.isFragment)(node) && !(0, exports.isComment)(node);
exports.isValidElementNode = isValidElementNode;
const getFirstValidNode = (nodes, maxDepth = 3) => {
    if (Array.isArray(nodes)) {
        return getChildren(nodes[0], maxDepth);
    }
    else {
        return getChildren(nodes, maxDepth);
    }
};
exports.getFirstValidNode = getFirstValidNode;
function renderIf(condition, node, props, children, patchFlag, patchProps) {
    return condition
        ? renderBlock(node, props, children, patchFlag, patchProps)
        : (0, vue_1.createCommentVNode)('v-if', true);
}
exports.renderIf = renderIf;
function renderBlock(node, props, children, patchFlag, patchProps) {
    return (0, vue_1.openBlock)(), (0, vue_1.createBlock)(node, props, children, patchFlag, patchProps);
}
exports.renderBlock = renderBlock;
const getNormalizedProps = (node) => {
    if (!(0, vue_1.isVNode)(node)) {
        (0, error_1.debugWarn)(exports.SCOPE, 'value must be a VNode');
        return;
    }
    const raw = node.props || {};
    const type = node.type.props || {};
    const props = {};
    Object.keys(type).forEach((key) => {
        if ((0, shared_1.hasOwn)(type[key], 'default')) {
            props[key] = type[key].default;
        }
    });
    Object.keys(raw).forEach((key) => {
        props[(0, vue_1.camelize)(key)] = raw[key];
    });
    return props;
};
exports.getNormalizedProps = getNormalizedProps;
