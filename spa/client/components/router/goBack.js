import { Component } from "preact";
import Link from "./link";

export default class GoBack extends Component {
    render(props) {
        return (
            <Link
                title={"Go back"}
                {...props}
                route={this.context.previousRoute}
                params={this.context.previousParams}
            />
        );
    }
}
