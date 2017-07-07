import { Component as PreactComponent } from "preact";

import renderChild from "./renderChild";

export default function createComponent(namespace, descriptor) {
    const { render = renderChild } = descriptor;

    return class Component extends PreactComponent {
        constructor() {
            super();
            this.handlers = {};
            if (descriptor.handlers !== undefined) {
                Object.keys(descriptor.handlers).forEach((handlers, key) => {
                    const handler = descriptor[key];

                    this.handlers[key] = e => handler(e, this);
                });
            }
            this.displayName = namespace.id;
        }
        render() {
            return render(this);
        }
    };
}
