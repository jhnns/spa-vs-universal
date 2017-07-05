import { update as updateLocalSession } from "./local";

export default function destroy() {
    updateLocalSession({
        token: null,
        user: null,
    });
}
