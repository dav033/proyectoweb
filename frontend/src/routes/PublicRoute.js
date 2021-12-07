import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../auth/useAuth";
function PublicRoute(props) {
  const { isLogged } = useAuth();

  if (isLogged()) return <Redirect to="/" />;
  return <Route {...props} />;
}

export default PublicRoute;

