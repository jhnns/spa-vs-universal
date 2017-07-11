import App from "./components/app/app";
import createStore from "./components/store/createStore";

export default function createApp(initialState) {
    const store = createStore(initialState);
    const app = <App store={store} />;

    return {
        app,
        store,
    };
}
