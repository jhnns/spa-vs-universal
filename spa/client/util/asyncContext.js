export default class AsyncContext {
    constructor(component) {
        this.component = component;
        this.pending = new Map();
    }
    add(name, promise) {
        const proceed = () => this.pending.get(name) === promise;

        this.setStartState(name);
        this.pending.set(name, promise);

        return promise.then(
            res => {
                if (proceed() === true) {
                    this.pending.delete("name");
                    this.setSuccessState(name, res);
                }
            },
            err => {
                if (proceed() === true) {
                    this.pending.delete("name");
                    this.setFailState(name, err);
                }
            }
        );
    }
    setStartState(name) {
        this.component.setState({
            ...this.component.state,
            [name + "Pending"]: true,
            [name + "Error"]: null,
            [name + "Result"]: null,
        });
    }
    setSuccessState(name, result) {
        this.component.setState({
            ...this.component.state,
            [name + "Pending"]: false,
            [name + "Error"]: null,
            [name + "Result"]: result,
        });
    }
    setFailState(name, error) {
        this.component.setState({
            ...this.component.state,
            [name + "Pending"]: false,
            [name + "Error"]: error,
            [name + "Result"]: null,
        });
    }
    reset() {
        this.pending.clear();
    }
}