import Logo from "./logo/logo";
import Nav from "./nav/nav";
import Link from "../router/link";
import routes from "../../routes";
import { root, content, logo, nav, headline, session, offscreen } from "./header.css";
import defineComponent from "../util/defineComponent";
import Session from "./session/session";

export default defineComponent({
    name: "Header",
    render() {
        return (
            <header {...root}>
                <div {...content}>
                    <Link route={routes.top5} {...logo}>
                        <Logo />
                        <h1 {...headline}>
                            <span {...offscreen}>Peerigon</span> News
                        </h1>
                    </Link>
                    <Nav styles={nav} />
                    <Session styles={session} />
                </div>
            </header>
        );
    },
});
