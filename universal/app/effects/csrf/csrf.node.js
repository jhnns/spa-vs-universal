export default function csrf({ req }) {
    // We need to check for the csrfToken function because there might have been an error in our middleware stack
    // and the function is not defined yet.
    return () => (typeof req.csrfToken === "function" ? req.csrfToken() : null);
}
