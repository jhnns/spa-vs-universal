import hookIntoEvent from "../util/hookIntoEvent";
import renderUrl from "../../util/renderUrl";
import defineComponent from "../util/defineComponent";
import { state as routerState } from "./router";
import filterProps from "../../util/filterProps";
import has from "../../util/has";

const emptyObj = {};
const emptyArr = [];
const ownProps = [
    "route",
    "params",
    "children",
    "activeClass",
    "replaceRoute",
    "additionalParams",
    "withoutParams",
    "preloadAction",
];

function preloadNextComponent(dispatchAction, event, props, state) {
    dispatchAction(state.preloadAction);
}

export default defineComponent({
    name: "Link",
    connectToStore: {
        watch: [routerState.select],
        mapToState: (routerState, props) => {
            const route = has(props, "route") ? props.route : routerState.route;

            return {
                url: routerState.request.url,
                route,
                params: routerState.params,
                isActive: route === routerState.route,
                preloadAction: has(props, "preloadAction") ? props.preloadAction : route.entry,
            };
        },
    },
    handlers: {
        handleMouseOver: hookIntoEvent("onMouseOver", preloadNextComponent),
        handleFocus: hookIntoEvent("onFocus", preloadNextComponent),
    },
    render(props, state) {
        const anchorProps = filterProps(props, ownProps);
        const {
            params = emptyObj,
            additionalParams,
            withoutParams = emptyArr,
            replaceRoute = false,
            children,
            activeClass,
        } = props;
        const route = state.route;
        const finalParams = filterProps(Object.assign({}, params, additionalParams), withoutParams);
        const targetUrl = renderUrl(
            route.error === true ? (typeof state.params.next === "string" ? state.params.next : "/") : route.url,
            finalParams
        );

        return (
            <a
                {...anchorProps}
                {...(state.isActive ? activeClass : emptyObj)}
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
