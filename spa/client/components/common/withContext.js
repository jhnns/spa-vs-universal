import { Component } from "preact";

export default class WithContext extends Component {
    getChildContext() {
        return this.props.context;
    }
    render(props) {
        return props.children[0];
    }
}
