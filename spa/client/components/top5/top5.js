import { Component } from "preact";
import getTop5 from "../../api/posts/getTop5";
import Posts from "../posts/posts";
import WithTitle from "../withTitle/withTitle";

export default class Top5 extends Component {
    render() {
        return (
            <WithTitle title="Top 5 Peerigon News">
                <Posts promise={getTop5()} />
            </WithTitle>
        );
    }
}
