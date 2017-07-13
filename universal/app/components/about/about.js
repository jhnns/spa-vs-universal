import defineState from "../store/defineState";
import { state as documentState } from "../document/document";
import { aboutSheet, headline, text } from "./about.css";

const name = "about";
const title = "About";

export const state = defineState({
    scope: name,
    initialState: {
        posts: null,
    },
    actions: {
        enter: () => (getState, patchState, dispatchAction) => {
            dispatchAction(
                documentState.actions.update({
                    statusCode: 200,
                    title,
                    headerTags: [],
                })
            );
        },
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
