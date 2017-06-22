export function toRes(res, status = 200) {
    return (err, thing) => {
        if (err) {
            res.status(500).send(err);

            return;
        }

        if (thing && typeof thing.toObject === "function") {
            thing = thing.toObject();
        }
        res.status(status).json(thing);
    };
}
