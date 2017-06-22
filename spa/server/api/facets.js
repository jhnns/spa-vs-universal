import resource from "resource-router-middleware";
import facets from "../models/facets";

export default ({ config, db }) =>
    resource({
        id: "facet",

        load(req, id, callback) {
            let facet = facets.find(facet => facet.id === id),
                err = facet ? null : "Not found";

            callback(err, facet);
        },

        index({ params }, res) {
            res.json(facets);
        },

        create({ body }, res) {
            body.id = facets.length.toString(36);
            facets.push(body);
            res.json(body);
        },

        read({ facet }, res) {
            res.json(facet);
        },

        update({ facet, body }, res) {
            for (const key in body) {
                if (key !== "id") {
                    facet[key] = body[key];
                }
            }
            res.sendStatus(204);
        },

        delete({ facet }, res) {
            facets.splice(facets.indexOf(facet), 1);
            res.sendStatus(204);
        },
    });
