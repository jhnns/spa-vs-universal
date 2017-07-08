export default function defineAction(namespace, creator) {
    return {
        type: namespace,
        create: payload => ({
            type: namespace,
            payload,
        }),
    };
}
