export default {
    push: () => url => {
        history.pushState(null, "", url);

        return true; // true = enter the next route
    },
    replace: () => url => {
        history.replaceState(null, "", url);

        return true; // true = enter the next route
    },
};
