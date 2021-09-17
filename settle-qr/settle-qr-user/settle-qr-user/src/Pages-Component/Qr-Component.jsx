import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImagePath from "../assets/ImagePath";
//http://zpao.github.io/qrcode.react/ for QR code API reference
var QRCode = require("qrcode.react");

export default class QRComponent extends Component {
  render() {
    return (
      <>
        <div className="card vh-100 align-items-center justify-content-center">
          <Link to="/home?tableId=5fc78578ed0b4424887c351e" className="imgBox">
            {/* <img src={ImagePath.qr} alt="" /> */}
            <QRCode
              value={
                "https://settle-qr.dedicateddevelopers.us/home?tableId=5fc78578ed0b4424887c351e"
              }
              size={250}
            />
          </Link>
        </div>
      </>
    );
  }
}
