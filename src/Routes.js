import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./containers/Login.jsx";
// import isAuthenticated from "./containers/Login.jsx";
import BoardWrapper from "./components/BoardWrapper/BoardWrapper.js";

export default function Routes() {

  const RequireAuth = ({ children }) => {
    console.log("coming here");
    console.log(localStorage.getItem("isAuthenticated"));
    var isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated == "false") {
      return <Redirect to="/login" />;
    }
    return children;
  };

  return (
    <Switch>
    <Route exact path="/">
        <Redirect to="/login" />
    </Route>
    <Route exact path ="/login">
      <Login/>
    </Route>
    <RequireAuth>
      <Route exact path="/dashboard" component={BoardWrapper} />
    </RequireAuth>
    </Switch>
  );
}