import http from "http";
import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectGzipStatic from "connect-gzip-static";
import helmet from "helmet";
import config from "./config";
import api from "./api";
import universalApp from "../app/server";

const app = express();
const pathToPublic = path.resolve(process.cwd(), "dist", "public");

app.server = http.createServer(app);

app.use(morgan("dev"));
app.use(helmet());
app.use(
    cors({
        exposedHeaders: config.corsHeaders,
    })
);
api(app);
app.use(connectGzipStatic(pathToPublic));
app.use(universalApp);

app.server.listen(process.env.PORT || config.port, config.hostname || "localhost", () => {
    console.log(`Started on port ${ app.server.address().port }`);
});

export default app;
