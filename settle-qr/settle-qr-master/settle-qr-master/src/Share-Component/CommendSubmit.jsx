import React, { Component } from 'react'
import StarRatingComponent from './StarRatingComponent'

import DefaultModal from "../Modals-Component"
import ImagePath from '../assets/ImagePath'



export default class CommendSubmit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            modalContentType: "",
        }
    }

    onClose = () => {
        this.setState({ showModal: false, modalContentType: "" })
    }

    renderModalContent() {
        let Content = ""

        switch (this.state.modalContentType) {
            case "1":
                Content = this.Cheeseburger();
                break;

            case "2":
                Content = this.Beer();
                break;

            case "3":
                Content = this.Nachos();
                break;

            default:
                Content = ''


        }
        return Content;

    }

    Cheeseburger() {

        return (
            <div className="w-100 py-3">
                <h5 className="text-dark1   text-center">Cheeseburger</h5>
                <div className="text-center py-3 contWidthStar">
                    <StarRatingComponent />
                </div>
                <div className="d-flex justify-content-between">
                    <div><button
                        className="btn btn-sm font-weight-bold text-dark2 p-0"
                        onClick={() => this.setState({ showModal: false, modalContentType: "1" })}>Close</button></div>
                    <div><button
                        className="btn btn-sm font-weight-bold text-dark2 p-0"
                        onClick={() => this.setState({ showModal: false, modalContentType: "1" })}>Done</button></div>
                </div>
            </div>
        )
    };

    Beer() {
        return (
            <div className="w-100 py-3">
                <h5 className="text-dark1   text-center">Beer</h5>
                <div className="text-center py-3 contWidthStar">
                    <StarRatingComponent />
                </div>
                <div className="d-flex justify-content-between">
                    <div><button className="btn btn-sm font-weight-bold text-dark2 p-0" onClick={() => this.setState({ showModal: false, modalContentType: "2" })}>Close</button></div>
                    <div><button className="btn btn-sm font-weight-bold text-dark2 p-0" onClick={() => this.setState({ showModal: false, modalContentType: "2" })}>Done</button></div>
                </div>
            </div>
        )
    };

    Nachos() {
        return (
            <div className="w-100 py-3">
                <h5 className="text-dark1   text-center">Nachos</h5>
                <div className="text-center py-3 contWidthStar">
                    <StarRatingComponent />
                </div>
                <div className="d-flex justify-content-between">
                    <div><button className="btn btn-sm font-weight-bold text-dark2 p-0" onClick={() => this.setState({ showModal: false, modalContentType: "3" })}>Close</button></div>
                    <div><button className="btn btn-sm font-weight-bold text-dark2 p-0" onClick={() => this.setState({ showModal: false, modalContentType: "3" })}>Done</button></div>
                </div>
            </div>
        )
    };

    render() {
        return (
            <>
                <div className="p-3">
                    <h6 className="font-weight-bold text-dark1">Rate your favorite dishes</h6>
                    <div className="d-flex justify-content-between">
                        <div>
                            <button style={{ width: '100px', fontSize: '10px', padding: '15px 0' }} className="btn rounded-8   btn-primary position-relative" onClick={() => this.setState({ showModal: true, modalContentType: "1" })}>
                                <span className={'d-block'}>Cheeseburger</span>
                                <span className={'d-block position-absolute text-center w-100  left-0 bottom-0'}  ><img src={ImagePath.LittleStar} alt="" /> 5</span>
                            </button>
                        </div>
                        <div>
                            <button style={{ width: '100px', fontSize: '10px', padding: '15px 0' }} className="btn rounded-8   btn-primary" onClick={() => this.setState({ showModal: true, modalContentType: "2" })}>Beer</button>
                        </div>
                        <div>
                            <button style={{ width: '100px', fontSize: '10px', padding: '15px 0' }} className="btn rounded-8   btn-primary" onClick={() => this.setState({ showModal: true, modalContentType: "3" })}>Nachos</button>
                        </div>
                    </div>
                    <div className="pt-2">
                        <table className="table table-borderless font-weight-bold text-dark1">
                            <tbody>
                                <tr>
                                    <td className="pl-0">Food</td>
                                    <td className="pr-0  flex-grow-1"><StarRatingComponent /> </td>
                                </tr>
                                <tr>
                                    <td className="pl-0">Service</td>
                                    <td className="pr-0  flex-grow-1"><StarRatingComponent /> </td>
                                </tr>
                                <tr>
                                    <td className="pl-0">Ambiance</td>
                                    <td className="pr-0  flex-grow-1"><StarRatingComponent /> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="submitBox">
                        <h6 className="text-dark1">Tell us more! </h6>
                        <textarea className="form-control rounded-8" rows="3"></textarea>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div><a className={'btn text-primary font-weight-bold'}>Skip</a></div>
                        <div><a className={'btn text-primary font-weight-bold'}>Submit</a></div>
                    </div>
                </div>


                <DefaultModal showModal={this.state.showModal} onClose={this.onClose.bind(this)}>
                    {this.renderModalContent()}

                </DefaultModal>


            </>
        )
    }
}
