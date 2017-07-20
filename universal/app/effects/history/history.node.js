import { SEE_OTHER } from "../../util/statusCodes";

export default {
    push: () => url => {
        throw new Error(`Cannot push ${ url } to server history. Use replace() to respond with a redirect.`);
    },
    replace: ({ res }) => (url, statusCode = SEE_OTHER) => {
        // It is important to use the redirect() method here or otherwise express-session
        // won't save the session on POST requests
        // https://stackoverflow.com/a/26532987
        res.redirect(statusCode, url);

        return false; // false = do not enter the next route
    },
    reset: ({ res }) => (url, statusCode = SEE_OTHER) => {
        res.redirect(statusCode, url);

        return false; // false = do not enter the next route
    },
};
