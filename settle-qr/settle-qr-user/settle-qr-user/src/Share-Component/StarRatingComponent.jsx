import React, { Component } from "react";
import StarRatings from "react-star-ratings";

export default class StarRatingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
    };
  }
  changeRating(newRating) {
    this.setState({
      rating: newRating,
    });
  }
  componentDidMount() {}
  render() {
    return (
      <>
        <StarRatings
          rating={this.state.rating}
          starRatedColor="#FFC107"
          starHoverColor="#FFC107"
          changeRating={this.changeRating.bind(this)}
          numberOfStars={5}
          name="rating"
          starSpacing="12px"
          starDimension="22px"
        />
      </>
    );
  }
}
