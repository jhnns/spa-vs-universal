export default function createEventHandler(component, eventProp, handler) {
    return e => {
        const originalEventHandler = component.props[eventProp];

        handler.call(component, e);
        if (typeof originalEventHandler === "function") {
            originalEventHandler.call(e.currentTarget, e);
        }
    };
}
