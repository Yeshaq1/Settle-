import React, { Component } from 'react'

export default class EditAccount extends Component {
    openOtp = () => {
        this.props.verifyOtp(true);
    }
    render() {
        return (
            <>
                <div>
                    <h5 className="text-dark1 text-center font-weight-bold mb-4">Edit Account</h5>
                    <form>
                        <div className="row">

                            <div className="col-6">
                                <div className="form-group">
                                    <input type="text" placeholder="Joseph" className="form-control shadow-none rounded-8" />
                                    <small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <input type="text" placeholder="Eshaq" className="form-control shadow-none rounded-8" />
                                    <small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group">
                                    <div className="position-relative">
                                        <input type="text" placeholder="+1 418 555-0100" className="form-control shadow-none rounded-8" />
                                        <button className="btn text-success position-absolute shadow-none top-0 right-0 font-weight-bold py-1">verified</button>
                                    </div>
                                    <small className="d-block text-dark1 pt-2">A 6 digit code will be sent to any new numbers for verification </small>

                                    <small className="form-text text-muted d-none">Error line never share your email with anyone else.</small>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group">
                                    <input type="text" placeholder="jeshaq@gmail.com" className="form-control shadow-none rounded-8" />
                                    <small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                                </div>
                            </div>



                            <div className="col-md-12 pt-3 text-center">
                                <button type="button" className="btn btn-primary btn-sm rounded-8 px-5" onClick={() => this.openOtp()}>Save</button>
                            </div>

                        </div>
                    </form>
                </div>
            </>
        )
    }
}
