import React from "react";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Wrapper from "./wrapper/Wrapper";
import Rider from "./pages/Rider";
import Customer from "./pages/Customer";
import RiderDetail from "./Rider/RiderDetail";
import SignupRider from "./Rider/SignupRider";
import SignupSuccess from "./Rider/SignupSuccess";
import RiderEdit from "./Rider/RiderEdit";
import About from "./pages/About";

const App = () => {
  return (
    <Switch>
      <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/rider" component={Rider} />
        <Route exact path="/customer" component={Customer} />
        <Route exact path="/info/:id" component={RiderDetail} />
        <Route exact path="/rider/signup" component={SignupRider} />
        <Route exact path="/rider/signup/:id" component={SignupSuccess} />
        <Route exact path="/rider/edit/:id" component={RiderEdit} />
        <Route exact path="/about" component={About} />
      </Wrapper>
    </Switch>
  );
};

export default App;
