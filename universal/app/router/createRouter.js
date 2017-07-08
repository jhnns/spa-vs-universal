import nanorouter from "nanorouter";
import Namespace from "../util/namespace";
import defineState from "../util/defineState";

const namespace = new Namespace(module.id).get("router");



const state = defineState(namespace.get("router"), {
    initial: {},
    reducer() {

    }
    mutations: {
        initialize: route => (dispatch, exec, getState) => {
            mutate();
        },
    },
});

export default function createRouter() {
    const router = nanorouter({ default: "/404" });

    return router;
}
