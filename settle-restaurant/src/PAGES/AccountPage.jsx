import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* Redux */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as restAction from "../redux/actions/restAction";

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_name: "",
      old_password: "",
      new_password: "",
      confirm_password: "",
      apiErrorMessage: "",
      apiSuccessMessage: "",
    };
  }
  componentDidMount() {
    var auth_token = localStorage.getItem("auth_token");
    if (auth_token === "" || auth_token === undefined || auth_token === null) {
      this.props.history.push("/");
    }
    if (
      this.props.restReducerData.type === "" ||
      this.props.restReducerData.type === undefined ||
      this.props.restReducerData.type === null
    ) {
      this.props.restAction.restFetch();
    }
  }
  componentDidUpdate() {
    if (
      this.state.apiErrorMessage !== "" &&
      this.state.apiErrorMessage !== null &&
      this.state.apiErrorMessage !== undefined
    ) {
      toast.error(this.state.apiErrorMessage);
      this.props.restAction.clearState();
      this.setState({ apiErrorMessage: "" });
    } else if (
      this.state.apiSuccessMessage !== "" &&
      this.state.apiSuccessMessage !== null &&
      this.state.apiSuccessMessage !== undefined
    ) {
      toast.success(this.state.apiSuccessMessage);
      this.props.history.push("/dashboard/payment-status");
      this.props.restAction.clearState();
      this.setState({ apiSuccessMessage: "" });
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.restReducerData).length > 0) {
      let { restReducerData } = props;
      switch (restReducerData.type) {
        case restAction.FETCH_RESTAURANT_DETAILS_FAILURE:
          props.restAction.clearState();
          let errMessage =
            restReducerData !== undefined &&
            restReducerData.responce !== undefined &&
            restReducerData.responce.data !== undefined &&
            restReducerData.responce.data.message !== undefined &&
            restReducerData.responce.data.message !== ""
              ? restReducerData.responce.data.message
              : "";
          toast.error(errMessage);
          return {
            apiSuccessMessage: "",
          };
        case restAction.FETCH_RESTAURANT_DETAILS_SUCCESS:
          var restInfo =
            restReducerData !== undefined &&
            restReducerData.responce !== undefined &&
            restReducerData.responce.data !== undefined &&
            restReducerData.responce.data.data !== undefined
              ? restReducerData.responce.data.data
              : "";
          return {
            restaurant_name: restInfo.restaurant_name,
          };
        case restAction.RESTAURANT_PASSWORD_RESET_FAILURE:
          let failMessage =
            restReducerData !== undefined &&
            restReducerData.responce !== undefined &&
            restReducerData.responce.data !== undefined &&
            restReducerData.responce.data.message !== undefined &&
            restReducerData.responce.data.message !== ""
              ? restReducerData.responce.data.message
              : "";
          return {
            apiErrorMessage: failMessage,
            apiSuccessMessage: "",
          };
        case restAction.RESTAURANT_PASSWORD_RESET_SUCCESS:
          let message =
            restReducerData !== undefined &&
            restReducerData.responce !== undefined &&
            restReducerData.responce.data !== undefined &&
            restReducerData.responce.data.message !== undefined &&
            restReducerData.responce.data.message !== ""
              ? restReducerData.responce.data.message
              : "";
          return {
            apiSuccessMessage: message,
            apiErrorMessage: "",
          };
        default:
          return {};
      }
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const init = {
      old_password: "",
      new_password: "",
      confirm_password: "",
      apiSuccessMessage: "",
    };
    this.setState(init);
    if (this.state.old_password === "") {
      toast.error("Old password required");
    } else if (this.state.new_password === "") {
      toast.error("New password required");
    } else if (this.state.confirm_password === "") {
      toast.error("Confirm password required");
    } else if (this.state.new_password !== this.state.confirm_password) {
      toast.error("New and confirm password missmatch");
    } else if (this.state.old_password === this.state.new_password) {
      toast.error("Old and New password can not be similer");
    } else {
      let formData = {
        old_password: this.state.old_password,
        new_password: this.state.new_password,
      };
      this.props.restAction.restPassChange(formData);
    }
  };

  render() {
    return (
      <div className="animate__animated animate__fadeIn">
        <div className="pageHead">
          <h1>Account</h1>
          <hr />
        </div>
        <div className="accountPageWrap px-15px px-md-30px px-xxxl-80px">
          <div className="w-100 mb-20px">
            <h4 className="">
              User name:{" "}
              <span className="text-primary">{this.state.restaurant_name}</span>
            </h4>
          </div>
          <div className="w-100">
            <div className="mb-3">
              <label className="w-100 fw-6">Enter old password</label>
              <input
                type="password"
                value={this.state.old_password}
                name="old_password"
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="w-100 fw-6">Enter new password</label>
              <input
                type="password"
                value={this.state.new_password}
                name="new_password"
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="w-100">
              <label className="w-100 fw-6">Confirm new password</label>
              <input
                type="password"
                value={this.state.confirm_password}
                name="confirm_password"
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="pt-40px">
              <button
                className="btn btn-xl btn-primary text-white "
                onClick={this.handleSubmit}
                // onClick={() => window.location.href = "/dashboard/payment-status"}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    restReducerData: state.restaurantReducer,
  };
};
const mapDispatchToProps = (dispatch) => ({
  restAction: bindActionCreators(restAction, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
