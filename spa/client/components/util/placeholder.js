import { Component } from "preact";
import Loading from "../loading/loading";
import AsyncPropsCache from "../../util/asyncPropsCache";

export default class Placeholder extends Component {
    constructor(props) {
        super();
        this.asyncPropsCache = new AsyncPropsCache(this, {
            component: props.component,
        });
    }
    render(props, state) {
        const Component = state.component;

        if (Component !== null) {
            return <Component {...props.props} />;
        }

        const children = props.children;

        if (children.length === 0) {
            return <Loading />;
        }

        const childGenerator = children[0];

        return childGenerator(state.componentError);
    }
}
