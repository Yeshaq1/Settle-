import React, { Component } from 'react'
import EditAccount from '../Share-Component/EditAccount'
import HeaderComponent from '../Share-Component/HeaderComponent'
import VerifyMobileNumber from '../Share-Component/VerifyMobileNumber';

function OtpSection() {
    return (
        <div>
            <h5 className="text-dark1 text-center mb-4 font-weight-bold">Verify your number</h5>

            <p className="text-dark1 text-center mb-4"><small className="font-weight-bold">Enter 6 digit verification code sent to your phone</small></p>

            <form>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <div className="form-group">
                            <input type="text" placeholder=" " className="form-control shadow-none rounded-8" />
                            <small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                        </div>
                    </div>
                    <div className="col-auto px-0 pt-1">
                        <span className="material-icons  align-middle">remove</span>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <input type="text" placeholder=" " className="form-control shadow-none rounded-8" />
                            <small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                        </div>
                    </div>
                    <div className="col-md-12 text-center">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm rounded-8 px-4"
                            onClick={() => window.location.href = "/home"}
                        >Confirm</button>
                    </div>
                    <div className="col-md-12 pt-3">
                        <p><small>If you have not recieved a code, click <a href="#" className="font-weight-bold">here</a> to recieve another one</small></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default class EditMyAccountPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOtpOpen: false,
        }
    }
    handleOtp = (data) => {
        this.setState({ isOtpOpen: data })
    }
    render() {
        return (
            <div>
                <HeaderComponent />
                <hr />
                <div className="p-3">
                    {this.state.isOtpOpen === false ?
                        <EditAccount verifyOtp={this.handleOtp.bind(this)} />
                        : <VerifyMobileNumber />
                    }


                </div>
            </div>
        )
    }
}
