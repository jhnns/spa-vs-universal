import { Component } from "preact";
import getAllPosts from "../../api/posts/getAll";
import Posts from "../posts/posts";
import WithTitle from "../util/withTitle";

export default class AllPosts extends Component {
    render() {
        const title = "All Peerigon News";

        return (
            <WithTitle title={title}>
                <Posts a11yTitle={title} posts={getAllPosts} />
            </WithTitle>
        );
    }
}
