import { Component } from "preact";
import { aboutSheet, title, text } from "./about.css";

export default class About extends Component {
    render() {
        return (
            <div>
                <div class={aboutSheet}>
                    <h2 class={title}>About</h2>
                    <div class={text}>
                        <p>
                            Delectus quia nulla sit ex ipsum sit animi incidunt. Nam rerum reiciendis et. Minus
                            voluptatem natus mollitia temporibus. Molestias dolorem omnis eveniet repudiandae corporis
                            voluptas sed quo.
                        </p>
                        <p>
                            Quisquam a vel quia in quis blanditiis sed. Labore ratione minus. A quo consequuntur
                            recusandae consequatur. Et aspernatur quod officia rem quam nisi vel est quidem.
                        </p>

                        <p>
                            Alias et fugit error quaerat consequatur. Voluptatem omnis aut voluptatem. Et necessitatibus
                            qui voluptatem.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
