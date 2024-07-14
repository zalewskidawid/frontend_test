import { ref } from 'vue';

const events = ref(new Map());

export const EventBus = {
    emit(event, data) {
        const eventHandlers = events.value.get(event);
        if (eventHandlers) {
            eventHandlers.forEach(handler => handler(data));
        }
    },
    on(event, handler) {
        if (!events.value.has(event)) {
            events.value.set(event, []);
        }
        events.value.get(event).push(handler);
    },
    off(event, handler) {
        const eventHandlers = events.value.get(event);
        if (eventHandlers) {
            const index = eventHandlers.indexOf(handler);
            if (index > -1) {
                eventHandlers.splice(index, 1);
            }
        }
    },
};