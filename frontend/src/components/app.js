// src/components/app.js

import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Redirect } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import MainPage from "./main/main_page";
import ProfileContainer from "./profile/profile_container";
import Splash from '../components/splash/splash'
import Footer from "./footer/footer";

import "./app.scss"

const App = () => (
  <>
    <NavBarContainer />
    <div className="app">
      <Switch>
        <ProtectedRoute exact path="/main" component={MainPage} />
        <AuthRoute exact path="/" component={Splash} />
        <ProtectedRoute exact path="/profile" component={ProfileContainer} />
        <Redirect to="/" />
      </Switch>
    </div>
    <Footer />
  </>
);

export default App;
