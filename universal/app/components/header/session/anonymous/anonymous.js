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
        mapToState: ({ request, route, params }) => {
            const paramsToExtend = route.error === true ? emptyObj : params;

            return {
                nextUrlAfterLogin: renderUrl(route.url, filterProps(paramsToExtend, [triggerParam, "previous"])),
            };
        },
    },
    render(props, state) {
        return (
            <div>
                <ModalLink
                    modal={
                        <LoginFormPlaceholder
                            props={{
                                next: state.nextUrlAfterLogin,
                            }}
                        />
                    }
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
