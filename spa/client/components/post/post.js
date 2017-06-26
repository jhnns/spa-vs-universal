import { Component } from "preact";
import { root } from "./post.css";

export default class Post extends Component {
    render(props, state) {
        const post = props.post;

        return (
            <article className={root}>
                <h2>{post.title}</h2>
                <div>
                    <p>{post.content}</p>
                </div>
            </article>
        );
    }
}
