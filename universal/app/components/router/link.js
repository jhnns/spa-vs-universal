import hookIntoEvent from "../util/hookIntoEvent";
import renderUrl from "../../util/renderUrl";
import defineComponent from "../util/defineComponent";
import { state as routerState } from "./router";
import filterProps from "../../util/filterProps";

const emptyObj = {};
const emptyArr = [];
const ownProps = ["route", "params", "children", "activeClass", "replaceRoute", "additionalParams", "withoutParams"];

function preloadNextComponent(route) {
    const component = route !== undefined && route.component;

    if (typeof component === "function") {
        component();
    }
}

export default defineComponent({
    name: "Link",
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ request, route, params }) => ({
            url: request.url,
            route,
            params,
        }),
    },
    handlers: {
        handleMouseOver: hookIntoEvent("onMouseOver", (dispatchAction, event, props) => {
            preloadNextComponent(props.route);
        }),
        handleFocus: hookIntoEvent("onFocus", (dispatchAction, event, props) => {
            preloadNextComponent(props.route);
        }),
    },
    render(props, state) {
        const anchorProps = filterProps(props, ownProps);
        const {
            route = state.route,
            params = emptyObj,
            additionalParams,
            withoutParams = emptyArr,
            replaceRoute = false,
            children,
            activeClass,
        } = props;
        const finalParams = filterProps(Object.assign({}, params, additionalParams), withoutParams);
        const targetUrl = renderUrl(
            route.error === true ? (typeof state.params.next === "string" ? state.params.next : "/") : route.url,
            finalParams
        );

        return (
            <a
                {...anchorProps}
                {...(route === state.route ? activeClass : emptyObj)}
                href={targetUrl}
                onMouseOver={this.handlers.handleMouseOver}
                onFocus={this.handlers.handleFocus}
                data-route={true}
                data-replace-url={replaceRoute}
            >
                {children}
            </a>
        );
    },
});
