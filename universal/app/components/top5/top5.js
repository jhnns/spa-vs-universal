import defineState from "../store/defineState";
import contexts from "../../contexts";
import defineComponent from "../util/defineComponent";
import getTop5 from "../../effects/api/posts/getTop5";
import Posts from "../posts/posts";

const name = "top5";

export const state = defineState({
    scope: name,
    context: contexts.state,
    initialState: {
        posts: null,
    },
    actions: {
        enter: () => (getState, patchState, dispatchAction, execEffect) =>
            execEffect(getTop5).then(posts => {
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
        mapToState: s => ({ ...s }),
    },
    render(props, state) {
        return <Posts a11yTitle={"Top 5 Peerigon News"} posts={state.posts} />;
    },
});
