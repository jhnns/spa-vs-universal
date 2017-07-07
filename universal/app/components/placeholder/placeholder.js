import namespace from "../util/namespace";
import Loading from "../loading/loading";

const define = namespace(module.id);

export default define.component("Placeholder", {
    render(self) {
        const Component = self.state.component;

        if (Component !== null) {
            return <Component {...self.props.props} />;
        }

        const children = self.props.children;

        if (children.length === 0) {
            return <Loading />;
        }

        const childGenerator = children[0];

        return childGenerator(self.state.componentError);
    },
});
