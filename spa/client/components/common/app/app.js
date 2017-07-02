import { Component } from "preact";
import Header from "../../header/header";
import Router from "../router/router";
import RoutePlaceholder from "../router/routePlaceholder";
import { root, main } from "./app.css";

export default class App extends Component {
    render() {
        return (
            <Router>
                <div class={root}>
                    <Header />
                    <main class={main}>
                        <RoutePlaceholder />
                    </main>
                </div>
            </Router>
        );
    }
}
