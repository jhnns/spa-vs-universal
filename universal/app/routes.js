import top5 from "./components/top5";
import allPosts from "./components/allPosts";
import about from "./components/about";
import notFound from "./components/notFound";
import login from "./components/login";
import addObjectKeys from "./util/addObjectKeys";

function defineRoutes(routes) {
    return addObjectKeys(routes, "name");
}

export default defineRoutes({
    top5: {
        match: "/",
        action: top5.import,
        Placeholder: top5.Placeholder,
    },
    allPosts: {
        match: "/all",
        action: allPosts.import,
        Placeholder: allPosts.Placeholder,
    },
    about: {
        match: "/about",
        action: about.import,
        Placeholder: about.Placeholder,
    },
    login: {
        match: "/login",
        action: login.import,
        Placeholder: login.Placeholder,
    },
    notFound: {
        match: "/404",
        action: notFound.import,
        Placeholder: notFound.Placeholder,
    },
});
