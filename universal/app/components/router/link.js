export default function Link(props) {
    return (
        <a href={"/"} class={props.class}>
            {props.children}
        </a>
    );
}
