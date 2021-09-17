import React, { Component } from 'react'
import HeaderComponent from '../Share-Component/HeaderComponent'
import OrderHistory from '../Share-Component/OrderHistory'

export default class OrderHistoryPage extends Component {
    render() {
        return (
            <>
                <HeaderComponent />
                <div className="p-3">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((list, index) => (
                        <div className="mb-5">
                            <OrderHistory />
                        </div>
                    ))}
                </div>
            </>
        )
    }
}
