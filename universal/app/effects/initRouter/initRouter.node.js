import { parse } from "url";
import URLSearchParams from "url-search-params";
import createRouter from "./createRouter";
import mergeParams from "./mergeParams";

export default function initRouter(entryUrl, handleRouteMatch) {
    return new Promise(resolve => {
        const parsedUrl = parse(entryUrl);
        const searchParams = new URLSearchParams(parsedUrl.query);
        const router = createRouter((route, urlParams) => {
            resolve(handleRouteMatch(route, mergeParams(urlParams, searchParams)));
        });

        router(parsedUrl.pathname);
    });
}
