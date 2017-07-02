import { Component } from "preact";
import Link from "./link";
import createEventHandler from "../../util/createEventHandler";

export default class GoBack extends Component {
    constructor() {
        super();
        this.handleClick = createEventHandler(this, "onClick", e => {
            if (this.prevRouteUnknown() === true) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            history.back();
        });
    }
    prevRouteUnknown() {
        return this.context.previousRoute === null;
    }
    render(props) {
        return (
            <Link
                {...props}
                onClick={this.handleClick}
                replaceUrl={this.prevRouteUnknown()}
            />
        );
    }
}
