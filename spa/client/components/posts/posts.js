import Header from "../header/header";
import AsyncComponent from "../../util/asyncComponent";
import Post from "../post/post";
import { main, headline, postsContainer } from "./posts.css";

const empty = [];

export default class Posts extends AsyncComponent {
    componentWillMount() {
        this.addPromise(this.props.children[0]);
    }
    componentWillReceiveProps(props) {
        this.addPromise(props.children[0]);
    }
    addPromise(promise) {
        this.async.add("promise", promise);
    }
    render(props, state) {
        const posts = state.promiseResult;

        return (
            <div>
                <Header />
                <main className={main}>
                    <h2 className={headline}>{props.headline}</h2>
                    <div className={postsContainer}>
                        {posts === null ?
                            empty :
                            posts.map(post => (
                                <Post key={post.id} post={post} />
                            ))}
                    </div>
                </main>
            </div>
        );
    }
}
