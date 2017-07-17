import fetch from "../../fetch";

const defaultOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

export default function create(context) {
    return (name, password) =>
        fetch(context)("/session", {
            ...defaultOptions,
            body: JSON.stringify({ name, password }),
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    return res.data;
                }

                throw new Error(res.message);
            });
}
