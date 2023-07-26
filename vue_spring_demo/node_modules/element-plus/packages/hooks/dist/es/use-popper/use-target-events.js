import { computed, getCurrentInstance } from 'vue';
import { isArray } from 'element-plus/es/utils/util';
export const DEFAULT_TRIGGER = 'hover';
export const useTargetEvents = (onShow, onHide, onToggle) => {
    const { props } = getCurrentInstance();
    let triggerFocused = false;
    const popperEventsHandler = (e) => {
        e.stopPropagation();
        switch (e.type) {
            case 'click': {
                if (triggerFocused) {
                    triggerFocused = false;
                }
                else {
                    onToggle();
                }
                break;
            }
            case 'mouseenter': {
                onShow();
                break;
            }
            case 'mouseleave': {
                onHide();
                break;
            }
            case 'focus': {
                triggerFocused = true;
                onShow();
                break;
            }
            case 'blur': {
                triggerFocused = false;
                onHide();
                break;
            }
        }
    };
    const triggerEventsMap = {
        click: ['onClick'],
        hover: ['onMouseenter', 'onMouseleave'],
        focus: ['onFocus', 'onBlur'],
    };
    const mapEvents = (t) => {
        const events = {};
        triggerEventsMap[t].forEach((event) => {
            events[event] = popperEventsHandler;
        });
        return events;
    };
    return computed(() => {
        if (isArray(props.trigger)) {
            return Object.values(props.trigger).reduce((pre, t) => {
                return Object.assign(Object.assign({}, pre), mapEvents(t));
            }, {});
        }
        else {
            return mapEvents(props.trigger);
        }
    });
};
