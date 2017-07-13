import defineState from "../store/defineState";
import defineComponent from "../util/defineComponent";
import { state as documentState } from "../document/document";
import getAll from "../../api/posts/getAll";
import Posts from "../posts/posts";

const name = "allPosts";
const title = "All Peerigon News";

export const state = defineState({
    scope: name,
    initialState: {
        posts: null,
    },
    actions: {
        enter: () => (getState, patchState, dispatchAction) => {
            dispatchAction(
                documentState.actions.update({
                    statusCode: 200,
                    title,
                    headerTags: [],
                })
            );

            return getAll().then(posts => {
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
