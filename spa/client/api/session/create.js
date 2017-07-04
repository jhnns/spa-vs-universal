import fetch from "unfetch";
import config from "../config";

const defaultOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

export default function create(name, password) {
    return fetch(`${ config.root }/session`, {
        ...defaultOptions,
        body: JSON.stringify({
            name,
            password,
        }),
    })
        .then(res => res.json())
        .then(res => {
            config.token = res.data.token;

            return res.data;
        });
}
