import "source-map-support/register";
import http from "http";
import path from "path";
import { parse as parseUrl } from "url";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import csurf from "csurf";
import connectGzipStatic from "connect-gzip-static";
import helmet from "helmet";
import bodyParser from "body-parser";
import config from "./config";
import api from "./api";
import { isDev } from "./env";

const app = express();
const pathToPublic = path.resolve(process.cwd(), "dist", "public");
const universalApp = require(path.resolve(process.cwd(), "dist", "app", "server")).default;
const expectedReferrers = ["http://" + config.hostname + ":" + config.port];

if (isDev) {
    expectedReferrers.push("http://" + config.hostname + ":" + config.devServerPort);
}

app.server = http.createServer(app);

app.use(morgan("dev"));
app.use(helmet());
// "same-origin" would be the best, but "origin-when-cross-origin" has the best cross-browser support
app.use(helmet.referrerPolicy({ policy: "origin-when-cross-origin" }));
app.use(
    bodyParser.json({
        limit: config.bodyLimit,
    })
);
app.use(
    bodyParser.urlencoded({
        limit: config.bodyLimit,
        extended: true,
    })
);
app.use(session(config.session));
api(app);
app.use(
    connectGzipStatic(pathToPublic, {
        // We use hashed filenames, a long max age is ok
        maxAge: 365 * 24 * 60 * 60 * 1000,
    })
);
app.use((req, res, next) => {
    if (req.body && typeof req.body._method === "string") {
        req.method = req.body._method.toUpperCase();
    }
    next();
});
app.use(csurf());
app.use((req, res, next) => {
    // GET requests don't require a referrer header
    if (req.method === "GET") {
        next();

        return;
    }

    const referrer = req.headers.referer || req.headers.referrer;

    if (typeof referrer === "string") {
        const parsed = parseUrl(referrer);

        if (expectedReferrers.indexOf(parsed.protocol + "//" + parsed.host) > -1) {
            next();

            return;
        }
    }

    const error = new Error("Correct referer header missing");

    error.code = "EBADREFERER";

    next(error);
});
app.use((err, req, res, next) => {
    if (err.code === "EBADREFERER") {
        req.error = {
            code: 403,
            title: err.message,
        };
    } else if (err.code === "EBADCSRFTOKEN") {
        req.error = {
            code: 403,
            title: "Bad CSRF Token",
        };
    } else {
        throw err;
    }
    next();
});
app.use(universalApp);

app.server.listen(config.port, config.hostname, () => {
    console.log(`Started on port ${ app.server.address().port }`);
});

export default app;
