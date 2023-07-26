"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTargetEvents = exports.DEFAULT_TRIGGER = void 0;
const vue_1 = require("vue");
const util_1 = require("element-plus/lib/utils/util");
exports.DEFAULT_TRIGGER = 'hover';
const useTargetEvents = (onShow, onHide, onToggle) => {
    const { props } = (0, vue_1.getCurrentInstance)();
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
    return (0, vue_1.computed)(() => {
        if ((0, util_1.isArray)(props.trigger)) {
            return Object.values(props.trigger).reduce((pre, t) => {
                return Object.assign(Object.assign({}, pre), mapEvents(t));
            }, {});
        }
        else {
            return mapEvents(props.trigger);
        }
    });
};
exports.useTargetEvents = useTargetEvents;
