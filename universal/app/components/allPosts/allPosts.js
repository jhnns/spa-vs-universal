import defineState from "../store/defineState";
import contexts from "../../contexts";
import defineComponent from "../util/defineComponent";
import getAll from "../../effects/api/posts/getAll";
import Posts from "../posts/posts";

const name = "allPosts";

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState: {
        posts: null,
    },
    actions: {
        enter: () => (getState, patchState, dispatchAction, execEffect) =>
            execEffect(getAll).then(posts => {
                patchState({
                    posts,
                });
            }),
        update: () => (getState, patchState, dispatchAction, execEffect) => Function.prototype,
    },
});

export default defineComponent({
    name,
    connectToStore: {
        watch: [state.select],
    },
    render(props, state) {
        return <Posts a11yTitle={"All Peerigon News"} posts={state.posts} />;
    },
});
