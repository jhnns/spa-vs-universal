import registry from "../effects/registry";

export default function defineEffect(namespace, executor) {
    registry.set(namespace, executor);

    return namespace;
}
