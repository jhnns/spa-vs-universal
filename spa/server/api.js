import mockRestMiddleware from "mock-rest-middleware";
import passport from "passport";
import passportJwt from "passport-jwt";
import compression from "compression";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { isProd } from "./env";
import config from "../config/server";
import dummyPosts from "./dummyData/posts";
import dummyUsers from "./dummyData/users";

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: "peerigon",
};

passport.use(
    new passportJwt.Strategy(jwtOptions, (jwtPayload, next) => {
        const user = dummyUsers.find(user => user.id === jwtPayload.id);

        next(null, user === undefined ? false : user);
    })
);

const authenticateJwt = passport.authenticate("jwt", {
    session: false,
    failWithError: true,
});
const api = mockRestMiddleware();

api.addResource("/posts", dummyPosts);
api.addResource("/users", dummyUsers);

export default app => {
    if (isProd) {
        app.use("/api", compression());
    }
    app.use(
        "/api",
        bodyParser.json({
            limit: config.bodyLimit,
        })
    );
    app.use("/api", passport.initialize());
    app.use("/api", (req, res, next) => {
        // Fake a delayed DB response
        const now = process.hrtime();

        setTimeout(() => {
            const diff = process.hrtime(now);
            const diffInNanoseconds = diff[0] * 1e9 + diff[1];

            console.log("Delayed response with a setTimeout of", Math.round(diffInNanoseconds / 1e6 - 300), "ms");
            next();
        }, config.responseDelay);
    });
    app.use("/api/users", authenticateJwt);
    app.get("/api/session", authenticateJwt, (req, res) => {
        res.status(200).json({
            status: "success",
            data: {
                user: req.user,
            },
        });
    });
    app.post("/api/session", (req, res, next) => {
        const name = req.body.name;
        const password = req.body.password;

        // Dummy authentication
        // In the real world, this should be a comparison that is safe against timing attacks
        const user = dummyUsers.find(user => user.name === name);

        if (user === undefined || password !== "password") {
            res.status(400).json({
                status: "fail",
                message: "Bad user name or password",
            });

            return;
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.status(201).json({ status: "success", data: { token, user } });
    });
    app.use("/api", api.getMiddleware());
    app.use((err, req, res, next) => {
        if (err.name === "AuthenticationError") {
            res.status(err.status).json({ status: "fail", message: err.message });

            return;
        }
        next(err);
    });
};
