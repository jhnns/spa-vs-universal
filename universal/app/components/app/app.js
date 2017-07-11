import { root, main } from "./app.css";
import Header from "../header/header";
import Store from "../store/store";

export default function App(props) {
    return (
        <Store store={props.store}>
            <div {...root}>
                <Header />
                <main {...main} />
            </div>
        </Store>
    );
}
