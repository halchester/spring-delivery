import React from "react";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Wrapper from "./wrapper/Wrapper";
import Rider from "./pages/Rider";
import Customer from "./pages/Customer";
import RiderDetail from "./pages/RiderDetail";
import SignupRider from "./SignupRider/SignupRider";
import SignupSuccess from "./SignupRider/SignupSuccess";
import RiderEdit from "./pages/RiderEdit";

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
      </Wrapper>
    </Switch>
  );
};

export default App;
