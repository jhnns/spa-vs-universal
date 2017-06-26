import { Component } from "preact";
import getAllPosts from "../../api/posts/getAll";
import Posts from "../posts/posts";
import WithTitle from "../withTitle/withTitle";

export default class AllPosts extends Component {
    render() {
        const title = "All Peerigon News";

        return (
            <WithTitle title={title}>
                <Posts headline={title} promise={getAllPosts()} />
            </WithTitle>
        );
    }
}
