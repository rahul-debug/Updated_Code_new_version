import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import WaitingComponent from "./Components/ProcessVDRComponent/WaitingComponent";
import App from "./App";
import Login from "./Components/LoginComponent/Login";
import Registration from "./Components/LoginComponent/Registration";
import history from './History';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/operations" component={App} />
                    <Route path = "/registration" component={Registration}/>
                    <Route path="/processing" component={WaitingComponent} />
                </Switch>
            </Router>
        )
    }
}