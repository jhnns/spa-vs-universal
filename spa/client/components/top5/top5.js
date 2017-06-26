import { Component } from "preact";
import getTop5 from "../../api/posts/getTop5";
import Posts from "../posts/posts";

export default class Top5 extends Component {
    render() {
        return <Posts promise={getTop5()} />;
    }
}
