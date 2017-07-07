import { Component } from "preact";
import renderChild from "./renderChild";

export default class WithContext extends Component {
    constructor() {
        super();
        this.render = renderChild;
    }
    getChildContext() {
        return this.props.context;
    }
}
