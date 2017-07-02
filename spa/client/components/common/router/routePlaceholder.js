import Placeholder from "../placeholder";

const defaultParams = {};

export default class RoutePlaceholder {
    render(props, state) {
        const route = this.context.route;

        return (
            <Placeholder
                component={route.component}
                props={route.params || defaultParams}
            />
        );
    }
}
