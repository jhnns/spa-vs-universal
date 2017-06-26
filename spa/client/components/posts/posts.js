import Header from "../header/header";
import { root } from "./posts.css";
import AsyncComponent from "../../util/asyncComponent";
import Post from "../post/post";

const empty = [];

export default class Posts extends AsyncComponent {
    componentWillMount() {
        this.startFetch(this.props.fetch);
    }
    componentWillReceiveProps(props) {
        this.startFetch(props.fetch);
    }
    startFetch(fetch) {
        this.async.add("fetch", fetch());
    }
    render(props, state) {
        const posts = state.fetchResult;

        return (
            <div>
                <Header />
                <main>
                    <h2 className={root}>Posts</h2>
                    {posts === null ?
                        empty :
                        posts.map(post => <Post key={post.id} post={post} />)}
                </main>
            </div>
        );
    }
}
