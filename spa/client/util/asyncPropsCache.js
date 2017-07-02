import AsyncContext from "./asyncContext";

export default class AsyncPropsCache {
    constructor(component, asyncProps) {
        const willReceiveProps = component.componentWillReceiveProps;

        this.component = component;
        this.asyncProps = asyncProps;
        this.async = new AsyncContext(component);
        this.cache = new Map();

        component.componentWillReceiveProps = (...args) => {
            const nextProps = args[0];
            const result = willReceiveProps ?
                willReceiveProps.apply(component, args) :
                undefined;

            this.fetchNewProps(nextProps);

            return result;
        };

        this.fetchNewProps(asyncProps);
    }
    fetchNewProps(props) {
        Object.keys(this.asyncProps)
            .filter(
                key =>
                    this.cache.has(key) === false ||
                    this.cache.get(key) !== props[key]
            )
            .forEach(key => {
                const prop = props[key];

                this.async.add(key, prop(), null);
                this.cache.set(key, prop);
            });
    }
}
