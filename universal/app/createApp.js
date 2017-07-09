import App from "./components/app/app";
import createStore from "./store/createStore";
import createRouter from "./router/createRouter";

export default function createApp(initialState) {
    const store = createStore(initialState);
    const router = createRouter(store);

    return {
        app: <App />,
        store,
        router,
    };
}
