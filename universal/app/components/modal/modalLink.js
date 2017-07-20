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
        mapToState: ({ params }) => ({
            params,
        }),
    },
    render(props, state) {
        const linkProps = filterProps(props, ownProps);
        const additionalParams = Object.assign({}, state.params, props.additionalParams);

        additionalParams[props.triggerParam] = 1;

        return (
            <Link {...linkProps} additionalParams={additionalParams} preloadAction={props.importAction}>
                {props.children}
                <ModalTrigger triggerParam={props.triggerParam} importAction={props.importAction}>
                    {props.modal}
                </ModalTrigger>
            </Link>
        );
    },
});
