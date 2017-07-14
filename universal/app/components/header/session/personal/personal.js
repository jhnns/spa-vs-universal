import defineComponent from "../../../util/defineComponent";
import { root, userName, userImage } from "./personal.css";
import { nbsp } from "../../../../util/htmlEntities";

const name = "headerSessionPersonal";

export default defineComponent({
    name,
    render(props) {
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
                    Log{nbsp}out
                </span>
            </div>
        );
    },
});
