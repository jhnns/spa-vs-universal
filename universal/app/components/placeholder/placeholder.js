import Loading from "../loading/loading";
import defineComponent from "../util/defineComponent";

const name = "placeholder";

export default defineComponent({
    name,
    render({ children, Component = null, props = {} }) {
        const noChildren = children.length === 0;

        if (Component === null && noChildren) {
            return <Loading />;
        }
        if (Component !== null && Component instanceof Error === false) {
            return <Component {...props} />;
        }

        const err = Component;

        if (err !== null && noChildren) {
            return (
                <div>
                    {Component.message}
                </div>
            );
        }

        const childGenerator = children[0];

        return childGenerator(err);
    },
});
