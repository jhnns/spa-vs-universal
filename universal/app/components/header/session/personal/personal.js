import { root, userName, userImage } from "./personal.css";
import { nbsp } from "../../../../util/htmlEntities";
import Link from "../../../router/link";
import { link } from "../../link.css";
import defineForm from "../../../form/defineForm";
import Form from "../../../form/form";
import contexts from "../../../../contexts";

const LogoutForm = defineForm({
    name: "logoutForm",
    context: contexts.state,
    connectToStore: state => ({
        watch: [state.select],
        mapToState: s => s,
    }),
    render(props, { csrfToken }) {
        return (
            <Form method={"delete"}>
                <input type="submit">
                    Log{nbsp}out
                </input>
            </Form>
        );
    },
});

export default function HeaderSessionPersonal(props) {
    const user = props.user;

    if (user === null) {
        return null;
    }

    return (
        <div {...root}>
            <img src={user.image} alt={user.name} {...userImage} />
            <span {...userName}>
                {user.name}
            </span>
            <span>
                <Link {...link}>
                    Log{nbsp}out
                </Link>
            </span>
        </div>
    );
}
