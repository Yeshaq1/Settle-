import React, { Component } from "react";
import ActiveStar from "../assets/Images/activeStar.svg";
import Star from "../assets/Images/star.svg";
import smallStart from "../assets/Images/sStar.svg";
import DatePiker from "../WIDGET/DateRainge";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ReactStars from "react-stars";
/* Redux */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as restAction from "../redux/actions/restAction";
import { toast } from "react-toastify";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restFeedInfo: "",
      overallReview: "",
      dishReview: "",
      starData: [],
      showDate: false,
      showRating: false,
      startDate: "",
      endDate: "",
    };
  }

  componentDidMount() {
    var auth_token = localStorage.getItem("auth_token");
    if (auth_token === "" || auth_token === undefined || auth_token === null) {
      this.props.history.push("/");
    }
    this.props.restAction.restFeedFetch();
  }
  // componentDidUpdate() {}
  filter(e) {
    var chooseData = e.target.value;
    // console.log(typeof chooseData, chooseData);
    if (chooseData === "2") {
      this.setState({ showRating: false, showDate: true });
    } else if (chooseData === "1") {
      this.setState({ startDate: "", endDate: "", showRating: true });
    } else {
      this.setState({
        startDate: "",
        endDate: "",
        starData: [],
        showDate: false,
        showRating: false,
      });
      this.props.restAction.restFeedFetch();
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.restReducerData).length > 0) {
      let { restReducerData } = props;
      switch (restReducerData.type) {
        case restAction.RESTAURANT_FEEDBACK_FETCH_SUCCESS:
          var data =
            restReducerData !== undefined &&
            restReducerData.responce !== undefined &&
            restReducerData.responce.data !== undefined &&
            restReducerData.responce.data.data !== undefined
              ? restReducerData.responce.data.data
              : "";
          return {
            restFeedInfo: data.restaurent_feedback_list,
            overallReview: data.avgRating_restaurent,
            dishReview: data.avgRating_list_by_dish,
          };
        default:
          return {};
      }
    }
  }
  handlechange = (e) => {
    let value = parseInt(e.target.id);
    let idx = this.state.starData.indexOf(value);
    if (idx === -1) {
      let data = this.state.starData;
      data.push(value);
      this.setState({ starData: data });
      this.props.restAction.restFeedFetch({ rating: data });
    } else {
      let preData = this.state.starData.filter((item) => item !== value);
      this.setState({ starData: preData });
      this.props.restAction.restFeedFetch({ rating: preData });
    }
  };
  dateAssign = (startDate, endDate) => {
    this.setState({
      startDate,
      endDate,
    });
  };
  dateFormater = (date) => {
    let indt = new Date(date);
    let year = indt.getFullYear();
    let month = indt.toLocaleString("default", { month: "long" });
    return `${month}, ${year}`;
  };
  dateSelector = (dt) => {
    let indt = new Date(dt);
    let year = indt.getFullYear();
    let month = indt.getMonth();
    let date = indt.getDate();
    return `${year}-${month + 1}-${date}`;
  };
  handleModalClose = () => {
    this.setState({ showDate: false });
    let st_date = new Date(this.state.startDate);
    let end_date = new Date(this.state.endDate);

    if (parseInt((end_date - st_date) / (1000 * 60 * 60 * 24), 10) >= 1) {
      // console.log(this.dateSelector(this.state.startDate));
      // console.log(this.dateSelector(this.state.endDate));
      this.props.restAction.restFeedFetch({
        start_date: this.dateSelector(this.state.startDate),
        end_date: this.dateSelector(this.state.endDate),
      });
    } else {
      toast.error("Please select proper date");
    }
  };
  render() {
    return (
      <>
        <div className="animate__animated animate__fadeIn">
          <div className="pageHead">
            <div className="row  align-items-center">
              <div className="col-sm-auto mr-auto">
                <h1 className="mb-0">Feedback </h1>
              </div>
            </div>
            <hr />
          </div>

          {/* <button onClick={this.show.bind(this)}>Open modal</button> */}
          <Modal
            open={this.state.showDate}
            onClose={this.handleModalClose}
            center
          >
            <div>
              <h4>Choose date range</h4>
              <hr />
              <DatePiker setDate={this.dateAssign} />
            </div>
          </Modal>

          <div className="px-15px px-md-30px px-xxxl-80px feedBackWrap">
            <div className=" pt-20px pt-xxxl-50px rateBox">
              <ul className="list-unstyled mb-0" style={{ color: "#4A4A4A" }}>
                {this.state.overallReview &&
                  this.state.overallReview.map((list) => {
                    return (
                      <li className="d-flex mb-15px mb-xxxl-30px">
                        <div className="pr-24px">
                          <b className="fs-20 fs-xxxl-30 fw-6">
                            {list.name === "avgAmbianceRating"
                              ? "Ambiance"
                              : list.name === "avgServiceRating"
                              ? "Service"
                              : "Food"}
                          </b>
                        </div>
                        {/* <div style={{ marginTop: "-2px" }}> */}
                        <ReactStars
                          className="mt-n1"
                          count={5}
                          value={list.rating ? list.rating : 1}
                          size={24}
                          color2={"#ED8A18"}
                          edit={false}
                          half={true}
                        />
                        {/* </div> */}
                        <div className="fs-20 fw-7 pl-10px">
                          {list.rating ? list.rating : "1"}
                        </div>
                      </li>
                    );
                  })}
                {
                  // [1,2,3,4,5].map((data, ind) =>
                  //     <li className="d-flex mb-15px mb-xxxl-30px" key={ind}>
                  //         <div className="pr-24px">
                  //             <b className="fs-20 fs-xxxl-30 fw-6"  >Food</b>
                  //         </div>
                  //         <div className="px-2px">
                  //             {this.state.starData.map((item, index) =>
                  //                 item ? <span className="px-3px" key={index}><img src={ActiveStar} alt="" key={index} /></span> : <span className="px-3px" key={index}><img src={Star} alt="" key={index} /></span>
                  //             )}
                  //         </div>
                  //         <div className="fs-20 fw-7 pl-10px">4.0</div>
                  //     </li>
                  // )
                }
              </ul>
            </div>

            <div className="fs-26 fs-xxxl-40 text-black fw-7 mb-35px pt-5">
              Reviews by dish
            </div>
            <div className="ratingTag col-xl-10 mb-20px mb-md-50px mb-xxl-80px">
              <div className="row">
                {this.state.dishReview &&
                  this.state.dishReview.map((list) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={list._id}>
                      <div
                        className="  bg-primary px-15px px-xl-50px py-7px text-center fw-7 text-white"
                        style={{ borderRadius: "15px" }}
                      >
                        <span className="d-block fs-20 fs-xxl-27">
                          {list.dish_name}
                        </span>
                        <span className="fs-22 fs-xxl-27 d-inline-flex align-items-center">
                          {list.avgRating}{" "}
                          <img src={smallStart} alt="" className="ml-5px" />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-100">
              <div className="row align-items-center">
                <div className="col-sm-auto mr-auto">
                  <div className="fs-22 fs-md-26 fs-xl-40 text-black fw-7 mb-15px mb-xxl-35px">
                    Written Feedback
                  </div>
                </div>
                <div className="col-sm-auto  ">
                  <div className="">
                    <select
                      onChange={(e) => this.filter(e)}
                      className="form-control cp pr-50px"
                    >
                      <option value="0">Filter by none</option>
                      <option value="1">Filter by star rating</option>
                      <option value="2">Filter by date</option>
                    </select>
                  </div>
                </div>
                {this.state.showRating && (
                  <div className="col-sm-auto">
                    {/* <select className="form-control cp pr-40px">
                                        <option value="1">1 star</option>
                                        <option value="2">2 star</option>
                                        <option value="3">3 star</option>
                                        <option value="4">4 star</option>
                                        <option value="5">5 star</option>
                                    </select>  */}
                    <div className="customDropList">
                      <h6>Choose star option</h6>
                      <ul className="list-unstyled multi">
                        <li className="w-100">
                          <label htmlFor="1" className="">
                            <input
                              type="checkbox"
                              name="rating"
                              id="1"
                              onChange={this.handlechange}
                              hidden
                            />
                            <i></i>
                            <span>1 star</span>
                          </label>
                        </li>
                        <li className="w-100">
                          <label htmlFor="2" className="">
                            <input
                              type="checkbox"
                              name="rating"
                              id="2"
                              onChange={this.handlechange}
                              hidden
                            />
                            <i></i>
                            <span>2 star</span>
                          </label>
                        </li>
                        <li className="w-100">
                          <label htmlFor="3" className="">
                            <input
                              type="checkbox"
                              name="rating"
                              id="3"
                              onChange={this.handlechange}
                              hidden
                            />
                            <i></i>
                            <span>3 star</span>
                          </label>
                        </li>
                        <li className="w-100">
                          <label htmlFor="4" className="">
                            <input
                              type="checkbox"
                              name="rating"
                              id="4"
                              onChange={this.handlechange}
                              hidden
                            />
                            <i></i>
                            <span>4 star</span>
                          </label>
                        </li>
                        <li className="w-100">
                          <label htmlFor="5" className="">
                            <input
                              type="checkbox"
                              name="rating"
                              id="5"
                              onChange={this.handlechange}
                              hidden
                            />
                            <i></i>
                            <span>5 star</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {this.state.startDate && this.state.endDate && (
                  <div className="col-sm-auto">
                    <h6 className="mb-0">
                      <span
                        className="material-icons align-middle"
                        style={{ marginRight: "5px" }}
                      >
                        event
                      </span>
                      {this.dateSelector(this.state.startDate)} to{" "}
                      {this.dateSelector(this.state.endDate)}
                    </h6>
                  </div>
                )}
              </div>
              <table className="table w-100" style={{ color: "#4A4A4A" }}>
                <tbody>
                  {this.state.restFeedInfo &&
                    this.state.restFeedInfo.map((list) => (
                      <tr key={list._id}>
                        <td className="pt-10 pt-md-24px fw-6">
                          <p className="fs-14 fs-md-18 fs-lg-24 fs-xxxl-28 mb-0">{`“${list.comment}”`}</p>
                          <div className=" fs-11 fs-lg-18 fs-xxxl-22">
                            From {list.user.first_name} {list.user.last_name}
                          </div>
                        </td>
                        <td className="pt-24px fw-6 fs-12 fs-lg-22 fs-xxxl-28 text-right">
                          {this.dateFormater(list.createdAt)}
                          <div className=" fs-11 fs-lg-18 fs-xxxl-22">
                            Rating : {Math.floor(list.avg_rating)}
                            <img src={smallStart} alt="" className="ml-5px" />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
