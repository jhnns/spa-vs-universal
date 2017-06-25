import { Component } from "preact";

const spinner = <div>Loading</div>;

export default class Placeholder extends Component {
    componentWillMount() {
        this.updatePromise(this.props.promise);
    }
    componentWillReceiveProps({ promise }) {
        this.updatePromise(promise);
    }
    updatePromise(promise) {
        this.promise = promise;
        this.promise.then(Component => {
            if (promise === this.promise) {
                this.setState({
                    Component,
                    props: this.props.props,
                });
            }
        });
    }
    render(props, state) {
        const Component = state.Component;

        return Component ? <Component {...state.props} /> : spinner;
    }
}
