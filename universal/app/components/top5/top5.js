import defineState from "../store/defineState";
import defineComponent from "../util/defineComponent";
import { state as documentState } from "../document/document";
import getTop5 from "../../api/posts/getTop5";
import Posts from "../posts/posts";

const name = "top5";
const title = "Top 5 Peerigon News";

export const state = defineState({
    scope: name,
    initialState: {
        posts: null,
    },
    actions: {
        enter: () => (getState, patchState, dispatchAction, execEffect) => {
            dispatchAction(
                documentState.actions.update({
                    statusCode: 200,
                    title,
                    headerTags: [],
                })
            );

            return execEffect(getTop5).then(posts => {
                patchState({
                    posts,
                });
            });
        },
    },
});

export default defineComponent({
    name,
    connectToStore: {
        watch: [state.select],
        mapToState(state) {
            return state;
        },
    },
    render(props, state) {
        return <Posts a11yTitle={title} posts={state.posts} />;
    },
});
