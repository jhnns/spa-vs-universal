import { Component } from "preact";
import getAllPosts from "../../api/posts/getAll";
import Posts from "../common/posts/posts";
import WithTitle from "../common/withTitle";

export default class AllPosts extends Component {
    render() {
        const title = "All Peerigon News";

        return (
            <WithTitle title={title}>
                <Posts headline={title}>
                    {getAllPosts()}
                </Posts>
            </WithTitle>
        );
    }
}
