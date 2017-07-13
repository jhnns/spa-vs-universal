import defineComponent from "../util/defineComponent";
import Post from "./post/post";
import { a11yTitle, root, postContainer, postSheet, postImage } from "./posts.css";

const name = "posts";
const empty = [];

export default defineComponent({
    name,
    render(props) {
        const posts = props.posts;

        return (
            <div {...root}>
                <h2 {...a11yTitle}>
                    {props.a11yTitle}
                </h2>
                {Array.isArray(posts) === false || posts.length === 0 ?
                    empty :
                    posts.map(post =>
                        (<div key={post.id} {...postContainer}>
                            <img src={post.image} alt={post.title} {...postImage} />
                            <Post post={post} styles={postSheet} />
                        </div>)
                    )}
            </div>
        );
    },
});
