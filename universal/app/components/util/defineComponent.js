import { Component as PreactComponent } from "preact";
import shallowEqual from "shallowequal";
import renderChild from "./renderChild";

const emptyObj = {};
const emptyArr = [];

export default function createComponent(descriptor) {
    const { render = renderChild } = descriptor;
    const connectToStore = descriptor.connectToStore;
    const shouldConnect = connectToStore !== undefined;
    const onPropsChange =
        shouldConnect === true && "onPropsChange" in descriptor === true ?
            descriptor.onPropsChange :
            Function.prototype;
    const Component = class Component extends PreactComponent {
        constructor() {
            super();
            if (descriptor.handlers !== undefined) {
                this.handlers = Object.keys(descriptor.handlers).reduce((handlers, key) => {
                    const handler = descriptor.handlers[key];

                    handlers[key] = e => handler.call(this, this.dispatchAction, e, this.props, this.state);

                    return handlers;
                }, {});
            }
            if (shouldConnect === true) {
                this.dispatchAction = action => this.context.store.dispatch(action);
            }
        }
        shouldComponentUpdate(newProps, newState) {
            return shallowEqual(newProps, this.props) === false || shallowEqual(newState, this.state) === false;
        }
        componentWillReceiveProps(newProps) {
            onPropsChange.call(this.context, this.dispatchAction, newProps, this.state);
        }
        componentWillMount() {
            onPropsChange.call(this.context, this.dispatchAction, this.props, this.state);
            if (shouldConnect === true) {
                const { map, watch } = connectToStore;
                const handleChange = () => {
                    const globalState = this.context.store.getState();

                    this.setState(() =>
                        map.apply(this.context, [this.props, this.state, ...watch.map(select => select(globalState))])
                    );
                };

                this.storeUnsubscribers = watch.map(state => this.context.store.watch(state.scope, handleChange));
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
        Component.prototype.getChildContext = function () {
            return descriptor.getChildContext.call(this.context, this.props, this.state);
        };
    }
    if (shouldConnect === true) {
        Component.prototype.dispatchAction = function (action) {
            return this.context.store.dispatch(action);
        };
    }

    return Component;
}
