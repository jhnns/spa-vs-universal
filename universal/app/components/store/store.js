import defineComponent from "../util/defineComponent";

const name = "store";

export default defineComponent({
    name,
    getChildContext(props) {
        return {
            ...this,
            store: props.store,
        };
    },
});
