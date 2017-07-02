import { Component } from "preact";
import { root } from "./loading.css";

export const loading = <div class={root}>Loading...</div>;

export default class Loading extends Component {
    render() {
        return loading;
    }
}
