import "source-map-support/register";
import http from "http";
import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectGzipStatic from "connect-gzip-static";
import helmet from "helmet";
import bodyParser from "body-parser";
import config from "./config";
import api from "./api";

const app = express();
const pathToPublic = path.resolve(process.cwd(), "dist", "public");
const universalApp = require(path.resolve(process.cwd(), "dist", "app", "server")).default;

app.server = http.createServer(app);

app.use(morgan("dev"));
app.use(helmet());
app.use(
    cors({
        exposedHeaders: config.corsHeaders,
    })
);
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
api(app);
app.use(
    connectGzipStatic(pathToPublic, {
        // We use hashed filenames, a long max age is ok
        maxAge: 365 * 24 * 60 * 60 * 1000,
    })
);
app.use(universalApp);

app.server.listen(process.env.PORT || config.port, config.hostname || "localhost", () => {
    console.log(`Started on port ${ app.server.address().port }`);
});

export default app;
