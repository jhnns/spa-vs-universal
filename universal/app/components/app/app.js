import { root, main } from "./app.css";
import Header from "../header/header";

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
    return (
        <div {...root}>
            <Header />
            <main {...main} />
        </div>
    );
}
