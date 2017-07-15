// 1 = context, 2 = scope, 3 = action, 4 = mutation
const actionTypePattern = /^(\w+)\/(\w+)\/(\w+)\/(\w+)$/i;

export default function createReducer(stateContext) {
    return function (state = {}, action) {
        const typeMatch = actionTypePattern.exec(action.type);

        if (typeMatch !== null) {
            const scope = typeMatch[2];
            const updateType = typeMatch[4];

            switch (updateType) {
                case "patch":
                    return {
                        ...state,
                        [scope]: {
                            ...stateContext.scopes[scope].select(state),
                            ...action.payload,
                        },
                    };
                case "put":
                    return {
                        ...state,
                        [scope]: action.payload,
                    };
            }
        }

        return state;
    };
}
