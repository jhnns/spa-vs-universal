import { Component } from "preact";
import Header from "../header/header";
import { root } from "./app.css";

export default class App extends Component {
    render() {
        return (
            <div className={root}>
                <Header />
            </div>
        );
    }
}
