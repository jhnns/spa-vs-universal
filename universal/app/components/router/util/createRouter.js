import nanorouter from "nanorouter";
import routes from "../../../routes";

export default function createRouter() {
    const router = nanorouter({ default: "/404" });
    let result;

    Object.values(routes).forEach((route, i, arr) => {
        let urlPattern = route.url;

        if (i === arr.length - 1) {
            if (typeof urlPattern === "string") {
                // throw new Error("Expected the last catch-all route to have no url pattern");
            }
            urlPattern = "404";
        } else if (typeof urlPattern !== "string") {
            // Skip routes without an url pattern
            return;
        }
        router.on(urlPattern, urlParams => (result = { route, urlParams }));
    });

    return url => {
        router(url);

        return result;
    };
}
