import has from "../../util/has";

export default function csrf({ req }) {
    return () => {
        const token = has(req.session, "csrf") ? req.session.csrf : req.csrfToken();

        req.session.csrf = token;

        return token;
    };
}
