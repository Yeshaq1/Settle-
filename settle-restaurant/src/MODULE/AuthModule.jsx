import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import LoginPage from "../PAGES/LoginPage";

import Img1 from "../assets/Images/img1.jpg";
import Logo from "../assets/Images/logo.png";
import ResetPassword from "../PAGES/ResetPassword";
import EmailConfirmation from "../PAGES/EmailConfirmation";

export default class AuthModule extends Component {
  render() {
    return (
      <>
        <div className="d-flex loginPageWrap">
          <div className="leftBox min-vh-100 px-3 px-xl-5 py-4 d-flex flex-column">
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt="" />
              </Link>
            </div>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route
              exact
              path="/email-confirmation"
              component={EmailConfirmation}
            />
          </div>
          <div
            className="rightBox  "
            style={{ backgroundImage: "url(" + Img1 + ")" }}
          >
            <div
              className="bgImg h-100"
              style={{ backgroundImage: "url(" + Img1 + ")" }}
            ></div>
          </div>
        </div>
      </>
    );
  }
}
