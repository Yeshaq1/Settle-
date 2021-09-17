import React, { Component } from "react";
import ImagePath from "../assets/ImagePath";
import DefaultModal from "../Modals-Component";
import HeaderComponent from "./HeaderComponent";

export default class PaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddCardOpen: false,
      showModal: false,
      contentType: "",
    };
  }
  onClose = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <>
        <HeaderComponent />
        <div>
          <h5 className="text-dark1 text-center font-weight-bold mb-5">
            Payment methods
          </h5>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td className="align-middle  ">
                  <img src={ImagePath.visa} alt="Visa" />
                </td>
                <td className="align-middle w-100 px-0">
                  {" "}
                  <button className="btn btn-primary text-nowrap shadow-none rounded-8 w-100 text-left">
                    Visa ***** 4819
                  </button>
                </td>
                <td className="align-middle">
                  {" "}
                  <button
                    style={{ fontSize: "12px" }}
                    className="btn font-weight-bold shadow-none btn-sm p-0"
                    onClick={() =>
                      this.setState({ showModal: true, contentType: "1" })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td className="align-middle pl-0">
                  <button
                    style={{ fontSize: "12px" }}
                    className="btn font-weight-bold shadow-none btn-sm p-0"
                    onClick={() =>
                      this.setState({ showModal: true, contentType: "2" })
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>

              {[0, 1, 2, 3, 4].map((list) => (
                <tr>
                  <td className="align-middle  ">
                    {" "}
                    <img src={ImagePath.master} alt="Visa" />
                  </td>
                  <td className="align-middle w-100 px-0">
                    <button className="btn text-white btn-dark2 text-nowrap shadow-none rounded-8 w-100 text-left">
                      Master ***** 4819
                    </button>
                  </td>
                  <td className="align-middle">
                    <button
                      style={{ fontSize: "12px" }}
                      className="btn font-weight-bold shadow-none btn-sm p-0"
                      onClick={() =>
                        this.setState({ showModal: true, contentType: "1" })
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td className="align-middle pl-0">
                    {" "}
                    <button
                      style={{ fontSize: "12px" }}
                      className="btn font-weight-bold shadow-none btn-sm p-0"
                      onClick={() =>
                        this.setState({ showModal: true, contentType: "2" })
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-4 px-2">
            <button
              className="btn btn-outline-blue text-blue bg-transparent border-0 font-weight-bold shadow-none"
              onClick={() =>
                this.setState({ isAddCardOpen: !this.state.isAddCardOpen })
              }
            >
              {this.state.isAddCardOpen !== true ? (
                <>
                  <span class="material-icons align-middle"> add </span>
                </>
              ) : (
                <>
                  <span class="material-icons align-middle"> remove</span>
                </>
              )}
              Add payment method
            </button>
          </div>

          {this.state.isAddCardOpen ? (
            <div>
              <div className="col-12">
                <div className="form-group">
                  <div className="d-flex border rounded-8 justify-content-between overflow-hidden">
                    <input
                      className="border-0 shadow-none rounded-0   py-2  px-2  h-auto form-control"
                      style={{ fontSize: "10px", width: "100px" }}
                      maxLength="16"
                      type="number"
                      placeholder="Credit Card Number "
                    />
                    <input
                      className="border-0 shadow-none rounded-0  py-2  px--2 h-auto form-control"
                      style={{ fontSize: "10px", width: "50px" }}
                      type="text"
                      placeholder="MM/YY"
                    />
                    <input
                      className="border-0 shadow-none rounded-0  py-2  px--2 h-auto form-control"
                      style={{ fontSize: "10px", width: "50px" }}
                      type="number"
                      placeholder="CVC"
                    />
                    <input
                      className="border-0 shadow-none rounded-0  py-2  px--2 h-auto form-control"
                      style={{ fontSize: "10px" }}
                      type="number"
                      placeholder="Postal code"
                    />
                  </div>
                  <small className="form-text text-muted d-none">
                    We'll never share your email with anyone else.
                  </small>
                </div>
              </div>

              <div className="w-100 text-center">
                <button className="btn btn-primary btn-sm rounded-8 px-4">
                  Save
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <DefaultModal
          showModal={this.state.showModal}
          onClose={this.onClose.bind(this)}
        >
          {this.state.contentType === "1" ? (
            <div className="w-100 py-3">
              <h5 className="text-dark1  mb-4 ">Edit card information</h5>
              <h5 className="text-dark1 mb-4 ">
                <img src={ImagePath.visa} alt={""} /> *****4819
              </h5>
              <div className="form-group">
                <div className="d-flex border rounded-8 justify-content-between overflow-hidden">
                  <input
                    className="border-0 shadow-none rounded-0   py-2  px-2  h-auto form-control"
                    style={{ width: "100%" }}
                    maxLength="16"
                    type="text"
                    defaultValue={"*****4819"}
                  />
                  <input
                    className="border-0 shadow-none rounded-0  py-2  px--2 h-auto form-control"
                    style={{ width: "80px" }}
                    type="text"
                    placeholder="MM/YY"
                  />
                </div>
                <small className="form-text text-muted d-none">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <div className="d-flex border rounded-8 justify-content-between overflow-hidden w-50">
                  <input
                    className="border-0 shadow-none rounded-0  py-2  px--2 h-auto form-control"
                    style={{ width: "50px" }}
                    type="number"
                    placeholder="123"
                  />
                  <input
                    className="border-0 shadow-none rounded-0  py-2  px--2 h-auto form-control"
                    style={{}}
                    type="number"
                    placeholder="Postal"
                  />
                </div>
                <small className="form-text text-muted d-none">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="d-flex  ">
                <div className="ml-auto">
                  <button
                    className="btn btn-sm font-weight-bold  text-dark2 mr-4 "
                    onClick={() => this.setState({ showModal: false })}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-sm   btn-primary  rounded-8 px-4"
                    onClick={() => this.setState({ showModal: false })}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : this.state.contentType === "2" ? (
            <div className="w-100 py-3">
              <h5 className="text-dark1  mb-0 ">
                Are you sure you want to remove this payment method?
              </h5>

              <div className="py-5">
                <h5 className="text-dark1 mb-0 text-center ">
                  <img src={ImagePath.visa} alt={""} /> *****4819
                </h5>
              </div>

              <div className="d-flex  ">
                <div className="ml-auto">
                  <button
                    className="btn btn-sm font-weight-bold  text-dark2 mr-4 "
                    onClick={() => this.setState({ showModal: false })}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-sm   btn-primary  rounded-8 px-4"
                    onClick={() => this.setState({ showModal: false })}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </DefaultModal>
      </>
    );
  }
}
