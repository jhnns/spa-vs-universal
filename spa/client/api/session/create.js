import fetch from "unfetch";
import localSession from "./local";
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
                localSession.token = res.data.token;
                localSession.user = res.data.user;

                return res.data;
            }

            throw new Error(res.message);
        });
}
