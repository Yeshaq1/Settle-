import React, { Component } from "react";

export default class TipsAmount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDollarPercent: "dollar",
      isOpenOtherTip: false,
      isOrange: 0,
    };
  }
  // componentDidUpdate() {
  //   if (this.state.tipAmount !== 0) {
  //     this.props.tipChange(this.state.tipAmount);
  //   }
  // }

  // handle(event) {
  //   // this.setState({ tipAmount: event.target.value });
  //   this.props.tipChange(parseInt(event.target.value));
  // }
  handleChange = (event) => {
    if (this.state.isDollarPercent === "percent") {
      // this.props.tipChange(parseInt(this.props.subTotal + event.target.value));
      let new_tip = this.props.subTotal * (event.target.value / 100);
      console.log(this.props.subTotal);
      this.props.tipChange(parseInt(new_tip));
    } else {
      this.props.tipChange(parseInt(event.target.value));
    }
  };
  handle15 = () => {
    this.setState({ isOpenOtherTip: false, isOrange: 1 });
    this.props.tipChange(parseInt(this.props.subTotal * 0.15));
  };
  handle18 = () => {
    this.setState({ isOpenOtherTip: false, isOrange: 2 });
    this.props.tipChange(parseInt(this.props.subTotal * 0.18));
  };
  handleother = () => {
    this.setState({ isOpenOtherTip: !this.state.isOpenOtherTip, isOrange: 0 });
  };
  render() {
    return (
      <>
        <h5 className="text-dark1 font-weight-bold text-uppercase d-flex justify-content-between align-items-center mb-4">
          <span>Tip amount</span>
          <span>$ {this.props.tipAmmount}</span>
        </h5>
        <div className="d-flex justify-content-between">
          <button
            className={
              "btn  btn-lg text-white rounded-8 " +
              (this.state.isOrange === 1 ? "btn-primary" : "btn-dark2")
            }
            style={{ width: "94px" }}
            onClick={this.handle15}
          >
            15%
          </button>
          <button
            className={
              "btn   btn-lg text-white rounded-8 " +
              (this.state.isOrange === 2 ? "btn-primary" : "btn-dark2")
            }
            style={{ width: "94px" }}
            onClick={this.handle18}
          >
            18%
          </button>
          <button
            className={
              "btn  btn-lg text-white rounded-8 " +
              (this.state.isOpenOtherTip ? "btn-primary" : "btn-dark2")
            }
            style={{ width: "100px" }}
            onClick={this.handleother}
          >
            Other
          </button>
        </div>
        {this.state.isOpenOtherTip === true ? (
          <div className="pt-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex border rounded-8">
                <button
                  className={
                    "btn px-4 shadow-none " +
                    (this.state.isDollarPercent === "dollar"
                      ? "btn-primary"
                      : "")
                  }
                  onClick={() => this.setState({ isDollarPercent: "dollar" })}
                >
                  $
                </button>
                <button
                  className={
                    "btn px-4 shadow-none " +
                    (this.state.isDollarPercent === "percent"
                      ? "btn-primary"
                      : "")
                  }
                  onClick={() => this.setState({ isDollarPercent: "percent" })}
                >
                  %
                </button>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="1"
                  value={this.props.tipAmmount}
                  onChange={this.handleChange}
                  min="1"
                  // disabled={
                  //   this.state.isDollarPercent === "percent" ? "disabled" : ""
                  // }
                  // defaultValue="1"
                  className="form-control text-center font-weight-bold h-auto py-2 shadow-none"
                  style={{ width: "70px" }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
