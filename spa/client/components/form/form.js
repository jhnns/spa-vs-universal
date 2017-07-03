import { Component } from "preact";
import generateId from "../util/generateId";

export default class Form extends Component {
    constructor() {
        super();
        this.id = generateId();
    }
    render(props, state) {
        const id = this.id;
        const formGenerator = props.children[0];

        return (
            <form class={props.class || ""}>
                {typeof formGenerator === "function" ?
                    formGenerator({
                        id,
                    }) :
                    null}
            </form>
        );
    }
}
