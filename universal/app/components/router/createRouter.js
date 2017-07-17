import nanorouter from "nanorouter";
import routes from "../../routes";

export default function createRouter() {
    const router = nanorouter({ default: "/404" });
    let result;

    Object.values(routes).filter(route => !(route.error === true)).forEach(route => {
        router.on(route.url, urlParams => (result = { route, urlParams }));
    });

    return url => {
        router(url);

        return result;
    };
}
