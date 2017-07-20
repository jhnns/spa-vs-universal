import defineState from "../store/defineState";
import { state as sessionState } from "../session/session";
import csrf from "../../effects/csrf";
import has from "../../util/has";

const emptyObj = {};
const emptyArr = [];

export default function defineForm(descriptor) {
    const formName = descriptor.name;
    const validators = has(descriptor, "validators") ? descriptor.validators : emptyObj;
    const validationFields = Object.keys(validators);
    const confidential = has(descriptor, "confidential") ? descriptor.confidential : emptyArr;

    return defineState({
        scope: formName,
        context: descriptor.context,
        initialState: {
            name: formName,
            data: Object.create(null),
            csrfToken: null,
            isValid: true,
            validationErrors: Object.create(null),
            isSubmitPending: false,
            submitSuccess: false,
            submitError: false,
            submitResult: null,
        },
        hydrate(dehydrated, execEffect) {
            return {
                ...dehydrated,
                csrfToken: execEffect(csrf),
            };
        },
        actions: {
            fillOut: data => (getState, patchState, dispatchAction, execEffect) => {
                patchState({
                    data,
                });
                dispatchAction(sessionState.actions.rememberFormState(formName, getState()));
            },
            clear: () => (getState, patchState, dispatchAction, execEffect) => {
                patchState({
                    data: Object.create(null),
                });
                dispatchAction(sessionState.actions.discardFormState(formName));
            },
            clearConfidential: () => (getState, patchState, dispatchAction, execEffect) => {
                const oldData = getState().data;
                const newData = {};

                Object.keys(oldData).filter(key => confidential.indexOf(key) === -1).forEach(key => {
                    newData[key] = oldData[key];
                });

                patchState({
                    data: newData,
                });
                dispatchAction(sessionState.actions.rememberFormState(formName, getState()));
            },
            validate: () => (getState, patchState, dispatchAction) => {
                const validationErrors = Object.create(null);
                const data = getState().data;
                let isValid = true;

                validationFields.forEach(key => {
                    const result = validators[key](data);

                    if (result !== null) {
                        validationErrors[key] = result;
                        isValid = false;
                    }
                });

                const result = {
                    validationErrors,
                    isValid,
                };

                patchState(result);
                dispatchAction(sessionState.actions.rememberFormState(formName, getState()));

                return result;
            },
            updateSubmitResult: result => (getState, patchState, dispatchAction) => {
                const isError = result instanceof Error;

                patchState({
                    isSubmitPending: result === null,
                    // during submit, we assume that the form is valid
                    isValid: isError === false,
                    submitResult: result,
                    submitSuccess: isError === false,
                    submitError: isError,
                });
                dispatchAction(sessionState.actions.rememberFormState(formName, getState()));
            },
        },
    });
}
