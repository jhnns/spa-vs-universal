import { Component } from "preact";
import fromNow from "from-now";
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
                        {fromNow(post.published)}
                    </time>
                    {" ago by "}
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
