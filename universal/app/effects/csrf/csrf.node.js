export default function csrf({ req }) {
    return () => req.csrfToken();
}
