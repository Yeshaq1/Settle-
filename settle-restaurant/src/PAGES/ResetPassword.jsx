import React, { Component } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/index";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false,
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = () => {
    this.setState({ email: "", loading: true });
    axiosInstance
      .post("api/restaurant/forgot-password", { email: this.state.email })
      .then((res) => {
        if (res.data.status === 200) {
          this.setState({ loading: false });
          toast.success(res.data.message);
          this.props.history.push("/email-confirmation");
        } else {
          toast.error(res.data.message);
          this.setState({loading: false})
        }
      })
      .catch((error) => {
        console.log(error)
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className="animate__animated animate__fadeIn">
        <div className="pt-40px heading">
          <h1 className="fw-7">Forgot Password</h1>
          <p className="fw-6">
            Enter your email address below and a reset link will be sent to you
          </p>
        </div>

        <div className="pt-md-50px">
          {this.state.loading ? (
            <CircularProgress className="m-5" color="secondary" size={60} />
          ) : (
            <>
              <div className="w-100">
                <label className="w-100 fw-6">Email:</label>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>

              <div className="pt-40px">
                <button
                  className="btn btn-xl btn-primary text-white "
                  // onClick={()=> window.location.href="/email-confirmation"}
                  onClick={this.handleSubmit}
                >
                  Reset Password
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
