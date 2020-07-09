// src/components/app.js

import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Redirect } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import Modal from "./modal/modal";

import MainPage from "./main/main_page";
import ProfileContainer from "./profile/profile_container";

import "./app.scss"

const Welcome = () => {
  return <h1>Welcome</h1>
}

const App = () => (
  <>
    <Modal/>
    <NavBarContainer />
    <div className="app">
    <Switch>
      <ProtectedRoute exact path="/main" component={MainPage} />
      <AuthRoute exact path="/" component={Welcome} />
  
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <Redirect to="/" />
    </Switch>
    </div>
  </>
);

export default App;
