import { Component as PreactComponent } from "preact";
import shallowEqual from "shallowequal";
import renderChild from "./renderChild";

const emptyObj = {};
const emptyArr = [];

export default function createComponent(descriptor) {
    const { render = renderChild } = descriptor;
    const constructor = "constructor" in descriptor === true ? descriptor.constructor : Function.prototype;
    const connectToStore = descriptor.connectToStore;
    const shouldConnect = connectToStore !== undefined;
    const Component = class Component extends PreactComponent {
        constructor(...args) {
            super();
            constructor.apply(this, args);
            if (descriptor.handlers !== undefined) {
                this.handlers = Object.keys(descriptor.handlers).reduce((handlers, key) => {
                    const handler = descriptor.handlers[key];

                    handlers[key] = e => handler(e, this);

                    return handlers;
                }, {});
            }
        }
        shouldComponentUpdate(newProps, newState) {
            return shallowEqual(newProps, this.props) === false || shallowEqual(newState, this.state) === false;
        }
        componentWillMount() {
            if (shouldConnect === true) {
                const store = this.context.store;
                const { pull, watch } = connectToStore;
                const handleChange = () => {
                    const globalState = this.context.store.getState();

                    this.setState(() => pull.apply(this, watch.map(select => select(globalState))));
                };

                this.storeUnsubscribers = watch.map(state => store.watch(state.scope, handleChange));
                handleChange();
            }
        }
        componentWillUnmount() {
            this.storeUnsubscribers.forEach(f => f());
        }
    };

    Component.prototype.render = render;
    Component.prototype.displayName = descriptor.name;
    Component.prototype.handlers = emptyObj;
    Component.prototype.storeUnsubscribers = emptyArr;
    if ("getChildContext" in descriptor) {
        Component.prototype.getChildContext = descriptor.getChildContext;
    }

    return Component;
}
