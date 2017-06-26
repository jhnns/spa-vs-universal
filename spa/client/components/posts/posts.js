import Header from "../header/header";
import { root } from "./posts.css";
import AsyncComponent from "../../util/asyncComponent";
import Post from "../post/post";

const empty = [];

export default class Posts extends AsyncComponent {
    componentWillMount() {
        this.addPromise(this.props.promise);
    }
    componentWillReceiveProps(props) {
        this.addPromise(props.promise);
    }
    addPromise(promise) {
        this.async.add("promise", promise);
    }
    render(props, state) {
        const posts = state.promiseResult;

        return (
            <div>
                <Header />
                <main>
                    <h2 className={root}>{props.headline}</h2>
                    {posts === null ?
                        empty :
                        posts.map(post => <Post key={post.id} post={post} />)}
                </main>
            </div>
        );
    }
}
