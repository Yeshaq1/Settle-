import React, { Component } from 'react'

export default class TipsAmount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDollarPercent: 'percent',
            isOpenOtherTip: false,
            tipAmount: 0,
            isOrange: 0
        }


    }

    handle(event) {
        this.setState({ tipAmount: event.target.value })
    }
    render() {
        return (
            <>
                <h5 className="text-dark1 font-weight-bold text-uppercase d-flex justify-content-between align-items-center mb-4">
                    <span>Tip amount</span>
                    <span>${this.state.tipAmount}</span>
                </h5>
                <div className="d-flex justify-content-between">
                    <button
                        className={"btn  btn-lg text-white rounded-8 " + (this.state.isOrange === 1 ? 'btn-primary' : 'btn-dark2')}
                        style={{ width: '94px' }}
                        onClick={() => this.setState({ isOpenOtherTip: false, isOrange: 1 })}
                    >15%</button>
                    <button
                        className={"btn   btn-lg text-white rounded-8 " + (this.state.isOrange === 2 ? 'btn-primary' : 'btn-dark2')}
                        style={{ width: '94px' }}
                        onClick={() => this.setState({ isOpenOtherTip: false, isOrange: 2 })}
                    >18%</button>
                    <button
                        className={"btn  btn-lg text-white rounded-8 " + (this.state.isOpenOtherTip ? 'btn-primary' : 'btn-dark2')}
                        style={{ width: '100px' }}
                        onClick={() => this.setState({ isOpenOtherTip: !this.state.isOpenOtherTip, isOrange: 0 })}
                    >Other</button>
                </div>
                {this.state.isOpenOtherTip === true ?
                    <div className="pt-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex border rounded-8">
                                <button
                                    className={"btn px-4 shadow-none " + (this.state.isDollarPercent === 'percent' ? 'btn-primary' : '')}
                                    onClick={() => this.setState({ isDollarPercent: 'percent' })}
                                >%</button>
                                <button
                                    className={"btn px-4 shadow-none " + (this.state.isDollarPercent === 'dollar' ? 'btn-primary' : '')}
                                    onClick={() => this.setState({ isDollarPercent: 'dollar' })}
                                >$</button>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={this.state.value}
                                    onChange={this.handle.bind(this)}
                                    disabled={(this.state.isDollarPercent === 'percent' ? 'disabled' : '')}
                                    defaultValue="0" className="form-control text-center font-weight-bold h-auto py-2 shadow-none" style={{ width: "70px" }} />
                            </div>
                        </div>
                    </div>

                    : null

                }
            </>
        )
    }
}
