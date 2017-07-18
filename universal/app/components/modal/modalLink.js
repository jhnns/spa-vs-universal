import defineComponent from "../util/defineComponent";
import Link from "../router/link";
import ModalTrigger from "./modalTrigger";
import filterProps from "../util/filterProps";

const name = "modalLink";
const ownProps = ["triggerParam", "importAction", "modal", "children"];

export default defineComponent({
    name,
    render(props) {
        const linkProps = filterProps(props, ownProps);
        const additionalParams = Object.assign({}, props.additionalParams);

        additionalParams[props.triggerParam] = 1;

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
