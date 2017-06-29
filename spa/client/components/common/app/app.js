import { Component } from "preact";
import Router from "../router/router";
import { root } from "./app.css";

export default class App extends Component {
    render() {
        return (
            <div class={root}>
                <Router />
            </div>
        );
    }
}
