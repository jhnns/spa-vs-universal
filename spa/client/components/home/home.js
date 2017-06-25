import { Component } from "preact";
import Header from "../header/header";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <h2>Home</h2>
            </div>
        );
    }
}
