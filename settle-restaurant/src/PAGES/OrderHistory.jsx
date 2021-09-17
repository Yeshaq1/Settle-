import React, { Component } from "react";
/* Redux */
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import * as restAction from "../redux/actions/restAction";

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantOrder: "",
      trans_date: "",
      table_name: "",
      apiError: "",
    };
  }
  componentDidMount() {
    var auth_token = localStorage.getItem("auth_token");
    if (auth_token === "" || auth_token === undefined || auth_token === null) {
      this.props.history.push("/");
    }
    this.fetchOrder();
  }
  componentDidUpdate() {
    if (
      this.state.apiError !== "" &&
      this.state.apiError !== null &&
      this.state.apiError !== undefined
    ) {
      toast.error(this.state.apiError);
      this.state.apiError = "";
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.restReducerData).length > 0) {
      let { restReducerData } = props;
      switch (restReducerData.type) {
        case restAction.RESTAURANT_ORDER_FETCH_SUCCESS:
          var restInfo =
            restReducerData !== undefined &&
            restReducerData.responce !== undefined &&
            restReducerData.responce.data !== undefined &&
            restReducerData.responce.data.data !== undefined
              ? restReducerData.responce.data.data
              : "";
          return {
            restaurantOrder: restInfo[0],
          };
        case restAction.RESTAURANT_ORDER_FETCH_FAILURE:
          var errMessage =
            restReducerData !== undefined &&
            restReducerData.responce !== undefined &&
            restReducerData.responce.data !== undefined &&
            restReducerData.responce.data.message !== undefined &&
            restReducerData.responce.data.message !== ""
              ? restReducerData.responce.data.message
              : "";
          // toast.error(errMessage);
          props.restAction.clearState();
          return {
            trans_date: "",
            table_name: "",
            apiError: errMessage,
          };
        default:
          return {};
      }
    }
  }
  fetchOrder = () => {
    // console.log(this.state.trans_date,this.state.table_name )
    this.props.restAction.restOrderFetch({
      trans_date: this.state.trans_date,
      table_name: this.state.table_name,
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  dateFormater = (dt) => {
    let indt = new Date(dt);
    let year = indt.getFullYear();
    let month = indt.getMonth() + 1;
    let date = indt.getDate();
    return `${year}-${month}-${date}`;
  };
  render() {
    return (
      <div className="animate__animated animate__fadeIn">
        <div className="pageHead">
          <h1>Order History </h1>
          <hr />
        </div>
        <div className="px-30px px-xxl-80px orderHistoryWrap">
          <div className="mx-auto col-xl-10 col-xxl-9">
            <div className="row">
              <div className="col-lg py-5px  py-lg-0">
                <input
                  type="text"
                  name="table_name"
                  value={this.state.table_name}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Search by table name"
                />
              </div>
              <div className="col-lg py-5px  py-lg-0">
                <input
                  type="date"
                  name="trans_date"
                  value={this.state.trans_date}
                  onChange={this.handleChange}
                  className="form-control cp"
                  placeholder="Date Range"
                />
              </div>
              <div className="col-lg py-5px  py-lg-0">
                <button
                  onClick={this.fetchOrder}
                  className="btn btn-xl btn-primary text-white w-100"
                >
                  Download Report
                </button>
              </div>
            </div>

            <div className="w-100 pt-60px table-responsive">
              <table className="table table-bordered border-secondary ">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Transaction Date</th>
                    <th>Table Name</th>
                    <th>Items ordered</th>
                    <th>Amount Paid</th>
                    <th>Tip Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.restaurantOrder?.transactionId}</td>
                    <td>
                      {this.dateFormater(
                        this.state.restaurantOrder?.trans_date
                      )}
                    </td>
                    <td>{this.state.restaurantOrder?.table?.name}</td>
                    <td>{this.state.restaurantOrder?.items_ordered}</td>
                    <td>$ {this.state.restaurantOrder?.amount}</td>
                    <td>$ {this.state.restaurantOrder?.tip_amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    restReducerData: state.restaurantReducer,
  };
};
const mapDispatchToProps = (dispatch) => ({
  restAction: bindActionCreators(restAction, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
