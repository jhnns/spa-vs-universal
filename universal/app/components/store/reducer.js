const actionTypePattern = /^(\w+)\/(\w+)\/(\w+)$/i;

export default function (state = {}, action) {
    const typeMatch = actionTypePattern.exec(action.type);

    if (typeMatch !== null) {
        const scope = typeMatch[1];
        const actionType = typeMatch[3];

        if (actionType === "patch") {
            return {
                ...state,
                [scope]: action.payload,
            };
        }
    }

    return state;
}
