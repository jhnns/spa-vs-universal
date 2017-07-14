import defineComponent from "../../../util/defineComponent";
import { state as routerState } from "../../../router/router";
import Link from "../../../router/link";
import { link } from "../../link.css";
import { nbsp } from "../../../../util/htmlEntities";
import ModalRef from "../../../modal/modalRef";

const name = "headerSessionAnonymous";

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ params }) => ({
            params: {
                ...params,
                showLogin: 1,
            },
        }),
    },
    render(props, state) {
        return (
            <div>
                <Link params={state.params} {...link}>
                    Log{nbsp}in
                </Link>
                <ModalRef activationParam={"showLogin"}>
                    <div>
                        <h1>Hello this is a Modal</h1>
                    </div>
                </ModalRef>
            </div>
        );
    },
});
