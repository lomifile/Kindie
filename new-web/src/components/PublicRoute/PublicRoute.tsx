import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../../utils/isAuth";

interface PublicRouteProps {
  children?: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() =>
        isAuth() ? (
          <Redirect
            to={{
              pathname: "/home",
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};
