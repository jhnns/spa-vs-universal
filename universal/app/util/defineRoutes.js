import addObjectKeys from "./addObjectKeys";

export default function defineRoutes(routes) {
    return addObjectKeys(routes, "name");
}
