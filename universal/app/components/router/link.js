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

function dispatchPreloadAction(dispatchAction, event, props, state) {
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
        handleMouseOver: hookIntoEvent("onMouseOver", dispatchPreloadAction),
        handleFocus: hookIntoEvent("onFocus", dispatchPreloadAction),
    },
    render(props, state) {
        const anchorProps = filterProps(props, ownProps);
        const {
            params = emptyObj,
            additionalParams,
            withoutParams = emptyArr,
            replaceRoute = false,
            href,
            children,
            activeClass,
        } = props;
        const route = state.route;
        let finalHref = href;

        if (href === undefined) {
            const finalParams = filterProps(Object.assign({}, params, additionalParams), withoutParams);

            finalHref = renderUrl(route.url, finalParams);
        }

        return (
            <a
                {...anchorProps}
                {...(state.isActive ? activeClass : emptyObj)}
                href={finalHref}
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
