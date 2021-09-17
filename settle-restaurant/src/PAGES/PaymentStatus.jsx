import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
const tableStatus = [
  { status: "active" },
  { status: "active" },
  { status: "notActive" },
  { status: "active" },
  { status: "active" },
  { status: "active" },
];
const SeatStatus = [
  { status: "paid" },
  { status: "false" },
  { status: "paid" },
  { status: "paid" },
];
export default class PaymentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <>
        <div className="animate__animated animate__fadeIn">
          <div className="pageHead">
            <h1>Payment Status</h1>
            <hr />
          </div>

          <div className="paymentStatusWrap">
            <div className="mb-30px mb-xxxl-80px pt-20px pt-xxx-60px">
              <input
                type="text"
                placeholder="Search by table number…"
                className="form-control"
              />
            </div>
            <div className="row mx-n4">
              {tableStatus.map((list, index) => (
                <div
                  className="col-md-6 col-xl-4 mb-5 px-lg-4"
                  onClick={() => this.onOpenModal()}
                  key={index}
                >
                  <div
                    className={
                      "box p-3 text-center cp h-100 fw-5     " +
                      (list.status === "notActive" ? "notActive" : "")
                    }
                  >
                    <div className="fs-20 fs-lg-22">Table:</div>
                    <div className="fs-20 fs-lg-22 ">A50</div>
                    <div className="fs-18 fs-lg-20 mb-4">Total: $140</div>
                    {list.status !== "notActive" ? (
                      <>
                        <div className="fs-16 fs-lg-1p4rem fs-xxxl-35 text-warning">
                          Remaining: <span className="">$20</span>
                        </div>
                        <div className="fs-14 fs-lg-18">Paid: $120</div>
                      </>
                    ) : (
                      <>
                        <div className="fs-16 fs-lg-1p4rem fs-xxxl-35 text-dark">
                          Paid
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex introWrap justify-content-end pb-50px">
              <div className="d-sm-inline-flex text-align-center align-items-center pl-md-20px">
                <div
                  className="colorBox"
                  style={{ background: "#E76E49" }}
                ></div>
                <span>Active</span>
              </div>
              <div className="d-sm-inline-flex text-align-center align-items-center pl-md-20px">
                <div
                  className="colorBox"
                  style={{ background: "#939392" }}
                ></div>
                <span>Not active</span>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={this.state.open}
          onClose={() => this.onCloseModal()}
          center
        >
          <div className="statusModal  d-flex flex-column ">
            <div>
              <h2 className="text-center fw-7">Table A50</h2>
              <hr />
            </div>

            <div className="h-100 overflow-auto">
              <table className="table">
                {SeatStatus.map((data, ind) => (
                  <tbody
                    style={data.status === "paid" ? { opacity: "0.5" } : {}}
                    key={ind}
                  >
                    <tr key={ind}>
                      <th>
                        {data.status === "paid" ? (
                          <>Paid</>
                        ) : (
                          <>
                            <i className="material-icons"> panorama_fish_eye</i>
                          </>
                        )}
                      </th>
                      <th className="fs-16 fs-md-20 fw-7">Seat {ind + 1}</th>
                      <th>$21.75</th>
                    </tr>
                    {[0, 1, 2].map((list, index) => (
                      <tr key={index}>
                        <th>&#160;</th>
                        <th>1/4 Chicken Wings</th>
                        <th>$3.75</th>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
            {/* <div className="text-center pt-2">
                            <button
                                className="btn btn-xl text-white btn-primary"
                                onClick={() => this.onCloseModal()}
                            >Close</button>
                        </div> */}
          </div>
        </Modal>
      </>
    );
  }
}
