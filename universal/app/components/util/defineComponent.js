import { Component as PreactComponent } from "preact";
import shallowEqual from "shallowequal";
import renderChild from "./renderChild";

const emptyObj = {};
const emptyArr = [];

export default function createComponent(descriptor) {
    const { render = renderChild } = descriptor;
    const constructor = "constructor" in descriptor === true ? descriptor.constructor : Function.prototype;
    const connectToStore = descriptor.connectToStore;
    const isConnected = connectToStore !== undefined;
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
        shouldComponentUpdate(newProps, newState) {
            return shallowEqual(newProps, this.props) === false || shallowEqual(newState, this.state) === false;
        }
        componentWillMount() {
            if (isConnected === true) {
                const store = this.context.store;
                const pull = connectToStore.pull;
                const handleChange = () => {
                    this.setState(() => pull.call(this, this.context.store.getState()));
                };

                this.storeUnsubscribers = connectToStore.watch.map(state => store.watch(state.scope, handleChange));
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
    if (isConnected === true) {
        const pull = connectToStore.pull;

        Component.prototype.pullStateFromStore = function () {
            this.setState(() => pull.call(this, this.context.store.getState()));
        };
    }

    return Component;
}
