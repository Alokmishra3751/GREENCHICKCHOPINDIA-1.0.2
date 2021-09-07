import React from "react";
import { Route, Redirect } from "react-router-dom";

import config from "utils/config";

function PrivateRoute(props) {
  const { component: Component, ...rest } = props;

  const data = localStorage.getItem(config.AUTH_TOKEN);

  return (
    <Route
      {...rest}
      render={(props) => {
        return data ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
}

export default PrivateRoute;
