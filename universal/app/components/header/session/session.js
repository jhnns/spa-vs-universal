import { state as sessionState } from "../../session/session";
import Personal from "./personal/personal";
import Anonymous from "./anonymous/anonymous";
import defineComponent from "../../util/defineComponent";
import has from "../../../util/has";

const name = "headerSession";
const emptyObj = {};

export default defineComponent({
    name,
    connectToStore: {
        watch: [sessionState.select],
        mapToState({ user }) {
            return {
                user,
                isLoggedIn: user !== null,
            };
        },
    },
    render(props, state) {
        const user = state.user;
        const styles = has(props, "styles") ? props.styles : emptyObj;

        return (
            <div {...styles}>
                {state.isLoggedIn ? <Personal user={user} /> : <Anonymous />}
            </div>
        );
    },
});
