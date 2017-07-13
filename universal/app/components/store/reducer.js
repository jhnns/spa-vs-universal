const actionTypePattern = /^(\w+)\/(\w+)\/(\w+)$/i;

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
