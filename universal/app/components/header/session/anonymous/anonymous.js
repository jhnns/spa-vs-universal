import defineComponent from "../../../util/defineComponent";
import { state as routerState } from "../../../router/router";
import Link from "../../../router/link";
import { link } from "../../link.css";
import { nbsp } from "../../../../util/htmlEntities";
import ModalTrigger from "../../../modal/modalTrigger";
import loginForm from "../../../loginForm";

const name = "headerSessionAnonymous";
const LoginFormPlaceholder = loginForm.Placeholder;

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ params }) => ({
            showLoginParams: {
                ...params,
                showLogin: 1,
            },
        }),
    },
    render(props, state) {
        return (
            <div>
                <Link params={state.showLoginParams} {...link}>
                    Log{nbsp}in
                </Link>
                <ModalTrigger triggerParam={"showLogin"} importAction={loginForm.import}>
                    <LoginFormPlaceholder />
                </ModalTrigger>
            </div>
        );
    },
});
