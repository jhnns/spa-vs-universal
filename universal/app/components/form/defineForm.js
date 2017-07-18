import defineState from "../store/defineState";
import defineComponent from "../util/defineComponent";
import csrf from "../../effects/csrf";

export default function defineForm(descriptor) {
    const state = defineState({
        scope: descriptor.name,
        context: descriptor.context,
        initialState: {
            name: descriptor.name,
            data: Object.create(null),
            csrfToken: null,
            isPristine: true,
            isValid: false,
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
    });
    const Component = defineComponent({
        name: descriptor.name,
        connectToStore: descriptor.connectToStore(state),
        render: descriptor.render,
    });

    return Component;
}
