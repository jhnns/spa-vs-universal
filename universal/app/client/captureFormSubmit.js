import { state as routerState } from "../components/router/router";

const toArray = Array.from.bind(Array);
const formDataFilter = ["_method", "_csrf"];

function collectFormData(formElement) {
    const formData = {};

    toArray(formElement.elements)
        .filter(({ name }) => name !== "" && formDataFilter.indexOf(name) === -1)
        .forEach(({ name, value }) => {
            formData[name] = value;
        });

    return formData;
}

export default function captureFormSubmit(store) {
    document.addEventListener("submit", event => {
        const formElement = event.target;

        event.preventDefault();

        store.dispatch(
            routerState.actions.push({
                method: formElement.elements._method.value,
                url: formElement.action,
                body: collectFormData(formElement),
            })
        );
    });
}
