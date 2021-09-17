import React, { Component } from "react";
import axiosInstance from "../api/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class VerifyMobileNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      formData: {
        varification_code1: "",
        varification_code2: "",
      },
      errors: {
        varification_code: "",
      },
    };
  }

  onChange = (e) => {
    let { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  onFocus = (e) => {
    let { errors } = this.state;
    errors[e.target.name] = "";
    this.setState({ errors });
  };

  validateForm() {
    let { formData, errors } = this.state;
    let validation_passed = true;

    if (
      formData.varification_code1 === "" ||
      formData.varification_code1 === null ||
      formData.varification_code1 === undefined ||
      formData.varification_code2 === "" ||
      formData.varification_code2 === null ||
      formData.varification_code2 === undefined
    ) {
      validation_passed = false;
      errors["varification_code"] = "Please enter your varification code";
    }

    this.setState({ errors });
    return validation_passed;
  }

  renderFormError(fieldName) {
    let { errors } = this.state;
    if (
      errors[fieldName] !== undefined &&
      errors[fieldName] !== "" &&
      errors[fieldName] !== null
    ) {
      return (
        <small
          className="form-text"
          style={{
            color: "red",
            padding: "10px",
            width: "100%",
            textAlign: "center",
          }}
        >
          &#160;{errors[fieldName]}
        </small>
      );
    }
    return;
  }

  submit() {
    var THIS = this;
    if (this.validateForm()) {
      var varificationData = {
        phone: this.props.mobileno,
        code:
          String(this.state.formData.varification_code1) +
          String(this.state.formData.varification_code2),
      };

      var apiurl = "api/userWebApp/verifyPhone/";

      if (this.props.isLoginVarification === true) {
        varificationData["email"] = this.props.emailid;
        apiurl = "api/userWebApp/verifyLogin/";
      }

      axiosInstance
        .post(apiurl, varificationData)
        .then((res) => {
          if (res.status === 200) {
            if (this.props.isLoginVarification === true) {
              var userInfo = res.data.data;
              var token = res.data.token;
              var user_type = res.data.user_type;

              localStorage.setItem("user_info", JSON.stringify(userInfo));
              localStorage.setItem("auth_token", token);
              localStorage.setItem("user_type", user_type);

              setTimeout(function () {
                //window.location.href = "/home/?loginSuccess=true";
                window.location.href =
                  window.location.href + "&loginSuccess=true";
              }, 1000);
            } else {
              window.location.href =
                window.location.href + "&registerSuccess=true";
            }
          } else {
            var errorTemp = {
              varification_code: res.data.message,
            };
            this.setState({
              errors: errorTemp,
            });
          }
        })
        .catch(function (error) {
          var errorTemp = {
            varification_code: error.message,
          };
          this.setState({
            errors: errorTemp,
          });
        });
    }
  }

  render() {
    let { formData } = this.state;
    return (
      <>
        <div>
          <h5 className="text-dark1 text-center mb-4 font-weight-bold">
            Verify your number
          </h5>

          <p className="text-dark1 text-center mb-4">
            <small className="font-weight-bold">
              Enter 6 digit verification code sent to your phone
            </small>
          </p>

          <form>
            <div className="row justify-content-center">
              <div className="col-4">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder=" "
                    name="varification_code1"
                    onChange={this.onChange.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    value={formData.varification_code1}
                    className="form-control shadow-none rounded-8"
                    maxLength="3"
                    style={{ letterSpacing: "10px", textAlign: "center" }}
                  />
                  <small className="form-text text-muted d-none">
                    We'll never share your email with anyone else.
                  </small>
                </div>
              </div>
              <div className="col-auto px-0 pt-1">
                <span className="material-icons  align-middle">remove</span>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder=" "
                    name="varification_code2"
                    onChange={this.onChange.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    value={formData.varification_code2}
                    className="form-control shadow-none rounded-8"
                    maxLength="3"
                    style={{ letterSpacing: "10px", textAlign: "center" }}
                  />
                  <small className="form-text text-muted d-none">
                    We'll never share your email with anyone else.
                  </small>
                </div>
              </div>

              {this.renderFormError("varification_code")}

              <div className="col-md-12 text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-sm rounded-8 px-4"
                  onClick={this.submit.bind(this)}
                >
                  Confirm
                </button>
              </div>
              <div className="col-md-12 pt-3">
                <p>
                  <small>
                    If you have not recieved a code, click{" "}
                    <a href="#" className="font-weight-bold">
                      here
                    </a>{" "}
                    to recieve another one
                  </small>
                </p>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}
