export default {
    push: () => url => {
        history.pushState(null, "", url);

        return true; // true = enter the next route
    },
    replace: () => url => {
        history.replaceState(null, "", url);

        return true; // true = enter the next route
    },
    reset: () => url => {
        try {
            localStorage.clear();
        } catch (err) {
            console.error(err);
        }
        try {
            sessionStorage.clear();
        } catch (err) {
            console.error(err);
        }
        window.location = url;

        return true; // true = enter the next route
    },
};
