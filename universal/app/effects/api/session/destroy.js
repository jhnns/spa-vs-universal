import api from "../../api";

function getOptions(token) {
    return {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + token,
        },
    };
}

export default function destroy(context) {
    return token =>
        api(context)("/session", getOptions(token)).then(res => res.json()).then(res => {
            if (res.status === "success") {
                return res.data;
            }

            throw new Error(res.message);
        });
}
