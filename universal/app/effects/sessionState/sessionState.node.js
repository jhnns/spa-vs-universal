export default {
    read: ({ req }) => () => req.session,
    write: ({ req }) => session => {
        Object.assign(req.session, session);
    },
};
