import AsyncComponent from "./asyncComponent";

export default class AsyncCacheComponent extends AsyncComponent {
    constructor() {
        super();
        this.propsCache = new Map();
    }
    componentWillMount() {
        this.fetchNewProps(this.props);
    }
    componentWillReceiveProps(props) {
        this.fetchNewProps(props);
    }
    fetchNewProps(props) {
        Object.keys(props)
            .filter(
                key =>
                    this.propsCache.has(key) === false ||
                    this.propsCache.get(key) !== props[key]
            )
            .forEach(key => {
                const prop = props[key];

                if (typeof prop === "function") {
                    this.async.add(key, prop(), null);
                }
                this.propsCache.set(key, prop);
            });
    }
}
