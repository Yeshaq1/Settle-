import React, { Component } from "react";

export default class HelpPage extends Component {
  render() {
    return (
      <div className="animate__animated animate__fadeIn">
        <div className="pageHead">
          <h1>Help</h1>
          <hr />
        </div>

        <div className="d-flex px-15px px-md-30px px-xxxl-80px  ">
          <div className="pt-10px pr-12px">
            <i className="material-icons fs-24 fs-md-30 fs-xl-35 fs-xxxl-40 align-middle m-0">
              help_outline
            </i>
          </div>
          <div>
            <p className="fs-15 fs-md-20 fs-xl-24 fs-xxxl-35 fw-6">
              For assistance please email us at Help@settletechnologies.com{" "}
              <br />
              or call us at 514-xxx-xxxx.
            </p>
            <p className="fs-16 fs-md-20 fs-xl-24 fs-xxxl-35 fw-6">
              Refer to our <a className="text-info">FAQ</a> section for more
              information about the platform
            </p>
          </div>
        </div>
      </div>
    );
  }
}
