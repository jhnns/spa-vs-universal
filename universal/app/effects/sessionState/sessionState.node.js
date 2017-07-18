export function read({ req }) {
    return () => req.session;
}

export function write({ req }) {
    return session => Object.assign(req.session, session);
}
