import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@material-ui/core/Avatar";
import { baseURL } from "../api/index";
/* Redux */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as restAction from "../redux/actions/restAction";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_name: "",
      restaurant_photos: [],
      apiErrorMessage: "",
    };
  }
  componentDidMount() {
    // console.log(this.state);
    this.props.restAction.restFetch();
  }
  componentDidUpdate() {
    if (
      this.state.apiErrorMessage !== "" &&
      this.state.apiErrorMessage !== null &&
      this.state.apiErrorMessage !== undefined
    ) {
      toast.error(this.state.apiErrorMessage);
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.restReducerData).length > 0) {
      let { restReducerData } = props;
      switch (restReducerData.type) {
        case restAction.FETCH_RESTAURANT_DETAILS_FAILURE:
          props.restAction.clearState();
          var errMessage =
            restReducerData !== undefined &&
            restReducerData.responce !== undefined &&
            restReducerData.responce.data !== undefined &&
            restReducerData.responce.data.message !== undefined &&
            restReducerData.responce.data.message !== ""
              ? restReducerData.responce.data.message
              : "";
          return {
            apiErrorMessage: errMessage,
            restaurant_photos: [],
            restaurant_name: "",
          };
        case restAction.FETCH_RESTAURANT_DETAILS_SUCCESS:
          var restInfo =
            restReducerData !== undefined &&
            restReducerData.responce !== undefined &&
            restReducerData.responce.data !== undefined &&
            restReducerData.responce.data.data !== undefined
              ? restReducerData.responce.data.data
              : "";
          return {
            apiErrorMessage: "",
            restaurant_name: restInfo.restaurant_name,
            restaurant_photos: [...restInfo.restaurant_photos],
          };
        default:
          return {};
      }
    }
  }
  render() {
    return (
      <div className="animate__animated animate__fadeIn">
        <div className="pageHead">
          <h1>Restaurant Details</h1>
          <hr />
        </div>
        <div className=" px-30px px-xl-80px">
          <div className="w-100 mb-20px">
            <span className="d-inline-flex align-items-center">
              <Avatar
                alt="Restaurant Logo"
                src={`${baseURL}/uploads/restaurant/thumb/${this.state.restaurant_photos[0]}`}
              />
              <h4 className="ms-3">
                Restaurant Name:
                <span className="text-primary">
                  {this.state.restaurant_name}
                </span>
              </h4>
            </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
