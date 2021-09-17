import React, { Component } from "react";
import ImagePath from "../assets/ImagePath";
import DefaultModal from "../Modals-Component";
import CreateAccount from "../Share-Component/CreateAccount";
import HeaderComponent from "../Share-Component/HeaderComponent";
import HeroBannerComponent from "../Share-Component/HeroBannerComponent";
import LoginComponent from "../Share-Component/LoginComponent";
import PayableBillComponent from "../Share-Component/PayableBillComponent";

import axiosInstance, { baseURL } from "../api/";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PDFViewer from "pdf-viewer-reactjs";
import PDF from "react-pdf-js-infinite";

const DefaultContent = (props) => {
  return (
    <div className="text-center">
      <button
        className="btn rounded-8 btn-primary w-100"
        onClick={() => props.changeContentType("signUp")}
      >
        <h5 className="d-block mb-0">Create Account</h5>
        <small className="d-block">Save info for future payments</small>
      </button>

      <button
        className="btn rounded-8 py-3 btn-dark2 w-100 shadow-none my-4"
        onClick={() => props.onClose()}
      >
        <h5 className="d-block text-white mb-0">Check out as guest</h5>
      </button>

      <button
        className="btn rounded-8 btn-primary px-4"
        onClick={() => props.changeContentType("login")}
      >
        Login
      </button>
    </div>
  );
};
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeCoupleBtn: true,
      showModal: false,
      contentType: "default",
      position: 0,
      restaurantInfo: {
        restaurant_menu_pdf: "",
        restaurant_photos: [],
        table_name: "",
        seat: [],
      },
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const tableId = urlParams.get("tableId");
    const registerSuccess = urlParams.get("registerSuccess");
    const loginSuccess = urlParams.get("loginSuccess");

    if (registerSuccess === true || registerSuccess === "true") {
      toast(
        "You have successfully registered. To access your account, please login now"
      );
      setTimeout(function () {
        window.location.href = "/home/?tableId=" + tableId;
      }, 5000);
    }

    if (loginSuccess === true || loginSuccess === "true") {
      toast("You have successfully logged in");
      setTimeout(function () {
        window.location.href = "/home/?tableId=" + tableId;
      }, 3000);
    }
    if (tableId !== undefined && tableId !== null && tableId !== "") {
      axiosInstance
        .get(`api/restaurant/table/` + tableId)
        .then((res) => {
          //console.log('res',res)
          var restaurantRes = res.data.data;
          var restaurantInfo =
            restaurantRes.restaurant !== undefined &&
            restaurantRes.restaurant !== null &&
            restaurantRes.restaurant !== ""
              ? restaurantRes.restaurant
              : "";
          var tableInfo =
            restaurantRes.table !== undefined &&
            restaurantRes.table !== null &&
            restaurantRes.table !== ""
              ? restaurantRes.table
              : "";

          // console.log('restaurantRes',restaurantRes);

          var restaurant_menu_pdf = "";
          var restaurant_name = "";
          var restaurant_photos = [];
          var table_name = "";
          var seat = [];

          if (restaurantInfo !== "") {
            restaurant_menu_pdf =
              restaurantInfo.restaurant_menu_pdf !== undefined &&
              restaurantInfo.restaurant_menu_pdf !== null &&
              restaurantInfo.restaurant_menu_pdf !== ""
                ? restaurantInfo.restaurant_menu_pdf
                : "";
            restaurant_name =
              restaurantInfo.restaurant_name !== undefined &&
              restaurantInfo.restaurant_name !== null &&
              restaurantInfo.restaurant_name !== ""
                ? restaurantInfo.restaurant_name
                : "";
            restaurant_photos =
              restaurantInfo.restaurant_photos !== undefined &&
              restaurantInfo.restaurant_photos !== null &&
              restaurantInfo.restaurant_photos !== ""
                ? restaurantInfo.restaurant_photos
                : [];
          }

          if (tableInfo !== "") {
            table_name =
              tableInfo.name !== undefined &&
              tableInfo.name !== null &&
              tableInfo.name !== ""
                ? tableInfo.name
                : "";
            seat =
              tableInfo.seat !== undefined &&
              tableInfo.seat !== null &&
              tableInfo.seat !== ""
                ? tableInfo.seat
                : [];
          }

          var new_restaurant_photos = [];

          if (restaurant_photos.length > 0) {
            restaurant_photos.forEach(function (itm, indx) {
              var newPic = baseURL + "uploads/restaurant/" + itm;
              new_restaurant_photos.push(newPic);
            });
          }

          let new_restaurantInfo = {
            restaurant_menu_pdf:
              baseURL + "uploads/restaurant/" + restaurant_menu_pdf,
            restaurant_name: restaurant_name,
            restaurant_photos: new_restaurant_photos,
            table_name: table_name,
            seat: seat,
          };

          this.setState({
            restaurantInfo: new_restaurantInfo,
            position: 1,
          });
        })
        .catch(function (error) {
          //toast(error.message)
        });
    }
  }

  changeContentType(contentType) {
    this.setState({ contentType });
  }

  onClose() {
    this.setState({
      showModal: false,
      contentType: "default",
      homeCoupleBtn: false,
    });
  }
  render() {
    let { contentType } = this.state;

    return (
      <>
        {this.state.restaurantInfo.restaurant_menu_pdf !== "" && (
          <>
            <HeaderComponent />
            <HeroBannerComponent restaurantInfo={this.state.restaurantInfo} />

            <div className={"homeCoupleBtn mt-n2"}>
              <div className={"d-flex bg-secondary"}>
                <div className={"w-50"}>
                  <button
                    onClick={() => this.setState({ homeCoupleBtn: true })}
                    className={
                      "btn py-2 shadow-none w-100 text-center text-white " +
                      (this.state.homeCoupleBtn === true
                        ? "btn-primary"
                        : "btn-secondary")
                    }
                  >
                    View Menu
                  </button>
                </div>
                <div className={"w-50"}>
                  <button
                    style={{
                      pointerEvents:
                        this.state.homeCoupleBtn === false ? "none" : "",
                    }}
                    onClick={() => this.setState({ showModal: true })}
                    className={
                      "btn py-2 shadow-none w-100 text-center text-white  " +
                      (this.state.homeCoupleBtn === false
                        ? "btn-primary"
                        : "btn-secondary")
                    }
                  >
                    Pay Bill
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {this.state.homeCoupleBtn === true ? (
          <figure className={"foodPrintedMenu d-block m-0 pt-4 px-3 pb-4"}>
            {this.state.restaurantInfo.restaurant_menu_pdf !== "" && (
              <PDF
                file={this.state.restaurantInfo.restaurant_menu_pdf}
                scale={1.2}
              />
            )}

            {this.state.restaurantInfo.restaurant_menu_pdf === "" &&
              this.state.position === 1 && (
                <div className="alert alert-info" role="alert">
                  Sorry, no restaurant information found !!
                </div>
              )}
          </figure>
        ) : null}
        {this.state.homeCoupleBtn === false ? <PayableBillComponent /> : null}

        {this.state.restaurantInfo.restaurant_menu_pdf !== "" && (
          <DefaultModal
            showModal={this.state.showModal}
            onClose={this.onClose.bind(this)}
            containerStyle={{
              backgroundColor:
                contentType === "default" ? "transparent" : "#F2F2F2",
            }}
          >
            {contentType === "default" && (
              <DefaultContent
                changeContentType={this.changeContentType.bind(this)}
                onClose={this.onClose.bind(this)}
              />
            )}
            {contentType === "login" && <LoginComponent />}
            {contentType === "signUp" && <CreateAccount />}
          </DefaultModal>
        )}
      </>
    );
  }
}
