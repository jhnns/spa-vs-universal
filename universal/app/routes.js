import top5 from "./components/top5";
import allPosts from "./components/allPosts";
import about from "./components/about";
import notFound from "./components/notFound";
import addObjectKeys from "./util/addObjectKeys";

function defineRoutes(routes) {
    return addObjectKeys(routes, "name");
}

export default defineRoutes({
    top5: {
        match: "/",
        action: top5.load,
        Placeholder: top5.Placeholder,
    },
    allPosts: {
        match: "/all",
        action: allPosts.load,
        Placeholder: allPosts.Placeholder,
    },
    about: {
        match: "/about",
        action: about.load,
        Placeholder: about.Placeholder,
    },
    notFound: {
        match: "/404",
        action: notFound.load,
        Placeholder: notFound.Placeholder,
    },
});
