import { root, main } from "./app.css";
import Header from "../header/header";
import Router from "../router/router";
import RoutePlaceholder from "../router/routePlaceholder";

export default function App() {
    return (
        <Router>
            <div class={root}>
                <Header />
                <main class={main}>
                    <RoutePlaceholder />
                </main>
            </div>
        </Router>
    );
}
