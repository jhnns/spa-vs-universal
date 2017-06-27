import { Component } from "preact";
import moment from "moment";
import { headline, paragraph, meta } from "./post.css";

const lineBreak = /\s*[\r\n]+\s*/g;

export default class Post extends Component {
    render(props, state) {
        const post = props.post;

        return (
            <article className={props.className}>
                <h2 className={headline}>{post.title}</h2>
                <div className={meta}>
                    <time dateTime={post.published}>
                        {moment(post.published).fromNow()}
                    </time>
                    {" by "}
                    {post.author}
                </div>
                <div>
                    {post.content
                        .split(lineBreak)
                        .map(p => <p className={paragraph} key={p}>{p}</p>)}
                </div>
            </article>
        );
    }
}
