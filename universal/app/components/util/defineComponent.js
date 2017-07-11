import { Component as PreactComponent } from "preact";
import renderChild from "./renderChild";

const emptyObj = {};

export default function createComponent(descriptor) {
    const { render = renderChild } = descriptor;
    const constructor = "constructor" in descriptor === true ? descriptor.constructor : Function.prototype;
    const Component = class Component extends PreactComponent {
        constructor(...args) {
            super();
            constructor.apply(this, args);
            if (descriptor.handlers !== undefined) {
                this.handlers = {};
                Object.keys(descriptor.handlers).forEach((handlers, key) => {
                    const handler = descriptor[key];

                    this.handlers[key] = e => handler(e, this);
                });
            }
        }
    };

    Component.prototype.render = render;
    Component.prototype.displayName = descriptor.name;
    Component.prototype.handlers = emptyObj;
    if ("getChildContext" in descriptor) {
        Component.prototype.getChildContext = descriptor.getChildContext;
    }

    return Component;
}
