import { root, userName, userImage } from "./personal.css";
import { link } from "../../link.css";
import defineForm from "../../../form/defineForm";
import defineComponent from "../../../util/defineComponent";
import Form from "../../../form/form";
import contexts from "../../../../contexts";
import routes from "../../../../routes";

const logoutForm = defineForm({
    name: "logoutForm",
    context: contexts.state,
});

const LogoutForm = defineComponent({
    name: "LogoutForm",
    connectToStore: {
        watch: [logoutForm.select],
        mapToState: ({ csrfToken }) => ({
            csrfToken,
        }),
    },
    render(props, { csrfToken }) {
        return (
            <Form method={"DELETE"} actionRoute={routes.session} csrfToken={csrfToken}>
                <input type="submit" value={"Log out"} {...link} />
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
            <LogoutForm />
        </div>
    );
}
