import { h, ref, Teleport, onUnmounted } from 'vue';
import { NOOP } from '@vue/shared';
import isServer from 'element-plus/es/utils/isServer';
import { createGlobalNode, removeGlobalNode, } from 'element-plus/es/utils/global-nodes';
export default (contentRenderer, appendToBody) => {
    const isTeleportVisible = ref(false);
    if (isServer) {
        return {
            isTeleportVisible,
            showTeleport: NOOP,
            hideTeleport: NOOP,
            renderTeleport: NOOP,
        };
    }
    let $el = null;
    const showTeleport = () => {
        isTeleportVisible.value = true;
        if ($el !== null)
            return;
        $el = createGlobalNode();
    };
    const hideTeleport = () => {
        isTeleportVisible.value = false;
        if ($el !== null) {
            removeGlobalNode($el);
            $el = null;
        }
    };
    const renderTeleport = () => {
        return appendToBody.value !== true
            ? contentRenderer()
            : isTeleportVisible.value
                ? [h(Teleport, { to: $el }, contentRenderer())]
                : undefined;
    };
    onUnmounted(hideTeleport);
    return {
        isTeleportVisible,
        showTeleport,
        hideTeleport,
        renderTeleport,
    };
};
