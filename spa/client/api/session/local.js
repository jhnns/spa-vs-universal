const localStorageNamespace = "session";
const session = deserialize() || {
    user: null,
    token: null,
};

function serialize() {
    localStorage.setItem(localStorageNamespace, JSON.stringify(session));
}

function deserialize() {
    const sessionString = localStorage.getItem(localStorageNamespace);

    if (sessionString === null) {
        return null;
    }

    return JSON.parse(sessionString);
}

export function update(newValues) {
    Object.keys(newValues).forEach(key => {
        session[key] = newValues[key];
    });
    serialize();
}

export default session;
