import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    message() {
        return this.toString();
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>{this.message()}</h2>
                </div>
                <p className="App-intro">
                    To get started, edit
                    {" "}
                    <code>src/App.js</code>
                    {" "}
                    and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
