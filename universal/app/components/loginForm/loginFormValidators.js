export default {
    name: values => {
        const name = values.get("name");

        if (name === "") {
            return "Missing login name";
        }

        return null;
    },
    password: values => {
        const password = values.get("password");

        if (password === "") {
            return "Missing password";
        }

        return null;
    },
};
