import top5 from "./components/top5";
import allPosts from "./components/allPosts";
import about from "./components/about";
import notFound from "./components/notFound";
import error from "./components/error";
import login from "./components/login";
import addObjectKeys from "./util/addObjectKeys";

function defineRoutes(routes) {
    return addObjectKeys(routes, "name");
}

export default defineRoutes({
    top5: {
        url: "/",
        action: top5.import,
        Placeholder: top5.Placeholder,
    },
    allPosts: {
        url: "/all",
        action: allPosts.import,
        Placeholder: allPosts.Placeholder,
    },
    about: {
        url: "/about",
        action: about.import,
        Placeholder: about.Placeholder,
    },
    login: {
        url: "/login",
        action: login.import,
        Placeholder: login.Placeholder,
    },
    notFound: {
        url: "/404",
        action: notFound.import,
        Placeholder: notFound.Placeholder,
    },
    error: {
        url: "/",
        action: error.import,
        error: true,
        Placeholder: error.Placeholder,
    },
});
