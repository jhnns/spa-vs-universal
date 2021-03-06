import { Component } from "preact";
import getTop5 from "../../api/posts/getTop5";
import Posts from "../posts/posts";
import WithTitle from "../util/withTitle";

export default class Top5 extends Component {
    render() {
        const title = "Top 5 Peerigon News";

        return (
            <WithTitle title={title}>
                <Posts a11yTitle={title} posts={getTop5} />
            </WithTitle>
        );
    }
}
