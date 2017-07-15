import App from "./components/app/app";
import createStore from "./components/store/createStore";
import registries from "./registries";

export default function createApp(initialState) {
    const store = createStore(registries.stateContext, initialState);
    const app = <App store={store} />;

    return {
        app,
        store,
    };
}
