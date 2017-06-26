import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import initializeDb from "./db";
import middleware from "./middleware";
import config from "../config/server";
import fakeApi from "./api";

const app = express();

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

// connect to db
initializeDb(db => {
    // internal middleware
    app.use(middleware({ config, db }));

    app.use("/api", fakeApi.getMiddleware());

    app.server.listen(
        process.env.PORT || config.port,
        config.hostname || "localhost",
        () => {
            console.log(`Started on port ${ app.server.address().port }`);
        }
    );
});

export default app;
