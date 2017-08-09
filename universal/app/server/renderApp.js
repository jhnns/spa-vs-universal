import renderToString from "preact-render-to-string";
import { selectLoadedChunks } from "../components/chunks/chunks";

export default function renderApp(app, store) {
    return Promise.resolve().then(() => renderToString(app)).then(html => {
        const state = store.getState();

        return {
            html,
            state,
            chunks: selectLoadedChunks(state),
        };
    });
}
