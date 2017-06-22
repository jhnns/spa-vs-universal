// TODO
export default function register() {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                // Provided by the sw-precache-webpack-plugin
                .register("/service-worker.js")
                .then(registration => {
                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;

                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === "installed") {
                                if (navigator.serviceWorker.controller) {
                                    console.log(
                                        "New content is available; please refresh."
                                    );
                                } else {
                                    console.log(
                                        "Content is cached for offline use."
                                    );
                                }
                            }
                        };
                    };
                })
                .catch(error => {
                    console.error(
                        "Error during service worker registration:",
                        error
                    );
                });
        });
    }
}

export function unregister() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
