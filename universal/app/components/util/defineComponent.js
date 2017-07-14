import { Component as PreactComponent } from "preact";
import shallowEqual from "shallowequal";
import renderChild from "./renderChild";
import has from "../../util/has";

const emptyObj = {};
const emptyArr = [];

export default function createComponent(descriptor) {
    const { render = renderChild } = descriptor;
    const connectToStore = descriptor.connectToStore;
    const shouldConnect = connectToStore !== undefined;
    const onPropsChange = has(descriptor, "onPropsChange") ? descriptor.onPropsChange : Function.prototype;
    const Component = class Component extends PreactComponent {
        constructor(props, context) {
            super();
            this.props = props;
            this.context = context;
            this.dispatchAction = action => this.context.store.dispatch(action);
            // Set state undefined so that the user can use function default values during mapToState()
            this.state = undefined;
            this.state = shouldConnect === true ? this.getStateFromStore() : null;

            if (descriptor.handlers !== undefined) {
                this.handlers = Object.keys(descriptor.handlers).reduce((handlers, key) => {
                    const handler = descriptor.handlers[key];

                    handlers[key] = e => handler.call(this, this.dispatchAction, e, this.props, this.state);

                    return handlers;
                }, {});
            }

            onPropsChange.call(context, this.dispatchAction, props, this.state);
        }
        shouldComponentUpdate(newProps, newState) {
            return shallowEqual(newProps, this.props) === false || shallowEqual(newState, this.state) === false;
        }
        componentWillReceiveProps(newProps) {
            onPropsChange.call(this.context, this.dispatchAction, newProps, this.state);
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
            return render.call(this.context, this.props, this.state);
        }
    };

    Component.prototype.render = render;
    Component.prototype.displayName = descriptor.name;
    Component.prototype.handlers = emptyObj;
    Component.prototype.storeUnsubscribers = emptyArr;
    if (has(descriptor, "getChildContext")) {
        Component.prototype.getChildContext = function () {
            return descriptor.getChildContext.call(this.context, this.props, this.state);
        };
    }
    if (shouldConnect === true) {
        const { mapToState, watch } = connectToStore;

        Component.prototype.getStateFromStore = function () {
            const globalState = this.context.store.getState();

            return mapToState.apply(
                this.context,
                watch.map(select => select(globalState)).concat(this.props, this.state)
            );
        };
    }

    return Component;
}
