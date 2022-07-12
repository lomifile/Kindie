import React from "react";
import { Home } from "../page/Home";
import { BrowserRouter, Switch } from "react-router-dom";
import { PublicRoute } from "../components/PublicRoute";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/" exact>
          <Home />
        </PublicRoute>
      </Switch>
    </BrowserRouter>
  );
};
