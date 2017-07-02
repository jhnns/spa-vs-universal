import { Component } from "preact";

export default class WithTitle extends Component {
    componentWillReceiveProps(props) {
        this.updateTitle(props.title);
    }
    componentWillMount() {
        this.updateTitle(this.props.title);
    }
    updateTitle(title) {
        if (title !== undefined) {
            document.title = title;
        }
    }
    render(props) {
        return props.children[0];
    }
}
