import { Component } from "preact";
import generateId from "../util/generateId";

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

export default class Form extends Component {
    constructor() {
        super();
        this.id = generateId();
        this.formElement = null;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.saveFormRef = this.saveFormRef.bind(this);
        this.setState({
            errors: new Map(),
        });
    }
    saveFormRef(formElement) {
        this.formElement = formElement;
    }
    collectFormData() {
        const formData = new Map();

        for (const { name, value } of this.formElement.elements) {
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
            this.props.onSubmit(formData);
        }
    }
    handleFocus(e) {
        const field = e.target;

        if (this.formElement.elements[field.name] === undefined) {
            return;
        }
        this.setState(state => {
            const errors = state.errors;

            errors.delete(field.name);

            return {
                errors,
            };
        });
    }
    render(props, state) {
        const id = this.id;
        const errors = state.errors;
        const formGenerator = props.children[0];

        return (
            <form
                class={props.class || ""}
                ref={this.saveFormRef}
                onSubmit={this.handleSubmit}
                onFocusCapture={this.handleFocus}
            >
                {typeof formGenerator === "function" ?
                    formGenerator({
                        id,
                        errors,
                    }) :
                    null}
            </form>
        );
    }
}
