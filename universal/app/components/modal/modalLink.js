import defineComponent from "../util/defineComponent";
import Link from "../router/link";
import ModalTrigger from "./modalTrigger";
import filterProps from "../../util/filterProps";
import { state as routerState } from "../router/router";

const name = "modalLink";
const ownProps = ["triggerParam", "importAction", "modal", "children"];

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ request, route }) => ({
            previous: route.error === true ? null : request.url,
        }),
    },
    render(props, state) {
        const linkProps = filterProps(props, ownProps);
        const additionalParams = Object.assign({}, props.additionalParams);

        additionalParams[props.triggerParam] = 1;
        if (state.previous !== null) {
            additionalParams.previous = state.previous;
        }

        return (
            <Link {...linkProps} additionalParams={additionalParams}>
                {props.children}
                <ModalTrigger triggerParam={props.triggerParam} importAction={props.importAction}>
                    {props.modal}
                </ModalTrigger>
            </Link>
        );
    },
});
