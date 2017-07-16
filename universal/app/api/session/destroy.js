import { update as updateLocalSession } from "./local";

export default function destroy() {
    updateLocalSession({
        token: null,
        user: null,
    });
    // Only a hard reload ensures that all personal data is cleared
    window.location.reload();
}
