import defineState from "../../store/defineState";
import csrf from "../../effects/csrf";
import session from "../../effects/session";
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
            const flashState = execEffect(session.readFlash, formName);

            return {
                ...dehydrated,
                ...(flashState === null ? emptyObj : flashState),
                csrfToken: execEffect(csrf),
            };
        },
        actions: {
            fillOut: data => (getState, patchState, dispatchAction, execEffect) => {
                patchState({
                    data,
                });
            },
            clear: () => (getState, patchState, dispatchAction, execEffect) => {
                patchState({
                    data: Object.create(null),
                });
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

                return result;
            },
            updateSubmitResult: result => (getState, patchState, dispatchAction) => {
                const isError = result instanceof Error;

                patchState({
                    isSubmitPending: result === null,
                    // during submit, we assume that the form is valid
                    isValid: isError === false,
                    submitResult: isError ? result.message : result,
                    submitSuccess: isError === false,
                    submitError: isError,
                });
            },
            saveInSessionFlash: () => (getState, patchState, dispatchAction, execEffect) => {
                const state = getState();
                const data = {};

                Object.keys(state.data).filter(key => confidential.indexOf(key) === -1).forEach(key => {
                    data[key] = state.data[key];
                });

                execEffect(session.writeFlash, formName, {
                    ...state,
                    data,
                });
            },
        },
    });
}
