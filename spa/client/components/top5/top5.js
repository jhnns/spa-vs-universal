import { Component } from "preact";
import getTop5 from "../../api/posts/getTop5";
import Posts from "../common/posts/posts";
import WithTitle from "../common/withTitle";

export default class Top5 extends Component {
    render() {
        const title = "Top 5 Peerigon News";

        return (
            <WithTitle title={title}>
                <Posts headline={title} posts={getTop5} />
            </WithTitle>
        );
    }
}
