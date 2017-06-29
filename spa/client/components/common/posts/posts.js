import Header from "../../header/header";
import AsyncCacheComponent from "../asyncCacheComponent";
import Post from "./post/post";
import {
    main,
    headline,
    postsContainer,
    postContainer,
    sheet,
    postImage,
} from "./posts.css";

const empty = [];

export default class Posts extends AsyncCacheComponent {
    render(props, state) {
        const posts = state.postsResult;

        return (
            <div>
                <Header />
                <main class={main}>
                    <h2 class={headline}>{props.headline}</h2>
                    <div class={postsContainer}>
                        {posts === null
                            ? empty
                            : posts.map(post => (
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
                </main>
            </div>
        );
    }
}
