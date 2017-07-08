import defineState from "../util/defineState";
import Namespace from "../util/namespace";

const moduleNs = new Namespace(module.id);

export default defineState(moduleNs.get("route"), {
    initial: {
        href: "",
        statusCode: 0,
    },
    mutations: {
        initialize: route => (mutate, getState) => {
            mutate();
        },
    },
});
