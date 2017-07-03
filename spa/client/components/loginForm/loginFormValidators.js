const validators = new Map();

validators.set("name", values => {
    const name = values.get("name");

    if (name === "") {
        return "Missing login name";
    }

    return null;
});
validators.set("password", values => {
    const password = values.get("password");

    if (password === "") {
        return "Missing password";
    }

    return null;
});

export default validators;
