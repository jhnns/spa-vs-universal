import { root, main } from "./app.css";
import Header from "../header/header";
import Store from "../store/store";
import RoutePlaceholder from "../router/routePlaceholder";
import Modal from "../modal/modal";

export default function App(props) {
    return (
        <Store store={props.store}>
            <div {...root}>
                <Header />
                <main {...main}>
                    <RoutePlaceholder />
                </main>
                <Modal />
            </div>
        </Store>
    );
}
