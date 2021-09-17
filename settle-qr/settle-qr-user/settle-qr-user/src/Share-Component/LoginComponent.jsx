import React, { Component } from "react";
import phoneUrl from "../assets/CountryCodes.json";
import VerifyMobileNumber from "./VerifyMobileNumber";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axiosInstance from "../api/";
import { Capitalize } from "../library";

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: [],
      isOtpOpen: false,
      isLoading: false,
      formData: {
        email: "",
        code: "",
        phone: "",
      },
      errors: {
        email: "",
        code: "",
        phone: "",
      },
    };
  }

  onChange = (e) => {
    // console.log('event change', e)
    let { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
    console.log("formData", formData);
  };

  onFocus = (e) => {
    // console.log('event focus', e)
    let { errors } = this.state;
    errors[e.target.name] = "";
    this.setState({ errors });
  };

  validateForm() {
    let { formData, errors } = this.state;
    let validation_passed = true;

    Object.keys(errors).forEach((field_name) => {
      if (formData[field_name] === undefined || formData[field_name] === "") {
        validation_passed = false;
        errors[field_name] =
          Capitalize(field_name).replace("_", " ").replace("id", "") +
          " should not be blank!";
      } else if (field_name === "email") {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (!regex.test(formData[field_name])) {
          validation_passed = false;
          errors[field_name] = "Invalid email!";
        }
      }
    });

    this.setState({ errors });
    return validation_passed;
  }

  renderFormError(fieldName) {
    let { errors } = this.state;
    if (errors[fieldName] !== undefined && errors[fieldName] !== "") {
      return (
        <small className="form-text" style={{ color: "red" }}>
          &#160;{errors[fieldName]}
        </small>
      );
    }
    return;
  }

  componentDidMount() {}

  submitForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      var THIS = this;
      var formData = this.state.formData;
      var newData = {
        email: formData.email,
        phone: formData.code + formData.phone,
      };

      axiosInstance
        .post(`api/userWebApp/login/`, newData)
        .then((res) => {
          if (res.status === 200) {
            THIS.setState({ isOtpOpen: true });
          } else {
            var errorTemp = {
              email: res.data.message,
              code: "",
              phone: "",
            };
            THIS.setState({
              errors: errorTemp,
            });
          }
        })
        .catch(function (error) {
          var errorTemp = {
            email: "Something went wrong. Please try again",
            code: "",
            phone: "",
          };
          THIS.setState({
            errors: errorTemp,
          });
        });
    }
  }

  render() {
    let { formData } = this.state;
    return (
      <>
        {this.state.isOtpOpen === false ? (
          <div>
            <h5 className="text-dark1 text-center font-weight-bold mb-4">
              Enter your phone number
            </h5>
            <form onSubmit={(e) => this.submitForm(e)}>
              <div className="row">
                <div className="col-4 pr-0">
                  <div className="form-group">
                    <select
                      className="form-control shadow-none rounded-8 px-1"
                      name="code"
                      onChange={this.onChange.bind(this)}
                      onFocus={this.onFocus.bind(this)}
                      value={formData.code}
                    >
                      <option value="">Select Code</option>
                      {phoneUrl.map((list, index) => (
                        <option value={list.dial_code} key={index}>
                          {list.code} {list.dial_code}
                        </option>
                      ))}
                    </select>
                    {this.renderFormError("code")}
                  </div>
                </div>
                <div className="col-8">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="form-control shadow-none rounded-8"
                      name="phone"
                      onChange={this.onChange.bind(this)}
                      onFocus={this.onFocus.bind(this)}
                      value={formData.phone}
                    />
                    {this.renderFormError("phone")}
                  </div>
                </div>
                <div className="col-md-12">
                  <small>
                    We will send a text with a verification code. Message and
                    data rates may apply
                  </small>

                  <p className="pt-4">
                    Or enter the email associated with your account and we will
                    send you a verification code
                  </p>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control shadow-none rounded-8"
                      name="email"
                      onChange={this.onChange.bind(this)}
                      onFocus={this.onFocus.bind(this)}
                      value={formData.email}
                    />
                    {/*<small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>*/}
                    {this.renderFormError("email")}
                  </div>
                </div>

                <div className="col-md-12 text-center">
                  <button className="btn btn-primary btn-sm rounded-8 px-4">
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}

        {this.state.isOtpOpen === true ? (
          <VerifyMobileNumber
            isLoginVarification={true}
            mobileno={this.state.formData.code + this.state.formData.phone}
            emailid={this.state.formData.email}
          />
        ) : null}
      </>
    );
  }
}
