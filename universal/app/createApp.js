import App from "./components/app/app";
import createStore from "./store/createStore";

export default function createApp(initialState) {
    const app = <App />;
    const store = createStore(initialState);

    return {
        app,
        store,
    };
}
