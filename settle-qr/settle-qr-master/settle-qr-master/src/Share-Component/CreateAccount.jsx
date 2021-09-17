import React, { Component } from 'react';
import telNumber from '../assets/CountryCodes.json';
import VerifyMobileNumber from './VerifyMobileNumber';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Import Axios */
import axiosInstance from '../api/';
import { Capitalize } from "../library"


export default class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOtpOpen: false,
            isLoading: false,
            formData: {
                first_name: "",
                last_name: "",
                code: "",
                phone: "",
                email: "",
                creditCard: "",
                date: "",
                cvc: "",
                agree : false,
            },
            errors: {
                first_name: "",
                last_name: "",
                code: "",
                phone: "",
                email: "",
                creditCard: "",
                date: "",
                cvc: "",
                agree : "",
                card_error : ""
            }
        }
    }

    onChange = (e) => {
        let { errors,formData } = this.state
        if(e.target.name === 'agree'){
            formData['agree'] = !formData['agree']
            errors["card_error"] = "";
        }else{
            formData[e.target.name] = e.target.value
        }
        this.setState({ formData, errors })
    }

    selectDate(date) {
        let { formData } = this.state;
        formData.date = date
        this.setState({ formData })
    }


    onFocus = (e) => {
        let { errors } = this.state
        errors[e.target.name] = "";

        if(e.target.name === "creditCard" || e.target.name === "date" || e.target.name === "cvc"){
             errors["card_error"] = "";
        }

        this.setState({ errors})
    }

    validateForm() {
        let { formData, errors } = this.state;
        let validation_passed = true;

        Object.keys(errors).forEach((field_name) => {
            if (field_name !== "card_error" && field_name !== "agree" && (formData[field_name] === undefined || formData[field_name] === "")) {
                validation_passed = false
                errors[field_name] = Capitalize(field_name).replace("_", " ").replace("id", "") + " should not be blank!"
            } else if (field_name == "email") {
                var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
                if (!regex.test(formData[field_name])) {
                    validation_passed = false
                    errors[field_name] = "Invalid email!"
                }
            }
        })

        console.log('errorserrors',errors)

        if(errors["creditCard"] != "" || errors["date"] !== "" || errors["cvc"] !== ""){
            validation_passed = false
            errors["card_error"] = "Please enter valid card details"
        }

        if(formData["agree"] === false){
            validation_passed = false
            errors["agree"] = "Please accept terms and conditions"
        }


        this.setState({ errors })
        return validation_passed
    }


    renderFormError(fieldName) {
        let { errors } = this.state
        if (errors[fieldName] !== undefined && errors[fieldName] !== "") {
            return (
                <small className="form-text" style={{ color: "red" }}>&#160;{errors[fieldName]}</small>
            )
        }
        return;
    }


    submitForm(e){
        e.preventDefault();
        if(this.validateForm()){
           var THIS = this;
           var formData = this.state.formData;

            var check = moment(formData.date, 'YYYY/MM/DD');
            var month = check.format('MM');
            var year  = check.format('YYYY');

            var registerData = {
                email : formData.email,
                first_name : formData.first_name,
                last_name : formData.last_name,
                phone : formData.code + formData.phone,
                zip_code : "",
                card_number : formData.creditCard,
                exp_month : month,
                exp_year : year,
                cvv : formData.cvc,
            }

            axiosInstance.post(`api/userWebApp/signup/`,registerData)
            .then(res => {
                if (res.status === 200) {
                    THIS.setState({ isOtpOpen: true })
                }else{
                    //toast(res.data.message)
                    var errorTemp = {
                        agree : res.data.message,
                        first_name: "",
                        last_name: "",
                        code: "",
                        phone: "",
                        email: "",
                        creditCard: "",
                        date: "",
                        cvc: "",
                        card_error : ""
                    }
                    THIS.setState({
                        errors : errorTemp,
                    })

                }
            }).catch(function (error) {
                //toast(error.message)
                var errorTemp = {
                    //agree : error.message,
                    agree : "Something went wrong. Please try again",
                    first_name: "",
                    last_name: "",
                    code: "",
                    phone: "",
                    email: "",
                    creditCard: "",
                    date: "",
                    cvc: "",
                    card_error : ""
                }
                THIS.setState({
                    errors : errorTemp,
                })
            })
        }
    }

    render() {
        let { formData } = this.state

        return (
            <>
                {(this.state.isOtpOpen === false) ?
                    <div>
                        <h5 className="text-dark1 text-center font-weight-bold">Create your account</h5>
                        <form noValidate onSubmit={(e)=>this.submitForm(e)}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <input type="text" placeholder="First Name" className="form-control shadow-none rounded-8" name="first_name" onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} value={formData.firstName}/>
                                        {/*<small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>*/}
                                        
                                        {this.renderFormError("first_name")}
                                        
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <input type="text" placeholder="Last Name" className="form-control shadow-none rounded-8"  name="last_name" onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} value={formData.lastName}/>
                                        {/*<small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>*/}
                                        
                                        {this.renderFormError("last_name")}
                                        
                                    </div>
                                </div>
                                <div className="col-4 pr-0">
                                    <div className="form-group">
                                        <select className="form-control shadow-none px-1 rounded-8" name="code" onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} value={formData.code}>
                                            <option value="">Select Code</option>
                                            {telNumber.map((list, index) => (
                                                <option value={list.dial_code} key={index}>{list.code} {list.dial_code}</option>
                                            ))}

                                        </select>
                                        {/*<small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>*/}
                                        {this.renderFormError("code")}
                                        
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="form-group">
                                        <input type="number" placeholder="Phone Number" className="form-control shadow-none rounded-8" name="phone" onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} value={formData.phone}/>
                                        {/*<small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>*/}
                                        {this.renderFormError("phone")}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <p><small>We will send you a text with a verification code. Message and data rates may apply.</small></p>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <input type="text" placeholder="Email" className="form-control shadow-none rounded-8"  name="email" onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} value={formData.email}/>
                                        {/*<small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>*/}
                                        {this.renderFormError("email")}
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group">
                                        <p className="font-weight-bold mb-2">Enter credit card information</p>
                                        <div className="d-flex border rounded-8 justify-content-between overflow-hidden">
                                            <input className="border-0 shadow-none rounded-0   py-2  px-2  h-auto form-control" style={{ fontSize: '10px', width: '150px' }} maxLength="16" type="text" placeholder="Credit Card Number "   name="creditCard" onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} value={formData.creditCard}/>
                                            
                                            {/*<input className="border-0 shadow-none rounded-0  py-2  px--2 h-auto form-control" style={{ fontSize: '10px', width: '100px' }} type="text" data-date-format="MMMM YYYY" placeholder="MM/YY" name="date" onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} value={formData.date}/>*/}
                                            
                                            <DatePicker
                                                className={"border-0 shadow-none rounded-0  py-2  px--2 h-auto form-control register-datepicket"}
                                                minDate={new Date()}
                                                dateFormat={"MM/yyyy"}
                                                placeholderText="MM/YY"
                                                selected={formData.date}
                                                onChange={this.selectDate.bind(this)}
                                                onFocus={this.onFocus.bind(this)}
                                                name="date"
                                            />

                                            <input className="border-0 shadow-none rounded-0  py-2  px--2 h-auto form-control" style={{ fontSize: '10px', width: '100px' }} type="text" placeholder="CVV"  name="cvc" onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} value={formData.cvc}/>
                                            {/* <input className="border-0 shadow-none rounded-0  py-2  px--2 h-auto form-control" style={{ fontSize: '10px' }} type="number" placeholder="Postal code" /> */}
                                        </div>
                                        {this.renderFormError("card_error")}
                                        {/*<small className="form-text text-muted d-none">We'll never share your email with anyone else.</small>*/}
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group form-check">
                                        <input type="checkbox" name="agree" className="form-check-input" id="exampleCheck1" onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} />
                                        <label className="form-check-label" htmlFor="exampleCheck1">I agree to the Settle Technologies <a href="">Terms</a> and <a href="">Conditions</a> </label>
                                        {this.renderFormError("agree")}
                                    </div>
                                </div>

                                <div className="col-md-12 text-center">
                                    <button className="btn btn-primary btn-sm rounded-8 px-4">Create</button>
                                </div>

                            </div>
                        </form>
                    </div>
                    : null
                }

                {(this.state.isOtpOpen === true) ? <VerifyMobileNumber mobileno={this.state.formData.code+this.state.formData.phone} /> : null}

            </>
        )
    }
}
