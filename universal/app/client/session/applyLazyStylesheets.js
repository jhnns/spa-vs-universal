const linkCssSelector = "head > link[type='text/css']";

export default function applyLazyStylesheets() {
    for (const node of document.querySelectorAll(linkCssSelector)) {
        if (node.getAttribute("rel") === "lazy-stylesheet") {
            node.setAttribute("rel", "stylesheet");
        }
    }
}
