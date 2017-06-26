import { Component } from "preact";
import getAllPosts from "../../api/posts/getAll";
import Posts from "../posts/posts";

export default class AllPosts extends Component {
    render() {
        return <Posts promise={getAllPosts()} />;
    }
}
