export default {
    name: formData => {
        const name = formData.name;

        if (name === "") {
            return "Missing login name";
        }

        return null;
    },
    password: formData => {
        const password = formData.password;

        if (password === "") {
            return "Missing password";
        }

        return null;
    },
};
