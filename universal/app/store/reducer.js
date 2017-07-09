const actionTypePattern = /^([a-z]+)\/([a-z]+)\/([a-z]+)$/gi;

export default function (state = {}, updateAction) {
    const typeMatch = actionTypePattern.exec(updateAction.type);

    if (typeMatch === null) {
        return state;
    }

    const scope = typeMatch[1];

    return {
        ...state,
        [scope]: updateAction.payload,
    };
}
