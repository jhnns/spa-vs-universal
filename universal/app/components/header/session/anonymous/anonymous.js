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
            </div>
        );
    },
});
