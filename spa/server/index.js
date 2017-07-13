import http from "http";
import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectGzipStatic from "connect-gzip-static";
import helmet from "helmet";
import config from "../config/server";
import api from "./api";

const app = express();
const pathToIndexHtml = path.resolve(__dirname, "..", "public", "index.html");

app.server = http.createServer(app);

app.use(morgan("dev"));
app.use(helmet());
app.use(
    cors({
        exposedHeaders: config.corsHeaders,
    })
);
api(app);
app.use(
    connectGzipStatic(path.resolve(__dirname, "..", "public"), {
        // We use hashed filenames, a long max age is ok
        maxAge: 365 * 24 * 60 * 60 * 1000,
    })
);
app.use((req, res, next) => {
    res.sendFile(pathToIndexHtml);
});

app.server.listen(process.env.PORT || config.port, config.hostname || "localhost", () => {
    console.log(`Started on port ${ app.server.address().port }`);
});

export default app;
