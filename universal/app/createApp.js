import App from "./components/app/app";
import createStore from "./store/createStore";
import contexts from "./contexts";

export default function createApp(initialState, effectContext) {
    const store = createStore(contexts.state, initialState, effectContext);
    const app = <App store={store} />;

    return {
        app,
        store,
    };
}
