import defineComponent from "../../../util/defineComponent";
import { state as routerState } from "../../../router/router";
import Link from "../../../router/link";
import { link } from "../../link.css";
import { nbsp } from "../../../../util/htmlEntities";
import ModalTrigger from "../../../modal/modalTrigger";
import loginForm from "../../../loginForm";
import renderUrl from "../../../../util/renderUrl";

const name = "headerSessionAnonymous";
const LoginFormPlaceholder = loginForm.Placeholder;
const emptyObj = {};

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ route, params }) => {
            const paramsToExtend = route.error === true ? emptyObj : params;
            const paramsWithShowLogin = { ...paramsToExtend, showLogin: 1 };
            const paramsWithoutShowLogin = { ...paramsToExtend };

            delete paramsWithoutShowLogin.showLogin;

            return {
                paramsWithShowLogin,
                loginFormProps: {
                    next: renderUrl(route.url, paramsWithoutShowLogin),
                },
            };
        },
    },
    render(props, state) {
        return (
            <div>
                <Link params={state.paramsWithShowLogin} {...link}>
                    Log{nbsp}in
                </Link>
                <ModalTrigger triggerParam={"showLogin"} importAction={loginForm.import}>
                    <LoginFormPlaceholder props={state.loginFormProps} />
                </ModalTrigger>
            </div>
        );
    },
});
