import has from "../../util/has";

export default {
    read: ({ req }) => () => req.session,
    write: ({ req }) => session => {
        Object.assign(req.session, session);
    },
    readFlash: ({ req }) => key => {
        const flashes = req.session.flashes ? req.session.flashes : {};

        if (has(flashes, key) === false) {
            return null;
        }

        const value = flashes[key];

        delete flashes[key];

        return value;
    },
    writeFlash: ({ req }) => (key, value) => {
        const flashes = req.session.flashes ? req.session.flashes : {};

        flashes[key] = value;
        req.session.flashes = flashes;
    },
};
