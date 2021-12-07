import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../auth/useAuth";

function PrivateRoute(props) {
  const { user, isLogged } = useAuth();

  if (!isLogged()) return <Redirect to="/" />;

  return <Route {...props} />;
}

export default PrivateRoute;
