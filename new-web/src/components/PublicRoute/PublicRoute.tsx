import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { isAuth } from "../../utils/isAuth";

type PublicRouteProps = {
  children?: React.ReactNode;
} & RouteProps;

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={() =>
        isAuth() ? (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};
