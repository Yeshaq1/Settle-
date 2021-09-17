import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DefaultModal from "../Modals-Component";
import CreateAccount from "./CreateAccount";
import LoginComponent from "./LoginComponent";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMenu: false,
      showModal: false,
      chooseLoginRegister: "",
    };
  }
  onClose = () => {
    this.setState({ showModal: false });
  };

  backRoute() {
    this.props.history.goBack();
  }

  logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_info");

    setTimeout(function () {
      window.location.href = window.location.href;
    });
  }

  render() {
    var userInfo = localStorage.getItem("user_info");
    var auth_token = localStorage.getItem("auth_token");
    if (userInfo !== undefined && userInfo !== null && userInfo !== "") {
      userInfo = JSON.parse(userInfo);
    }
    // console.log('userInfo',userInfo)

    return (
      <>
        <header className="position-sticky top-0 left-0 bg-white">
          <div className="d-flex justify-content-between py-2 px-3">
            <div className="backBtn ">
              <span onClick={() => this.backRoute()}>
                <i
                  className="material-icons text-dark2  align-middle"
                  style={{ cursor: "pointer" }}
                >
                  chevron_left
                </i>
              </span>
            </div>
            <div
              className="hamBergerBtn"
              onClick={() =>
                this.setState({ isOpenMenu: !this.state.isOpenMenu })
              }
            >
              <i
                className="material-icons align-middle"
                style={{ cursor: "pointer" }}
              >
                menu
              </i>
            </div>
          </div>
        </header>
        <div
          className={
            "sideMenuWrap border-0 rounded-0 vh-100 card border-0 position-fixed " +
            (this.state.isOpenMenu ? "active" : "")
          }
        >
          <div className="bg-primary">
            <p className="text-center mb-0 py-3 text-white font-weight-bold">
              Settle
            </p>
          </div>
          <div className="h-100 overflow-auto  ">
            {auth_token === "" ||
              auth_token === undefined ||
              (auth_token === null && (
                <div className="list-group rounded-0 ">
                  <button
                    className="list-group-item list-group-item-action font-weight-bold "
                    onClick={() =>
                      this.setState({
                        showModal: true,
                        isOpenMenu: false,
                        chooseLoginRegister: "login",
                      })
                    }
                  >
                    Log in
                  </button>
                  <button
                    className="list-group-item list-group-item-action font-weight-bold"
                    onClick={() =>
                      this.setState({
                        showModal: true,
                        isOpenMenu: false,
                        chooseLoginRegister: "createAccount",
                      })
                    }
                  >
                    Sign up
                  </button>
                </div>
              ))}

            <div className="userDetails d-none-">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    {userInfo !== undefined &&
                      userInfo !== null &&
                      userInfo.first_name !== "" &&
                      userInfo.first_name !== undefined &&
                      userInfo.last_name !== "" &&
                      userInfo.last_name !== undefined && (
                        <td>
                          <span className="material-icons">person</span>
                        </td>
                      )}
                    <td>
                      {userInfo !== undefined &&
                        userInfo !== null &&
                        userInfo.first_name !== "" &&
                        userInfo.first_name !== undefined &&
                        userInfo.last_name !== "" &&
                        userInfo.last_name !== undefined && (
                          <>
                            <small className="font-weight-bold">
                              {userInfo.first_name + " " + userInfo.last_name}
                            </small>{" "}
                            <br />
                          </>
                        )}

                      {userInfo !== undefined &&
                        userInfo !== null &&
                        userInfo.phone !== "" &&
                        userInfo.phone !== undefined &&
                        userInfo.phone !== "" &&
                        userInfo.phone !== undefined && (
                          <a
                            className="d-block text-dark font-weight-bold"
                            href="#"
                          >
                            <small className="font-weight-bold">
                              {userInfo.phone}
                            </small>
                          </a>
                        )}

                      {userInfo !== undefined &&
                        userInfo !== null &&
                        userInfo.email !== "" &&
                        userInfo.email !== undefined &&
                        userInfo.email !== "" &&
                        userInfo.email !== undefined && (
                          <>
                            <a
                              className="d-inline-block text-dark font-weight-bold"
                              href="#"
                            >
                              <small className="font-weight-bold">
                                {userInfo.email}
                              </small>
                            </a>
                            <Link
                              to="/edit-account"
                              className="d-inline-block font-weight-bold ml-3"
                            >
                              <small className="font-weight-bold">Edit</small>
                            </Link>
                          </>
                        )}
                    </td>
                  </tr>

                  {auth_token !== "" &&
                    auth_token !== undefined &&
                    auth_token !== null && (
                      <>
                        <tr
                          onClick={(event) =>
                            (window.location.href = "/payment-methods")
                          }
                        >
                          <td>
                            <span className="material-icons">credit_card</span>
                          </td>
                          <td>
                            <small className="font-weight-bold">
                              Payment Method
                            </small>
                          </td>
                        </tr>
                        <tr
                          onClick={() =>
                            (window.location.href = "/order-history")
                          }
                        >
                          <td>
                            <span className="material-icons">assignment</span>
                          </td>
                          <td>
                            <small className="font-weight-bold">
                              Order history
                            </small>
                          </td>
                        </tr>
                      </>
                    )}

                  <tr>
                    <td>
                      <span className="material-icons">info</span>
                    </td>
                    <td>
                      <small className="font-weight-bold">Help</small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {auth_token !== "" &&
              auth_token !== undefined &&
              auth_token !== null && (
                <div className="list-group rounded-0 d-none-">
                  <button
                    className="list-group-item list-group-item-action font-weight-bold"
                    onClick={(e) => this.logout()}
                  >
                    Sign out
                  </button>
                </div>
              )}
          </div>
          <div className="card-footer text-center">
            <small className="font-weight-bold">
              © 2020 Settle Technologies.
            </small>
          </div>
        </div>
        <div
          className={
            "sideMenuWrapMask  position-fixed w-100 h-100 top-0 left-0 " +
            (this.state.isOpenMenu ? "active" : "")
          }
          onClick={() => this.setState({ isOpenMenu: false })}
        ></div>

        <DefaultModal
          showModal={this.state.showModal}
          onClose={this.onClose.bind(this)}
          containerStyle={{ backgroundColor: "#F2F2F2" }}
        >
          {this.state.chooseLoginRegister === "login" ? (
            <LoginComponent />
          ) : null}

          {this.state.chooseLoginRegister === "createAccount" ? (
            <CreateAccount />
          ) : null}
        </DefaultModal>
      </>
    );
  }
}

export default withRouter(HeaderComponent);
