export default {
    push: () => url => {
        history.pushState(null, "", url);
    },
    replace: () => url => {
        history.replaceState(null, "", url);
    },
};
