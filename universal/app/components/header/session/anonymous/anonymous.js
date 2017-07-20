import defineComponent from "../../../util/defineComponent";
import { state as routerState } from "../../../router/router";
import { link } from "../../link.css";
import { nbsp } from "../../../../util/htmlEntities";
import ModalLink from "../../../modal/modalLink";
import loginForm from "../../../loginForm";
import renderUrl from "../../../../util/renderUrl";
import filterProps from "../../../../util/filterProps";

const name = "headerSessionAnonymous";
const LoginFormPlaceholder = loginForm.Placeholder;
const emptyObj = {};
const triggerParam = "showLogin";

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ request, route, params }) => ({
            nextUrlAfterLogin: renderUrl(route.url, filterProps(params, [triggerParam])),
        }),
    },
    render(props, state) {
        return (
            <div>
                <ModalLink
                    modal={<LoginFormPlaceholder autoFocus={true} next={state.nextUrlAfterLogin} />}
                    triggerParam={triggerParam}
                    importAction={loginForm.import}
                    {...link}
                >
                    Log{nbsp}in
                </ModalLink>
            </div>
        );
    },
});
