import defineState from "../store/defineState";
import contexts from "../../contexts";
import { aboutSheet, headline, text } from "./about.css";

const name = "about";

export const state = defineState({
    scope: name,
    context: contexts.state,
    actions: {
        enter: () => (getState, patchState, dispatchAction) => {},
    },
});

export default function About() {
    return (
        <div>
            <div {...aboutSheet}>
                <h2 {...headline}>About</h2>
                <div {...text}>
                    <p>
                        Delectus quia nulla sit ex ipsum sit animi incidunt. Nam rerum reiciendis et. Minus voluptatem
                        natus mollitia temporibus. Molestias dolorem omnis eveniet repudiandae corporis voluptas sed
                        quo.
                    </p>
                    <p>
                        Quisquam a vel quia in quis blanditiis sed. Labore ratione minus. A quo consequuntur recusandae
                        consequatur. Et aspernatur quod officia rem quam nisi vel est quidem.
                    </p>

                    <p>
                        Alias et fugit error quaerat consequatur. Voluptatem omnis aut voluptatem. Et necessitatibus qui
                        voluptatem.
                    </p>
                </div>
            </div>
        </div>
    );
}
