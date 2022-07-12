import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../../utils/isAuth";

interface PrivateRouteProps {
  children?: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuth() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
            }}
          />
        )
      }
    />
  );
};
