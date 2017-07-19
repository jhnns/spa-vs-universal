export default function methodNotAllowed(allowedMethods, requestPathname) {
    return {
        statusCode: 405,
        title: "Method not allowed",
        message: `: Only ${ allowedMethods.join(", ") } is allowed at ${ requestPathname }.`,
    };
}
