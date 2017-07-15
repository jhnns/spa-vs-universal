import defineState from "../store/defineState";
import defineComponent from "../util/defineComponent";

export default function defineForm(descriptor) {
    const state = defineState({
        scope: descriptor.name,
        context: descriptor.stateContext,
        initialState: {
            name: descriptor.name,
            data: Object.create(null),
            isPristine: true,
            isValid: false,
            validationErrors: Object.create(null),
            isSubmitPending: false,
            submitSuccess: false,
            submitError: false,
            submitResult: null,
        },
    });
    const Component = defineComponent({
        name: descriptor.name,
        connectToStore: {
            watch: [state.select],
            mapToState: s => s,
        },
        render(props, state) {
            return (
                <form {...props.styles}>
                    {descriptor.render(props, state)}
                </form>
            );
        },
    });

    return {
        state,
        Component,
    };
}
