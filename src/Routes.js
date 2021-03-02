import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./containers/Login.jsx";

export default function Routes() {
  return (
    <Switch>
    <Route exact path="/">
        <Redirect to="/login" />
    </Route>
    <Route exact path="/login">
        <Login />
    </Route>
    </Switch>
  );
}