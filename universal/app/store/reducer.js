export default function (state = {}, updateAction) {
    return {
        ...state,
        [updateAction.scope]: updateAction.payload,
    };
}
