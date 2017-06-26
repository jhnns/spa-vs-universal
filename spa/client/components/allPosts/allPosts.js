import { Component } from "preact";
import getAllPosts from "../../api/posts/getAll";
import Posts from "../posts/posts";
import WithTitle from "../withTitle/withTitle";

export default class AllPosts extends Component {
    render() {
        return (
            <WithTitle title="All Peerigon News">
                <Posts promise={getAllPosts()} />
            </WithTitle>
        );
    }
}
