import { onBeforeUnmount } from 'vue';
export default function () {
    let timeoutHandle;
    onBeforeUnmount(() => {
        clearTimeout(timeoutHandle);
    });
    return {
        registerTimeout: (fn, delay) => {
            clearTimeout(timeoutHandle);
            timeoutHandle = setTimeout(fn, delay);
        },
        cancelTimeout: () => {
            clearTimeout(timeoutHandle);
        },
    };
}
