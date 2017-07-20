import fetch from "node-fetch";
import config from "../../../config/server";

const root = `http://${ config.hostname }:${ config.port }/api`;

function includeCredentials(options) {
    return typeof options.credentials === "string" && options.credentials.toLowerCase() === "same-origin";
}

export default function api({ req, res }) {
    return (url, options = {}) => {
        if (includeCredentials(options)) {
            options.headers = options.headers || {};
            options.headers.cookie = req.headers.cookie;
        }

        return fetch(root + url, options).then(apiRes => {
            const cookie = apiRes.headers.get("set-cookie");

            if (!cookie) {
                return apiRes;
            }

            // The API responded with a different session, we need to switch this one
            return new Promise((resolve, reject) => {
                req.session.destroy(err => {
                    if (err) {
                        reject(err);

                        return;
                    }
                    res.removeHeader("Set-Cookie");
                    res.header("Set-Cookie", cookie);
                    resolve(apiRes);
                });
            });
        });
    };
}
