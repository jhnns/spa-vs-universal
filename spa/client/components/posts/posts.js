import { Component } from "preact";
import AsyncPropsCache from "../../util/asyncPropsCache";
import Post from "./post/post";
import { a11yTitle, root, postContainer, postSheet, postImage } from "./posts.css";

const empty = [];

export default class Posts extends Component {
    constructor(props) {
        super();
        this.asyncPropsCache = new AsyncPropsCache(this, {
            posts: props.posts,
        });
    }
    render(props, state) {
        const posts = state.posts;

        return (
            <div class={root}>
                <h2 class={a11yTitle}>
                    {props.a11yTitle}
                </h2>
                {posts === null ?
                    empty :
                    posts.map(post =>
                        (<div class={postContainer} key={post.id}>
                            <img class={postImage} src={post.image} alt={post.title} />
                            <Post class={postSheet} post={post} />
                        </div>)
                    )}
            </div>
        );
    }
}
