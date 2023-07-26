"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const shared_1 = require("@vue/shared");
const isServer_1 = __importDefault(require("element-plus/lib/utils/isServer"));
const global_nodes_1 = require("element-plus/lib/utils/global-nodes");
exports.default = (contentRenderer, appendToBody) => {
    const isTeleportVisible = (0, vue_1.ref)(false);
    if (isServer_1.default) {
        return {
            isTeleportVisible,
            showTeleport: shared_1.NOOP,
            hideTeleport: shared_1.NOOP,
            renderTeleport: shared_1.NOOP,
        };
    }
    let $el = null;
    const showTeleport = () => {
        isTeleportVisible.value = true;
        if ($el !== null)
            return;
        $el = (0, global_nodes_1.createGlobalNode)();
    };
    const hideTeleport = () => {
        isTeleportVisible.value = false;
        if ($el !== null) {
            (0, global_nodes_1.removeGlobalNode)($el);
            $el = null;
        }
    };
    const renderTeleport = () => {
        return appendToBody.value !== true
            ? contentRenderer()
            : isTeleportVisible.value
                ? [(0, vue_1.h)(vue_1.Teleport, { to: $el }, contentRenderer())]
                : undefined;
    };
    (0, vue_1.onUnmounted)(hideTeleport);
    return {
        isTeleportVisible,
        showTeleport,
        hideTeleport,
        renderTeleport,
    };
};
