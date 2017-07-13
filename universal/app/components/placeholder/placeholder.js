import Loading from "../loading/loading";
import defineComponent from "../util/defineComponent";

const name = "placeholder";

export default defineComponent({
    name,
    render({ children, result = null, props = {} }) {
        const noChildren = children.length === 0;

        if (result === null && noChildren) {
            return <Loading />;
        }
        if (result !== null && result instanceof Error === false) {
            const Component = result;

            return <Component {...props} />;
        }
        if (result instanceof Error && noChildren) {
            return (
                <div>
                    {result.message}
                </div>
            );
        }

        const childGenerator = children[0];

        return childGenerator(result);
    },
});
