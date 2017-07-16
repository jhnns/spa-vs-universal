import renderToString from "preact-render-to-string";
import { renderStatic } from "glamor-server";
import { selectLoadedChunks } from "../components/chunks/chunks";

export default function renderApp(app, store) {
    return new Promise(resolve => {
        resolve(renderStatic(() => renderToString(app)));
    }).then(({ html, css }) => {
        const state = store.getState();

        return {
            html,
            css,
            state,
            chunks: selectLoadedChunks(state),
        };
    });
}
