import { Fragment, Text, Comment, createBlock, openBlock, createCommentVNode, isVNode, camelize, } from 'vue';
import { hasOwn } from '@vue/shared';
import { debugWarn } from './error';
const TEMPLATE = 'template';
export const SCOPE = 'VNode';
export var PatchFlags;
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
})(PatchFlags || (PatchFlags = {}));
export const isFragment = (node) => isVNode(node) && node.type === Fragment;
export const isText = (node) => node.type === Text;
export const isComment = (node) => node.type === Comment;
export const isTemplate = (node) => node.type === TEMPLATE;
function getChildren(node, depth) {
    if (isComment(node))
        return;
    if (isFragment(node) || isTemplate(node)) {
        return depth > 0
            ? getFirstValidNode(node.children, depth - 1)
            : undefined;
    }
    return node;
}
export const isValidElementNode = (node) => isVNode(node) && !isFragment(node) && !isComment(node);
export const getFirstValidNode = (nodes, maxDepth = 3) => {
    if (Array.isArray(nodes)) {
        return getChildren(nodes[0], maxDepth);
    }
    else {
        return getChildren(nodes, maxDepth);
    }
};
export function renderIf(condition, node, props, children, patchFlag, patchProps) {
    return condition
        ? renderBlock(node, props, children, patchFlag, patchProps)
        : createCommentVNode('v-if', true);
}
export function renderBlock(node, props, children, patchFlag, patchProps) {
    return openBlock(), createBlock(node, props, children, patchFlag, patchProps);
}
export const getNormalizedProps = (node) => {
    if (!isVNode(node)) {
        debugWarn(SCOPE, 'value must be a VNode');
        return;
    }
    const raw = node.props || {};
    const type = node.type.props || {};
    const props = {};
    Object.keys(type).forEach((key) => {
        if (hasOwn(type[key], 'default')) {
            props[key] = type[key].default;
        }
    });
    Object.keys(raw).forEach((key) => {
        props[camelize(key)] = raw[key];
    });
    return props;
};
