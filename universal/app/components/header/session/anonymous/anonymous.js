import defineComponent from "../../../util/defineComponent";
import { state as routerState } from "../../../router/router";
import Link from "../../../router/link";
import { link } from "../../link.css";
import { nbsp } from "../../../../util/htmlEntities";
import ModalTrigger from "../../../modal/modalTrigger";
import loginForm from "../../../loginForm";
import matchPatternToUrl from "../../../../util/matchPatternToUrl";

const name = "headerSessionAnonymous";
const LoginFormPlaceholder = loginForm.Placeholder;

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ route, params }) => {
            const paramsWithShowLogin = { ...params, showLogin: 1 };
            const paramsWithoutShowLogin = { ...params };

            delete paramsWithoutShowLogin.showLogin;

            return {
                paramsWithShowLogin,
                loginFormProps: {
                    next: matchPatternToUrl(route.match, paramsWithoutShowLogin),
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
