export default function csrf({ req }) {
    return () => (typeof req.csrfToken === "function" ? req.csrfToken() : null);
}
