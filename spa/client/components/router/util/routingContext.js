import trigger from "./trigger";
import routeToHref from "./routeToHref";

export default class RoutingContext {
    constructor(component) {
        this.component = component;
    }
    previous() {
        return {
            route: this.component.context.previousRoute,
            params: this.component.context.previousParams,
        };
    }
    current() {
        return {
            route: this.component.context.route,
            params: this.component.context.params,
        };
    }
    next(route, params = null, options) {
        trigger(this.component.context.router, routeToHref(route, params), options);
    }
}
