import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Redux */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginAction from "../redux/actions/loginActions";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      deviceToken: "",
      deviceType: "",
      apiErrorMessage: "",
      apiSuccessMessage: "",
    };
    /* Bind the function */
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    var auth_token = localStorage.getItem("auth_token");
    if (auth_token !== "" || auth_token !== undefined || auth_token !== null) {
      localStorage.setItem("auth_token", "");
      localStorage.setItem("user_info", "");
    }
  }
  componentDidUpdate() {
    let init = {
      email: "",
      password: "",
      deviceToken: "",
      deviceType: "",
      apiErrorMessage: "",
      apiSuccessMessage: "",
    };
    if (
      this.state.apiErrorMessage !== "" &&
      this.state.apiErrorMessage !== null &&
      this.state.apiErrorMessage !== undefined
    ) {
      toast.error(this.state.apiErrorMessage);
      this.setState(init);
    } else if (
      this.state.apiSuccessMessage !== "" &&
      this.state.apiSuccessMessage !== null &&
      this.state.apiSuccessMessage !== undefined
    ) {
      toast.success(this.state.apiSuccessMessage);
      this.props.history.push("/dashboard/payment-status");
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.loginReducerData).length > 0) {
      let { loginReducerData } = props;
      switch (loginReducerData.type) {
        case loginAction.USER_LOGIN_FAILED:
          props.loginAction.clearState();
          var errMessage =
            loginReducerData !== undefined &&
            loginReducerData.responce !== undefined &&
            loginReducerData.responce.data !== undefined &&
            loginReducerData.responce.data.message !== undefined &&
            loginReducerData.responce.data.message !== ""
              ? loginReducerData.responce.data.message
              : "";
          return {
            apiErrorMessage: errMessage,
            apiSuccessMessage: "",
          };
        case loginAction.USER_LOGIN_SUCCESS:
          var userInfo =
            loginReducerData !== undefined &&
            loginReducerData.responce !== undefined &&
            loginReducerData.responce.data !== undefined &&
            loginReducerData.responce.data.data !== undefined
              ? loginReducerData.responce.data.data
              : "";
          var token =
            loginReducerData !== undefined &&
            loginReducerData.responce !== undefined &&
            loginReducerData.responce.data !== undefined &&
            loginReducerData.responce.data.token !== undefined
              ? loginReducerData.responce.data.token
              : "";
          var message =
            loginReducerData !== undefined &&
            loginReducerData.responce !== undefined &&
            loginReducerData.responce.data !== undefined &&
            loginReducerData.responce.data.message !== undefined
              ? loginReducerData.responce.data.message
              : "";
          props.loginAction.clearState();
          if (token !== "") {
            localStorage.setItem("auth_token", token);
            localStorage.setItem("user_info", JSON.stringify(userInfo));
            return {
              apiErrorMessage: "",
              apiSuccessMessage: message,
            };
          } else {
            return {
              apiErrorMessage: "Something went wrong",
              apiSuccessMessage: "",
            };
          }

        default:
          return {};
      }
    }
  }
  handleChange(event) {
    if (event.target.name === "email") {
      this.setState({ email: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  }
  validateEmail(mail) {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail)) {
      return true;
    } else {
      return false;
    }
  }
  validatePass(pass) {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,50}$/.test(
        pass
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.email === "" ||
      this.state.email === undefined ||
      this.state.email === null
    ) {
      toast.error("Please enter your email address");
    } else if (this.validateEmail(this.state.email) === false) {
      toast.error("Please enter a valid email address");
    } else if (!this.state.password) {
      toast.error("Please enter your password");
    }
    //for password validation
    //   if (this.validatePass(this.state.password) === false) {
    //     toast.error("Password must be alphanumeric 6 charecter");
    //   } else
    else {
      let fromData = {
        email: this.state.email,
        password: this.state.password,
        deviceToken: "",
        deviceType: "",
      };
      this.props.loginAction.userLogin(fromData);
    }
  }

  render() {
    return (
      <div className="animate__animated animate__fadeIn">
        <div className="pt-20px pt-xxl-40px heading">
          <h1 className="fw-7">Welcome to the Settle Admin Dashboard</h1>
          <p className="fw-6">
            Login to view transactions, table payment status, update menus and
            more!
          </p>
        </div>
        <div className="pt-10px pt-xxl-50px">
          <div className="mb-3">
            <label className="w-100 fw-6">Email:</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="w-100 fw-6">Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="w-100">
            <label className="w-100 fw-6">
              Forgot password? Click{" "}
              <Link to="/reset-password" className="text-info">
                <u>here</u>
              </Link>
            </label>
          </div>
          <div className="pt-20px pt-xxl-40px">
            <button
              className="btn btn-xl btn-primary text-white "
              onClick={this.handleSubmit}
              // onClick={()=>window.location.href="/dashboard/payment-status"}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginReducerData: state.loginReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginAction: bindActionCreators(loginAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
