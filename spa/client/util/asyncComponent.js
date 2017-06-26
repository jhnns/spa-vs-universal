import { Component } from "preact";
import AsyncContext from "./asyncContext";

export default class AsyncComponent extends Component {
    constructor() {
        super();
        this.async = new AsyncContext(this);
    }
    componentWillUnmount() {
        this.async.reset();
    }
}
