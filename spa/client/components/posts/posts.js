import { Component } from "preact";
import Header from "../header/header";
import { root } from "./posts.css";

export default class Posts extends Component {
    render() {
        return (
            <div>
                <Header />
                <h2 className={root}>Posts</h2>
            </div>
        );
    }
}
