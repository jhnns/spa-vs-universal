import fromNow from "from-now";
import defineComponent from "../../util/defineComponent";
import { headline, paragraph, aside } from "./post.css";
import has from "../../../util/has";

const name = "post";
const lineBreak = /\s*[\r\n]+\s*/g;
const emptyObj = {};

export default defineComponent({
    name,
    render(props) {
        const post = props.post;
        const styles = has(props, "styles") ? props.styles : emptyObj;

        return (
            <article {...styles}>
                <h2 {...headline}>
                    {post.title}
                </h2>
                <div {...aside}>
                    <time dateTime={post.published}>
                        {fromNow(post.published)}
                    </time>
                    {" ago by "}
                    {post.author}
                </div>
                <div>
                    {post.content.split(lineBreak).map(p =>
                        (<p key={p} {...paragraph}>
                            {p}
                        </p>)
                    )}
                </div>
            </article>
        );
    },
});
