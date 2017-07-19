import parseUrl from "./parseUrl";

const defaultRequest = {
    method: "get",
    url: "/",
    body: {},
};

export default function sanitizeRequest(req) {
    const request = typeof req === "string" ? { ...defaultRequest, url: req } : req;
    const parsedUrl = parseUrl(request.url);

    return {
        sanitized: true,
        method: request.method.toLowerCase(),
        url: parsedUrl.path + (typeof parsedUrl.hash === "string" ? parsedUrl.hash : ""),
        parsedUrl,
        body: request.body,
    };
}