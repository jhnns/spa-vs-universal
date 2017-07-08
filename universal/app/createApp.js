import App from "./components/app/app";
import createStore from "./store/createStore";

export default function createApp(initialState) {
    return {
        app: <App />,
        store: createStore(initialState),
    };
}
