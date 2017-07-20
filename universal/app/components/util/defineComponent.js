import { Component as PreactComponent } from "preact";
import renderChild from "./renderChild";
import has from "../../util/has";

const emptyObj = {};
const emptyArr = [];

function throwNoContextError() {
    throw new Error("No store available in this component context");
}

function compare(a, b, compareChildren) {
    if (a === b) {
        return true;
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
        return false;
    }

    for (let i = 0; i < aKeys.length; i++) {
        const key = aKeys[i];

        if (compareChildren === true && key === "children") {
            if (compare(a.children, b.children) === false) {
                return false;
            }
            continue;
        }

        if (has(b, key) === false || a[key] !== b[key]) {
            return false;
        }
    }

    return true;
}

function defaultMapToState(state) {
    // It's important to copy the state because preact merges it with the existing component state
    return { ...state };
}

export default function createComponent(descriptor) {
    const { render = renderChild } = descriptor;
    const connectToStore = descriptor.connectToStore;
    const shouldConnect = connectToStore !== undefined;
    const willUpdate = has(descriptor, "willUpdate") ? descriptor.willUpdate : Function.prototype;
    const Component = class Component extends PreactComponent {
        constructor(props, context) {
            super();
            this.props = props;
            this.context = context;

            if (has(context, "store")) {
                this.dispatchAction = action => context.store.dispatch(action);
            }

            this.state = shouldConnect === true ? this.getStateFromStore() : null;

            if (descriptor.handlers !== undefined) {
                this.handlers = Object.keys(descriptor.handlers).reduce((handlers, key) => {
                    const handler = descriptor.handlers[key];

                    handlers[key] = e => handler.call(this, this.dispatchAction, e, this.props, this.state);

                    return handlers;
                }, {});
            }

            willUpdate.call(context, props, this.state, this.dispatchAction);
        }
        shouldComponentUpdate(newProps, newState) {
            return compare(newProps, this.props, true) === false || compare(newState, this.state, false) === false;
        }
        componentWillUpdate(newProps, newState) {
            willUpdate.call(this.context, newProps, newState, this.dispatchAction);
        }
        componentWillMount() {
            if (shouldConnect === true) {
                const { watch } = connectToStore;

                this.storeUnsubscribers = watch.map(select =>
                    this.context.store.watch(select, () => {
                        this.setState(() => this.getStateFromStore());
                    })
                );
            }
        }
        componentWillUnmount() {
            this.storeUnsubscribers.forEach(f => f());
        }
        render() {
            return render.call(this.context, this.props, this.state, this.handlers);
        }
    };

    Component.prototype.render = render;
    Component.prototype.displayName = descriptor.name;
    Component.prototype.handlers = emptyObj;
    Component.prototype.storeUnsubscribers = emptyArr;
    Component.prototype.dispatchAction = throwNoContextError;
    if (has(descriptor, "getChildContext")) {
        Component.prototype.getChildContext = function () {
            return descriptor.getChildContext.call(this.context, this.props, this.state);
        };
    }
    if (shouldConnect === true) {
        const { mapToState = defaultMapToState, watch } = connectToStore;

        Component.prototype.getStateFromStore = function () {
            const contextState = this.context.store.getState();

            return mapToState.apply(
                this.context,
                watch.map(select => select(contextState)).concat(this.props, this.state)
            );
        };
    }

    return Component;
}
