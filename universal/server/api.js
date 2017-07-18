import mockRestMiddleware from "mock-rest-middleware";
import passport from "passport";
import passportJwt from "passport-jwt";
import compression from "compression";
import jwt from "jsonwebtoken";
import { isProd } from "./env";
import config from "./config";
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
    app.use("/api", passport.initialize());
    app.use("/api", (req, res, next) => {
        // Fake a delayed DB response
        setTimeout(next, config.responseDelay);
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
        const data = { token, user };

        // Generate new session id for logged in user
        // Prevents session fixation attacks, see https://en.wikipedia.org/wiki/Session_fixation
        req.session.regenerate(err => {
            if (err) {
                next(err);

                return;
            }

            Object.assign(req.session, data);
            res.status(201).json({ status: "success", data });
        });
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
