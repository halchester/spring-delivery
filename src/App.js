import React from "react";
import { Route, Switch } from "react-router";
import Home from "./components/Home";

const App = () => {
  return (
    <Switch>
      <Route route="/" component={Home} />
    </Switch>
  );
};

export default App;
