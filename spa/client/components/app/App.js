import { Component } from "preact";
import Header from "../header/Header";
import { root } from "./App.css";

export default class App extends Component {
    render() {
        return (
            <div className={root}>
                <Header />
            </div>
        );
    }
}
