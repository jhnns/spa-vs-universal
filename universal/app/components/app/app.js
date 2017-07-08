import { root, main } from "./app.css";
import Header from "../header/header";
import WithContext from "../util/withContext";
import RoutePlaceholder from "../router/routePlaceholder";
import Namespace from "../util/namespace";
import defineState from "../util/defineState";

const moduleNs = new Namespace(module.id);

export const state = defineState(moduleNs.get("app"), {
    initial: {
        hasPendingActions: false,
    },
    actions: {
        hasPendingActions: (state, payload) => ({
            ...state,
            hasPendingActions: payload,
        }),
    },
});

// export function replaceReducersMiddleware(store) {
//     return next => action => {
//         if (action.type === state.actions.addReducer) {
//             store.dispatch(state.actions.addReducer());
//         } else if (action.type === state.actions.removeReducer) {
//             store.dispatch(state.actions.removeReducer());
//         }

//         const payload = action.payload;
//         const isPromise = typeof action.payload.then === "function";

//         if (isPromise === true) {
//             store.dispatch(state.actions.increasePending());
//             payload.then(() => store.dispatch(state.actions.decreasePending));
//         }
//     };
// }

export default function App(props) {
    const { store } = props;

    return (
        <WithContext context={{ store }}>
            <div {...root}>
                <Header />
                <main {...main}>
                    <RoutePlaceholder />
                </main>
            </div>
        </WithContext>
    );
}
