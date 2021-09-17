import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImagePath from "../assets/ImagePath";
import HeaderComponent from "../Share-Component/HeaderComponent";
import HeroBannerComponent from "../Share-Component/HeroBannerComponent";
import OtherPaymentInputComponent from "../Share-Component/OtherPaymentInputComponent";
import TipsAmount from "../Share-Component/TipsAmount";

export default class GuestPayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOtherPayment: false,
      subTotal: 25.51,
      tipAmount: 0,
      totalAmmount: 0,
    };
  }
  componentDidMount() {
    console.log(this.props);
    this.setState({ totalAmmount: this.state.subTotal + this.state.tipAmount });
  }
  handleTipChange = (ammount) => {
    this.setState({ tipAmount: ammount });
    this.setState({ totalAmmount: this.state.subTotal + ammount });
  };
  render() {
    return (
      <>
        <HeaderComponent />
        {/* <HeroBannerComponent /> */}
        <div className="p-4">
          <table
            className="table  text-dark1 font-weight-bold table-borderless border border-secondary"
            style={{ fontSize: "12px" }}
          >
            <tbody>
              <tr>
                <td className="p-2">1/4 Chicken wings</td>
                <td className="p-2 text-right">$ 3.00</td>
              </tr>
              <tr>
                <td className="p-2">1 Cheeseburger</td>
                <td className="p-2 text-right">$ 15.00</td>
              </tr>
              <tr>
                <td className="p-2">1/4 Beer pitcher</td>
                <td className="p-2 text-right">$ 3.75</td>
              </tr>

              <tr className="border-top border-secondary">
                <td className="p-2">Tax</td>
                <td className="p-2 text-right">$ 3.26</td>
              </tr>
              <tr>
                <td className="p-2">Subtotal</td>
                <td className="p-2 text-right">$ {this.state.subTotal}</td>
              </tr>

              <tr
                className="border-top border-secondary"
                style={{ fontSize: "17px" }}
              >
                <td className="p-2">Total</td>
                <td className="p-2 text-right">
                  $ {parseFloat(this.state.totalAmmount).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Table Wraper End */}

        <div className="chooseTops px-3">
          <TipsAmount
            subTotal={this.state.subTotal}
            tipAmmount={this.state.tipAmount}
            tipChange={this.handleTipChange}
          />

          <p className="text-dark1 font-weight-bold mb-2 pt-4">
            Select your payment method
          </p>

          {/* Other Payment Method Start */}

          {this.state.isOtherPayment === true ? (
            <OtherPaymentInputComponent />
          ) : null}

          {/* Other Payment Method Start */}
          <div className="row flex-nowrap justify-content-between   ">
            <div className="col-auto">
              <button
                className="btn mb-3 btn-outline-secondary    btn-lg text-dark font-weight-bold rounded-8"
                onClick={() =>
                  this.setState({ isOtherPayment: !this.state.isOtherPayment })
                }
                style={{ width: "100px", fontSize: "1rem" }}
              >
                Other
              </button>
            </div>
            <div className="col pl-0">
              <button
                className="btn w-100 mb-3 btn-outline-secondary   btn-lg text-dark font-weight-bold rounded-8 "
                style={{ width: "auto", fontSize: "1rem" }}
              >
                Pay with Visa ***** 4819
              </button>
            </div>
          </div>
          <div className="row flex-nowrap justify-content-between  pb-5 ">
            <div className="col-auto">
              <Link
                to="/thanks"
                className="btn mb-3 btn-deep-dark btn-lg text-white rounded-8"
                style={{ width: "100px" }}
              >
                <img
                  style={{ height: "18px" }}
                  src={ImagePath.applePay}
                  alt={"Apple Pay"}
                />
              </Link>
            </div>
            <div className="col pl-0">
              <Link
                to="/thanks"
                className="btn mb-3 btn-outline-secondary  btn-lg text-white rounded-8"
                style={{ width: "100px" }}
              >
                <img
                  style={{ height: "18px" }}
                  src={ImagePath.gPay}
                  alt={"Google Pay"}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="position-fixed bottom-0 left-0 w-100">
          <Link
            to={this.state.tipAmount < 1 ? "#" : "/thanks"}
            className="btn btn-primary w-100 rounded-0 shadow-none py-2"
          >
            Pay
          </Link>
        </div>
      </>
    );
  }
}
