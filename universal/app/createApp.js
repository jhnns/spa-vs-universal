import { h } from "preact";

global.h = h;

export default function createApp() {
    return {
        app: <h1>Hello World</h1>,
    };
}
