import top5 from "./top5";
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
    // allPosts: {
    //     url: "/all",
    //     entry: { get: allPosts.import },
    //     placeholder: () => allPosts.Placeholder,
    // },
    // about: {
    //     url: "/about",
    //     entry: { get: about.import },
    //     placeholder: () => about.Placeholder,
    // },
    // login: {
    //     url: "/login",
    //     entry: { post: sessionActions.import },
    //     placeholder: () => sessionActions.Placeholder,
    // },
    // logout: {
    //     url: "/logout",
    //     entry: { delete: sessionActions.import },
    //     placeholder: () => sessionActions.Placeholder,
    // },
    // error: {
    //     entry: error.import,
    //     error: true,
    //     placeholder: () => error.Placeholder,
    // },
    // notFound: {
    //     entry: notFound.import,
    //     error: true,
    //     placeholder: () => notFound.Placeholder,
    // },
});
