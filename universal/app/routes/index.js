import top5 from "./top5";
import allPosts from "./allPosts";
import about from "./about";
import session from "./session";
import error from "./error";
import notFound from "./notFound";
import addObjectKeys from "../util/addObjectKeys";

function defineRoutes(routes) {
    return addObjectKeys(routes, "name");
}

export default defineRoutes({
    top5: {
        url: "/",
        entry: top5.import,
        placeholder: () => top5.Placeholder,
    },
    allPosts: {
        url: "/all",
        entry: allPosts.import,
        placeholder: () => allPosts.Placeholder,
    },
    about: {
        url: "/about",
        entry: about.import,
        placeholder: () => about.Placeholder,
    },
    login: {
        url: "/login",
        entry: session.import,
        placeholder: () => session.Placeholder,
    },
    logout: {
        url: "/logout",
        entry: session.import,
        placeholder: () => session.Placeholder,
    },
    error: {
        entry: error.import,
        error: true,
        placeholder: () => error.Placeholder,
    },
    notFound: {
        entry: notFound.import,
        error: true,
        placeholder: () => notFound.Placeholder,
    },
});
