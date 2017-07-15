import { overflowContainer, message } from "./formFeedback.css";

export default function FormFeedback(props) {
    const styles = { ...overflowContainer, ...props.styles };

    return (
        <span {...styles}>
            <span {...message}>
                {props.children}
            </span>
        </span>
    );
}
