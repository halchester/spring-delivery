import React from "react";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Wrapper from "./wrapper/Wrapper";
import Rider from "./pages/Rider";
import Customer from "./pages/Customer";
import RiderDetail from "./pages/RiderDetail";

const App = () => {
  return (
    <Switch>
      <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/rider" component={Rider} />
        <Route exact path="/customer" component={Customer} />
        <Route exact path="/info/:id" component={RiderDetail} />
      </Wrapper>
    </Switch>
  );
};

export default App;
