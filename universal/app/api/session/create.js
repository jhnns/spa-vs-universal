import fetch from "../../effects/fetch";

const defaultOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

export default function create(payload) {
    return fetch("/session", {
        ...defaultOptions,
        body: JSON.stringify(payload),
    })
        .then(res => res.json())
        .then(res => {
            if (res.status === "success") {
                return res.data;
            }

            throw new Error(res.message);
        });
}
