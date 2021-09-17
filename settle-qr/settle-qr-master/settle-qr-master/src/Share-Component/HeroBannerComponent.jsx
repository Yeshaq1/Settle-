import React, { Component } from 'react'
import ImagePath from '../assets/ImagePath'
import moment from "moment"
export default class HeroBannerComponent extends Component {
    render() {

        var restaurantInfo = this.props.restaurantInfo;

        var currentDate = moment().format('ll');
        var backgroundImage = restaurantInfo.restaurant_photos !== undefined && restaurantInfo.restaurant_photos.length > 0 ? restaurantInfo.restaurant_photos[0] : ImagePath.img1; 
        return (
            <>
                {/*<div className={'heroBanner text-center'} style={{ backgroundImage: `url(${ImagePath.img1})` }}>*/}
                <div className={'heroBanner text-center'} style={{ backgroundImage: `url(${backgroundImage})` }}>
                    {/*<h5 className={'text-white mb-4'}>Burger Joint A </h5>
                    <div className={'d-flex justify-content-around'}>
                        <div className={'text-white'}>Table 50</div>
                        <div className={'text-white'}>6 Jun 2020</div>
                    </div>*/}
                    {restaurantInfo.restaurant_name !== "" &&
                        <h5 className={'text-white mb-4'}>{restaurantInfo.restaurant_name}</h5>
                    }
                    <div className={'d-flex justify-content-around'}>
                        {restaurantInfo.table_name !== "" &&
                            <div className={'text-white'}>{restaurantInfo.table_name}</div>
                        }
                        <div className={'text-white'}>{currentDate}</div>
                    </div>
                </div>
            </>
        )
    }
}
