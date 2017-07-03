import { Component } from "preact";
import generateId from "../util/generateId";

function validate(validators, values) {
    const errors = new Map();

    for (const [key, validator] of validators.entries()) {
        errors.set(key, validator(values));
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
    collectValues() {
        const values = new Map();

        for (const { name, value } of this.formElement.elements) {
            values.set(name, value);
        }

        return values;
    }
    performValidation() {
        const validators = this.props.validators;

        if (validators instanceof Map === false) {
            return;
        }

        const errors = validate(validators, this.collectValues());

        this.setState({
            errors,
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.performValidation();
    }
    handleFocus(e) {
        const field = e.target;

        if (this.formElement.elements[field.name] === undefined) {
            return;
        }
        this.setState(state => {
            const errors = state.errors;

            errors.set(field.name, null);

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
