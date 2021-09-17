import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class EmailConfirmation extends Component {
  render() {
    return (
      <div className="animate__animated animate__fadeIn my-auto">
        <div className=" heading">
          <h1 className="fw-7">Reset Email Sent!</h1>
          <p className="fw-6">
            Please check your inbox or spam folder for reset email. If you do
            not receive an email within 2 minutes, please{" "}
            <Link to="/reset-password">click</Link> here to send another email
          </p>
        </div>

        <div className="w-100 pt-4">
          <Link to="/" className="btn btn-xl btn-primary text-white ">
            Return to Login
          </Link>
        </div>
      </div>
    );
  }
}
