import { Component } from "preact";

export default class GoBack extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        const onClick = this.props.onClick;

        history.back();
        if (typeof onClick === "function") {
            onClick(e);
        }
    }
    render(props) {
        return (
            <a
                {...props}
                href={"?"}
                onClick={this.handleClick}
                dataNoRouting={true}
            >
                {props.children}
            </a>
        );
    }
}
