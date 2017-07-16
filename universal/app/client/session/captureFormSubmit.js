import { state as routerState } from "../../components/router/router";

const toArray = Array.from.bind(Array);

function collectFormData(formElement) {
    const formData = {};

    for (const { name, value } of toArray(formElement.elements)) {
        if (name !== "") {
            formData[name] = value;
        }
    }

    return formData;
}

export default function captureFormSubmit(store) {
    document.addEventListener("submit", event => {
        const formElement = event.target;

        event.preventDefault();

        store.dispatch(
            routerState.actions.push({
                method: formElement.method,
                url: formElement.action,
                body: collectFormData(formElement),
            })
        );
    });
}
