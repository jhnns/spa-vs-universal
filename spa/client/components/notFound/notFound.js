import { Component } from "preact";
import Header from "../header/header";

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <Header />
                <h2>Not Found</h2>
            </div>
        );
    }
}
