import { Router } from "express";

export default ({ config, db }) => {
    const routes = new Router();

    routes.use((req, res, next) => {
        // Fake a delayed response
        setTimeout(next, config.responseDelay);
    });

    // add middleware here

    return routes;
};
