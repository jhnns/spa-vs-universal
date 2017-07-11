export default function hookIntoEvent(eventProp, handler) {
    return (...args) => {
        const [e, self] = args;
        const originalHandler = self.props[eventProp];

        handler(...args);

        if (typeof originalHandler === "function") {
            originalHandler.call(e.currentTarget, e);
        }
    };
}
