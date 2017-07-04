import fetch from "unfetch";
import config from "../config";

const defaultOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

export default function create(payload) {
    return fetch(`${ config.root }/session`, {
        ...defaultOptions,
        body: JSON.stringify(payload),
    })
        .then(res => res.json())
        .then(res => {
            if (res.status === "success") {
                config.token = res.data.token;

                return res.data;
            }

            throw new Error(res.message);
        });
}
