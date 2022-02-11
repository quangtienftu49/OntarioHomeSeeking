import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <div className="logo-container">
              <i class="fas fa-home"></i>
              <div className="home-listing">Home Listing</div>
            </div>
          </div>
          <div className="center-content"></div>
          <div className="right-content">
            <button className="login-btn">Login</button>
            <button className="post-for-free">Post for Free</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.admin.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
