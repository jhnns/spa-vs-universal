import { Component as PreactComponent } from "preact";
import renderChild from "./renderChild";

function createComponent(displayName, descriptor) {
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
            this.displayName = displayName;
        }
        render() {
            return render(this);
        }
    };
}

export default function namespace(moduleId) {
    return {
        component(name, descriptor) {
            return createComponent(`${ name } (${ moduleId })`, descriptor);
        },
    };
}
