export default function (state = {}, updateAction) {
    if (updateAction.scope === undefined) {
        return state;
    }

    return {
        ...state,
        [updateAction.scope]: updateAction.payload,
    };
}
