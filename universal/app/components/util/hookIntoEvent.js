export default function hookIntoEvent(eventProp, handler) {
    return (...args) => {
        const e = args[1];
        const props = args[2];
        const originalHandler = props[eventProp];

        handler(...args);

        if (typeof originalHandler === "function") {
            originalHandler.call(e.currentTarget, e);
        }
    };
}
