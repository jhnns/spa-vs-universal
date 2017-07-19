import api from "../../api";

const defaultOptions = {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
};

export default function destroy(context) {
    return (name, password) =>
        api(context)("/session", {
            ...defaultOptions,
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    return res.data;
                }

                throw new Error(res.message);
            });
}
