import React, { Component } from "react";

export default class OtherPaymentInputComponent extends Component {
  render() {
    return (
      <>
        <div className="w-100">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <input
                  type="type"
                  placeholder="First Name"
                  className="form-control h-auto rounded-8"
                  style={{ fontSize: "14px" }}
                />
                <small className="form-text text-muted d-none">
                  We'll never share your email with anyone else.
                </small>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <input
                  type="type"
                  placeholder="Last Name"
                  className="form-control h-auto rounded-8"
                  style={{ fontSize: "14px" }}
                />
                <small className="form-text text-muted d-none">
                  We'll never share your email with anyone else.
                </small>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  type="type"
                  placeholder="Email"
                  className="form-control h-auto rounded-8"
                  style={{ fontSize: "14px" }}
                />
                <small className="form-text text-muted d-none">
                  We'll never share your email with anyone else.
                </small>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <div className="d-flex border rounded-8 justify-content-between overflow-hidden">
                  <input
                    className="border-0 shadow-none   py-2  px-2  h-auto form-control"
                    style={{ fontSize: "10px", width: "150px" }}
                    type="text"
                    placeholder="Credit Card Number "
                  />
                  <input
                    className="border-0 shadow-none  py-2  px--2 h-auto form-control"
                    style={{ fontSize: "10px", width: "50px" }}
                    type="text"
                    placeholder="MM/YY"
                  />
                  <input
                    className="border-0 shadow-none  py-2  px--2 h-auto form-control"
                    style={{ fontSize: "10px", width: "50px" }}
                    type="text"
                    placeholder="CVC"
                  />
                  <input
                    className="border-0 shadow-none  py-2  px--2 h-auto form-control ml-auto text-center"
                    style={{ fontSize: "10px" }}
                    type="text"
                    placeholder="Postal code"
                  />
                </div>
                <small className="form-text text-muted d-none">
                  We'll never share your email with anyone else.
                </small>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
