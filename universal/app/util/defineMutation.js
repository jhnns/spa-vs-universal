export default function defineMutation(namespace, transformPayload) {
    return {
        type: namespace,
        create: (...args) => ({
            type: namespace,
            payload: transformPayload(...args),
        }),
    };
}
