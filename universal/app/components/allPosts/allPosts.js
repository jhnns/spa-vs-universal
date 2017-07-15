import defineState from "../store/defineState";
import registries from "../../registries";
import defineComponent from "../util/defineComponent";
import { state as documentState } from "../document/document";
import getAll from "../../api/posts/getAll";
import Posts from "../posts/posts";

const name = "allPosts";
const title = "All Peerigon News";

export const state = defineState({
    scope: name,
    context: registries.stateContext,
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

            return execEffect(getAll).then(posts => {
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
