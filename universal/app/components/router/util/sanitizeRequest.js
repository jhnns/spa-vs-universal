import url from "url";

const defaultRequest = {
    method: "GET",
    url: "/",
    body: {},
};

function parseUrlAndQueryString(u) {
    return url.parse(u, true);
}

export default function sanitizeRequest(req) {
    const request = typeof req === "string" ? { ...defaultRequest, url: req } : req;
    const parsedUrl = parseUrlAndQueryString(request.url);

    return {
        sanitized: true,
        method: request.method.toUpperCase(),
        url: parsedUrl.path + (typeof parsedUrl.hash === "string" ? parsedUrl.hash : ""),
        parsedUrl,
        body: request.body,
    };
}
