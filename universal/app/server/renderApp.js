import renderToString from "preact-render-to-string";
import { renderStatic } from "glamor-server";
import { selectLoadedChunks } from "../components/chunks/chunks";

export default function renderApp(app, store) {
    return new Promise(resolve => {
        resolve(renderStatic(() => renderToString(app)));
    })
        .then(renderResult => store.stable.then(() => renderResult))
        .then(({ html, css }) => {
            const stableState = store.getState();

            return {
                html,
                css,
                state: stableState,
                chunks: selectLoadedChunks(stableState),
            };
        });
}
