export default {
    read: ({ req }) => () => req.session,
    write: ({ req }) => session => {
        Object.assign(req.session, session);
    },
    writeFormData: ({ req }) => (formName, data) => {
        req.session[formName] = data;
    },
    readFormData: ({ req }) => session => {
        Object.assign(req.session, session);
    },
};
