import body from "../styles/pre/body.css";
import reset from "../styles/pre/reset.css";

const css = [reset, body].join(" ");

export default `<style>${ css }</style>`;
