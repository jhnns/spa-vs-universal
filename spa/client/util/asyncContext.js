export default class AsyncContext {
    constructor(component) {
        const unmountHandler = component.componentWillUnmount;

        this.component = component;
        this.pending = new Map();

        component.componentWillUnmount = (...args) => {
            const result = unmountHandler ? unmountHandler.apply(component, args) : undefined;

            this.reset();

            return result;
        };
    }
    add(name, promise, initialValue) {
        const proceed = () => this.pending.get(name) === promise;

        this.setStartState(name, initialValue);
        this.pending.set(name, promise);

        return promise.then(
            res => {
                if (proceed() === true) {
                    this.pending.delete("name");
                    this.setSuccessState(name, res);

                    return res;
                }

                return null;
            },
            err => {
                if (proceed() === true) {
                    this.pending.delete("name");
                    this.setFailState(name, err);

                    throw err;
                }

                console.log("An error happened in an abandoned async context");
                console.log(err);

                return null;
            }
        );
    }
    setStartState(name, initialValue) {
        this.component.setState({
            [name + "Pending"]: true,
            [name + "Error"]: null,
            [name]: initialValue,
        });
    }
    setSuccessState(name, result) {
        this.component.setState({
            [name + "Pending"]: false,
            [name + "Error"]: null,
            [name]: result,
        });
    }
    setFailState(name, error) {
        this.component.setState({
            [name + "Pending"]: false,
            [name + "Error"]: error,
            [name]: null,
        });
    }
    reset() {
        this.pending.clear();
    }
}
