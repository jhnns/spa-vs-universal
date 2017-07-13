import defineRoutes from "./util/defineRoutes";
import top5 from "./components/top5";
import allPosts from "./components/allPosts";
import about from "./components/about";

export default defineRoutes({
    top5: {
        match: "/",
        action: top5.loadAction,
        Placeholder: top5.Placeholder,
    },
    allPosts: {
        match: "/all",
        action: allPosts.loadAction,
        Placeholder: allPosts.Placeholder,
    },
    about: {
        match: "/about",
        action: about.loadAction,
        Placeholder: about.Placeholder,
    },
    // notFound: {
    //     match: "/404",
    //     component: () => import("./components/notFound/notFound" /* webpackChunkName: "notFound" */),
    // },
});
