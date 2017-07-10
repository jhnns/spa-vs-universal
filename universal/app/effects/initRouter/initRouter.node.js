import { parse } from "url";
import createRouter from "./createRouter";

export default function initRouter(entryUrl, handleRouteMatch) {
    const parsedUrl = parse(entryUrl, true);
    const router = createRouter((routeName, urlParams) => {
        handleRouteMatch(routeName, urlParams, parsedUrl.query);
    });

    router(parsedUrl.pathname);
}
