import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { isAuth } from "../../utils/isAuth";

type PrivateRouteProps = {
  children?: React.ReactNode;
} & RouteProps;

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={() =>
        isAuth() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};
