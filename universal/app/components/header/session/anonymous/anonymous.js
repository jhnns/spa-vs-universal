import URLSearchParams from "url-search-params";
import defineComponent from "../../../util/defineComponent";
import { state as routerState } from "../../../router/router";
import Link from "../../../router/link";
import { link } from "../../link.css";
import { nbsp } from "../../../../util/htmlEntities";

const name = "headerSessionAnonymous";

export default defineComponent({
    name,
    connectToStore: {
        watch: [routerState.select],
        mapToState: ({ params }) => ({
            params: params.toString(),
        }),
    },
    render(props, state) {
        const paramsAndShowLogin = new URLSearchParams(state.params);

        paramsAndShowLogin.set("showLogin", 1);

        return (
            <div>
                <Link params={paramsAndShowLogin} {...link}>
                    Log{nbsp}in
                </Link>
            </div>
        );
    },
});
