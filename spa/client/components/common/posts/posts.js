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
                <main className={main}>
                    <h2 className={headline}>{props.headline}</h2>
                    <div className={postsContainer}>
                        {posts === null ?
                            empty :
                            posts.map(post => (
                                <div className={postContainer} key={post.id}>
                                    <img
                                        className={postImage}
                                        src={post.image}
                                        alt={post.title}
                                    />
                                    <Post className={sheet} post={post} />
                                </div>
                            ))}
                    </div>
                </main>
            </div>
        );
    }
}
