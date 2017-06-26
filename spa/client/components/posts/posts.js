import Header from "../header/header";
import { root } from "./posts.css";
import getTop5 from "../../api/posts/getTop5";
import AsyncComponent from "../../util/asyncComponent";

const empty = [];

export default class Posts extends AsyncComponent {
    componentWillMount() {
        this.async.add("getTop5", getTop5());
    }
    render(props, state) {
        const posts = state.getTop5Result || empty;

        return (
            <div>
                <Header />
                <main>
                    <h2 className={root}>Posts</h2>
                    {state.getTop5Result === null ?
                        empty :
                        posts.map(post => JSON.stringify(post)).join("")}
                </main>
            </div>
        );
    }
}
