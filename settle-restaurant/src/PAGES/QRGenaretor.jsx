import React, { Component } from "react";
import QR from "../assets/Images/qr.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//http://zpao.github.io/qrcode.react/ for QR code API reference
var QRCode = require("qrcode.react");

export default class QRGenaretor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableNumber: "",
      QR: "test",
    };
  }
  handleChange = (event) => {
    this.setState({ tableNumber: event.target.value });
  };
  handleSubmit = (event) => {
    if (
      this.state.tableNumber !== "" &&
      this.state.tableNumber !== undefined &&
      this.state.tableNumber !== null
    ) {
      this.setState({ QR: `Table No.: ${this.state.tableNumber}` });
      this.setState({ tableNumber: "" });
    } else {
      toast.warn("Please add Table Number for QR generation.");
      this.setState({ QR: "" });
    }
  };
  handleCopy = () => {
    if (
      this.state.QR !== "" &&
      this.state.QR !== undefined &&
      this.state.QR !== null
    )
      navigator.clipboard.writeText(this.state.QR);
    else {
      navigator.clipboard.writeText("This is a testing QR code.");
    }
  };
  handlePrint = () => {
    alert("work in progress");
  };
  render() {
    return (
      <div className="animate__animated animate__fadeIn">
        <div className="pageHead">
          <h1>QR Code Generator</h1>
          <hr />
        </div>

        <div className="px-15px px-md-30px px-xxxl-80px QRGenaretarWrap">
          <div className="d-flex flex-wrap align-items-center mb-20px ">
            <div className="col-12 col-xl-auto">
              <p className="mb-0 fs-12 fs-md-16 fw-7">
                Enter Table Number to Generate QR Code:{" "}
              </p>
            </div>

            <div className="col-12 col-md-auto col-xl-auto  px-xl-20px  pt-10px pt-xl-1px">
              <input
                type="text"
                value={this.state.tableNumber}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Table Number… "
              />
            </div>
            <div className="col-12 col-md-auto col-xl-auto col-md pl-md-20px pl-xl-1px pt-10px pt-xl-1px">
              <button
                className="btn btn-xl btn-primary text-white w-100 "
                onClick={this.handleSubmit}
              >
                Generate QR Code
              </button>
            </div>
          </div>

          <div className="text-center" id="printable">
            {/* <img src={QR} alt="" /> */}

            <QRCode
              value={
                this.state.QR !== ""
                  ? this.state.QR
                  : "This is a testing QR code."
              }
              size={250}
            />
          </div>
          <div className="d-flex justify-content-center ">
            <div className="col-md-auto px-35px">
              <button
                className="btn btn-xl btn-primary text-white "
                onClick={this.handlePrint}
              >
                Print{" "}
              </button>
            </div>
            <div className="col-md-auto px-35px">
              <button
                className="btn btn-xl btn-primary text-white "
                onClick={this.handleCopy}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
