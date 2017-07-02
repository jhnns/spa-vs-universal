import AsyncCacheComponent from "../asyncCacheComponent";
import Post from "./post/post";
import { a11yTitle, root, postContainer, sheet, postImage } from "./posts.css";

const empty = [];

export default class Posts extends AsyncCacheComponent {
    render(props, state) {
        const posts = state.postsResult;

        return (
            <div class={root}>
                <h2 class={a11yTitle}>{props.a11yTitle}</h2>
                {posts === null ?
                    empty :
                    posts.map(post => (
                        <div class={postContainer} key={post.id}>
                            <img
                                class={postImage}
                                src={post.image}
                                alt={post.title}
                            />
                            <Post class={sheet} post={post} />
                        </div>
                    ))}
            </div>
        );
    }
}
