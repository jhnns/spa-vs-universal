import defineComponent from "../util/defineComponent";

const toArray = Array.from.bind(Array);
const name = "form";

function validate(validators, values) {
    const errors = new Map();

    for (const [key, validator] of validators.entries()) {
        const result = validator(values);

        if (result !== null) {
            errors.set(key, result);
        }
    }

    return errors;
}

class OldForm {
    constructor() {
        this.id = generateId();
        this.formElement = null;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.saveFormRef = this.saveFormRef.bind(this);
        this.async = new AsyncContext(this);
        this.setState({
            errors: new Map(),
        });
    }
    saveFormRef(formElement) {
        this.formElement = formElement;
    }
    collectFormData() {
        const formData = new Map();

        for (const { name, value } of toArray(this.formElement.elements)) {
            if (name !== "") {
                formData.set(name, value);
            }
        }

        return formData;
    }
    performValidation() {
        const validators = this.props.validators;
        const formData = this.collectFormData();

        if (validators instanceof Map === false) {
            return {
                errors: new Map(),
                formData,
            };
        }

        const errors = validate(validators, formData);

        this.setState({
            errors,
        });

        return {
            errors,
            formData,
        };
    }
    handleSubmit(e) {
        e.preventDefault();

        const { errors, formData } = this.performValidation();

        if (errors.size === 0) {
            this.async.add("submit", this.props.onSubmit(mapToObject(formData))).then(res => {
                if (res && this.props.onSubmitSuccess) {
                    this.props.onSubmitSuccess(res);
                }
            }, console.warn.bind(console));
        }
    }
    handleFocus(e) {
        const field = e.target;

        if (this.formElement.elements[field.name] === undefined) {
            return;
        }

        this.setState(state => {
            const submitError =
                state.submitError !== null && state.submitError !== undefined ? null : state.submitError;
            const errors = state.errors;

            errors.delete(field.name);

            return {
                submitError,
                errors,
            };
        });
    }
    render(props, state) {
        const formGenerator = props.children[0];
        const { submit, submitPending, submitError } = this.state;

        return (
            <form
                class={props.class || ""}
                ref={this.saveFormRef}
                onSubmit={this.handleSubmit}
                onFocusCapture={this.handleFocus}
            >
                {typeof formGenerator === "function" ?
                    formGenerator({
                        id: this.id,
                        errors: state.errors,
                        submitPending: submitPending === null || submitPending === undefined ? false : submitPending,
                        submitSuccess: submit !== undefined && submit !== null,
                        submitError: submitError === null || submitError === undefined ? null : submitError,
                    }) :
                    null}
            </form>
        );
    }
}

export default defineComponent({
    name,
    render() {},
});
