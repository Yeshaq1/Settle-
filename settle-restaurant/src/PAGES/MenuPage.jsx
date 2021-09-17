import React, { Component } from "react";
import MenuImg from "../assets/Images/menu.jpg";
import axiosInstance, { baseURL } from "../api/index";

/* Redux */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as restAction from "../redux/actions/restAction";
import { toast } from "react-toastify";

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantMenu: "",
      uploadMenu: "",
    };
  }
  componentDidMount() {
    var auth_token = localStorage.getItem("auth_token");
    if (auth_token === "" || auth_token === undefined || auth_token === null) {
      this.props.history.push("/");
    }
    this.props.restAction.restFetch();
  }
  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.restReducerData).length > 0) {
      let { restReducerData } = props;
      switch (restReducerData.type) {
        case restAction.FETCH_RESTAURANT_DETAILS_SUCCESS:
          var restInfo =
            restReducerData !== undefined &&
            restReducerData.responce !== undefined &&
            restReducerData.responce.data !== undefined &&
            restReducerData.responce.data.data !== undefined
              ? restReducerData.responce.data.data
              : "";
          return {
            restaurantMenu: restInfo.restaurant_menu_pdf,
          };
        default:
          return {};
      }
    }
  }
  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  fileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return formData, config;
  };
  triggerInputFile = () => this.fileInput.click();
  handleChange = (event) => {
    if (event.target.files[0]?.type === "application/pdf") {
      let file = event.target.files[0];
      const formData = new FormData();
      formData.append("restaurant_menu_pdf", file);
      axiosInstance
        .post("api/restaurant/profile/update", formData)
        .then((result) => {
          if (result.data.status === 200) {
            toast.success(result.data.message);
            this.props.restAction.restFetch();
          }
        })
        .catch((error) => console.log(error));
    }
  };
  render() {
    return (
      <div className="animate__animated animate__fadeIn">
        <div className="pageHead">
          <h1>Menu</h1>
          <hr />
        </div>
        <div className=" px-30px px-xl-80px">
          <p className="ls-16 fs-lg-23">
            Upload and update your menu. This menu will be shown to users when
            scanning the QR code
          </p>
          <div className="text-center">
            <div className="embed-responsive embed-responsive-4by3">
              {/* <img src={MenuImg} alt="" className="img-fluid" /> */}
              {this.state.restaurantMenu !== "" &&
                this.state.restaurantMenu !== undefined &&
                this.state.restaurantMenu !== null && (
                  <iframe
                    className="embed-responsive-item"
                    src={`${baseURL}/uploads/restaurant/${this.state.restaurantMenu}#toolbar=0`}
                    width="600"
                    height="350"
                    title="Menu"
                  />
                )}
            </div>

            <div className="pt-4 pb-60px">
              <input
                ref={(fileInput) => (this.fileInput = fileInput)}
                onChange={this.handleChange}
                accept="application/pdf"
                type="file"
                name="file"
                hidden
              />
              <button
                className="btn btn-xl btn-primary text-white px-5"
                onClick={this.triggerInputFile}
              >
                {" "}
                Upload Menu{" "}
              </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
