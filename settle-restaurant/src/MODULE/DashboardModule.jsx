import React, { Component } from "react";
import { Link, NavLink, Route } from "react-router-dom";
import AccountPage from "../PAGES/AccountPage";
import Feedback from "../PAGES/Feedback";
import HelpPage from "../PAGES/HelpPage";
import MenuPage from "../PAGES/MenuPage";
import OrderHistory from "../PAGES/OrderHistory";
import PaymentStatus from "../PAGES/PaymentStatus";
import QRGenaretor from "../PAGES/QRGenaretor";
import Logo from "../assets/Images/logo.png";
import Dashboard from "../PAGES/Dashboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/index";

export default class DashboardModule extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var auth_token = localStorage.getItem("auth_token");
    if (auth_token === "" || auth_token === undefined || auth_token === null) {
      toast.error("Please signin");
      this.props.history.push("/");
    }
  }
  handleSubmit = () => {
    axiosInstance
      .get("api/restaurant/logout")
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", "");
          localStorage.setItem("user_info", "");
          this.props.history.push("/");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  toggleMenu = () => {
    document.querySelector(".dashNav").classList.toggle("active");
  };
  render() {
    return (
      <>
        <div className="mobGap d-block d-md-none"></div>
        <div className="d-flex d-md-none py-2 border-bottom px-3 mobileNavWrap justify-content-between align-items-center">
          <div className="col-auto">
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt="" />
              </Link>
            </div>
          </div>
          <div className="col-auto">
            <div className="navBtn">
              <button
                className="btn shadow-none text-primary"
                onClick={this.toggleMenu}
              >
                <i className="material-icons align-middle">menu</i>
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex dashboardMainWrap">
          <div className="leftBlock dashNav">
            <ul className="list-unstyled" onClick={this.toggleMenu}>
              {/* <li style={{cursor : "pointer"}} onClick={this.handleSubmit}><div className="mask" /> <span className="ms-4" style={{color: "white", fontWeight : "600"}} >Sign out</span></li> */}
              <li>
                <a className="text-white cp" onClick={this.handleSubmit}>
                  Signout
                </a>
              </li>
              <li>
                <NavLink to="payment-status" activeClassName="active">
                  Payment status
                </NavLink>
              </li>
              <li>
                <NavLink to="menu" activeClassName="active">
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="order-history" activeClassName="active">
                  Order history
                </NavLink>
              </li>
              <li>
                <NavLink to="feedback" activeClassName="active">
                  Feedback
                </NavLink>
              </li>
              <li>
                <NavLink to="account" activeClassName="active">
                  Account
                </NavLink>
              </li>
              <li>
                <NavLink to="help" activeClassName="active">
                  Help
                </NavLink>
              </li>
              <li>
                <NavLink to="qr-genarator" activeClassName="active">
                  QR Genaretor{" "}
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="rightBlock vh-100 overflow-auto">
            <Route exact path="/dashboard/" component={Dashboard} />
            <Route
              exact
              path="/dashboard/payment-status"
              component={PaymentStatus}
            />
            <Route exact path="/dashboard/menu" component={MenuPage} />
            <Route
              exact
              path="/dashboard/order-history"
              component={OrderHistory}
            />
            <Route exact path="/dashboard/feedback" component={Feedback} />
            <Route exact path="/dashboard/account" component={AccountPage} />
            <Route exact path="/dashboard/help" component={HelpPage} />

            <Route
              exact
              path="/dashboard/qr-genarator"
              component={QRGenaretor}
            />
          </div>
        </div>
      </>
    );
  }
}
