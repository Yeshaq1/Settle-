import React, { Component } from "react";
import CommendSubmit from "../Share-Component/CommendSubmit";
import HeaderComponent from "../Share-Component/HeaderComponent";
import HeroBannerComponent from "../Share-Component/HeroBannerComponent";

export default class ThankuPage extends Component {
  render() {
    return (
      <>
        <HeaderComponent />
        {/* <HeroBannerComponent /> */}
        <div className="p-3 text-center font-weight-bold">
          <h5 className="mb-0 font-weight-bold">Thank you!</h5>
          <p className="mb-0 text-dark1">
            A copy of your receipt has been sent to your email
          </p>
        </div>
        <CommendSubmit />
      </>
    );
  }
}
