import React from "react";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Wrapper from "./wrapper/Wrapper";
import Rider from "./pages/Rider/Rider";
import RiderDetail from "./pages/Rider/RiderDetail";
import SignupRider from "./pages/Rider/SignupRider";
import SignupSuccess from "./pages/Rider/SignupSuccess";
import RiderEdit from "./pages/Rider/RiderEdit";
import About from "./pages/About";
import CustomerChooseState from "./pages/Customer/CustomerAs";
import CustomerByState from "./pages/Customer/CustomerByState";

const App = () => {
  return (
    <Switch>
      <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />

        <Route exact path="/customer" component={CustomerChooseState} />
        <Route exact path="/customer/:id" component={CustomerByState} />

        <Route exact path="/info/:id" component={RiderDetail} />
        <Route exact path="/rider" component={Rider} />
        <Route exact path="/rider/signup" component={SignupRider} />
        <Route exact path="/rider/signup/:id" component={SignupSuccess} />
        <Route exact path="/rider/edit/:id" component={RiderEdit} />
      </Wrapper>
    </Switch>
  );
};

export default App;
