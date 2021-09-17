import React, { Component } from 'react'
import ImagePath from '../assets/ImagePath'

export default class OrderHistory extends Component {
    render() {
        return (
            <div>
                <figure className="d-block">
                    <img src={ImagePath.img3} className="w-100 d-block" alt="" />
                </figure>
                <h6 className="font-weight-bold text-dark1 mb-0">Sushi House</h6>
                <p className="font-weight-bold text-dark2 mb-0"><small>May 21, 2020 at 19:30</small></p>
                <p className="font-weight-bold text-dark2 mb-0"><small>Order #00001</small></p>
                <div className="table-responsive py-4">
                    <table className="table   font-weight-bold text-dark1  ">
                        <tbody>
                            {[0, 1, 2, 3, 4,].map((list, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>Poke Bowl</td>
                                    <td>&#160;&#160;&#160;</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total</td>
                                <td colSpan="2" className="text-right">$ 23.80</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary rounded-8 shadow-none"
                        onClick={() => window.location.href = '/receipt'}
                    >View Receipt</button>
                </div>
            </div>
        )
    }
}
