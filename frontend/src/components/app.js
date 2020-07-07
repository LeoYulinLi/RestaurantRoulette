// src/components/app.js

import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import ProfileContainer from "./profile/profile_container";

import "./app.scss"

const App = () => (
  <>
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
    </Switch>
  </>
);

export default App;
