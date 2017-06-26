import { Component } from "preact";
import Header from "../header/header";
import { root } from "./home.css";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <h2 className={root}>Home</h2>
            </div>
        );
    }
}
