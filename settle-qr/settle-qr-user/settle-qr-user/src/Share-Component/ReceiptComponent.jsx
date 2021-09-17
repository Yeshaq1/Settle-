import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";

export default class ReceiptComponent extends Component {
  render() {
    return (
      <>
        <HeaderComponent />

        <div className="p-3 mb-5">
          <div className="card rounded-0">
            <h5 className="text-center font-weight-bold text-dark1">RECEIPT</h5>

            <div className="table-responsive">
              <table
                className="table font-weight-bold"
                style={{ fontSize: "12px" }}
              >
                {[0, 1, 2].map((list) => (
                  <tr>
                    <td>1 Poke Bowl</td>
                    <td className="text-right">$15.00</td>
                  </tr>
                ))}

                <tbody className="border-top">
                  <tr>
                    <td className="border-0 pt-4 pb-2">Subtotal</td>
                    <td className="border-0 pt-4 pb-2 text-right">$ 15.00</td>
                  </tr>
                  <tr>
                    <td className="border-0 py-2">Tax</td>
                    <td className="border-0 py-2 text-right">$ 2.25</td>
                  </tr>
                  <tr>
                    <td className="border-0 pt-2 pb-4">Tip</td>
                    <td className="border-0 pt-2 pb-4 text-right">$ 2.59</td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr style={{ fontSize: "18px" }}>
                    <td className="pt-3 pb-4">Total</td>
                    <td className="pt-3 pb-4 text-right">$ 19.84</td>
                  </tr>

                  <tr>
                    <td>Date</td>
                    <td className="text-right">21/05/2020 19:30</td>
                  </tr>
                  <tr>
                    <td>Card type</td>
                    <td className="text-right">Visa - xxxx</td>
                  </tr>
                  <tr>
                    <td>Amount charged</td>
                    <td className="text-right">$ 19.84</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
