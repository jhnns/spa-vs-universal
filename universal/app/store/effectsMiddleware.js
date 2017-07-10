import createContext from "../effects/createContext";

export default function effectsMiddleware(store) {
    const effectContext = createContext(store);
    const execEffect = effectContext.exec.bind(effectContext);

    return next => action => {
        if (typeof action.executor === "function") {
            return action.executor(store, execEffect);
        }

        return next(action);
    };
}
