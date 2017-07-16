import nanorouter from "nanorouter";
import routes from "../../routes";
import has from "../../util/has";

export default function createRouter() {
    const router = nanorouter({ default: "/404" });
    let result;

    Object.values(routes).filter(route => has(route, "match")).forEach(route => {
        router.on(route.match, urlParams => (result = { route, urlParams }));
    });

    return url => {
        router(url);

        return result;
    };
}
