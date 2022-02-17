import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import "./Homepage.scss";

class HomePage extends Component {
  render() {
    return (
      <>
        <HomeHeader />
        <div className="homepage-container">
          <div className="home-header-banner">
            <div className="title1">LOOKING FOR NEW HOME?</div>
            <div className="title2">
              Thousands of apartments, houses, and condos for sale across
              Ontario
            </div>
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Enter a city" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.admin.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
