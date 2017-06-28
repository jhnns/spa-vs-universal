import http from "http";
import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import config from "../config/server";
import fakeApi from "./api";

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
app.use(
    bodyParser.json({
        limit: config.bodyLimit,
    })
);
app.use("/api", (req, res, next) => {
    // Fake a delayed DB response
    setTimeout(next, config.responseDelay);
});
app.use("/api", fakeApi.getMiddleware());
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use((req, res, next) => {
    res.sendfile(pathToIndexHtml);
});

app.server.listen(
    process.env.PORT || config.port,
    config.hostname || "localhost",
    () => {
        console.log(`Started on port ${ app.server.address().port }`);
    }
);

export default app;
