import React, { Component } from "react";
import { connect } from "react-redux";
import "./Homepage.scss";
import { withRouter } from "react-router";
// import { withRouter } from "react-router-dom";

class HomeHeader extends Component {
  constuctor() {
    this.returnHome = this.returnHome.bind(this);
    this.goToHomelisting = this.goToHomelisting.bind(this);
  }

  returnHome() {
    let path = `/`;
    this.props.history.push(path);
  }

  goToHomelisting() {
    let path = `/homelistings`;
    this.props.history.push(path);
  }

  render() {
    console.log("check props", this.props);
    return (
      <div className="header">
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i class="fas fa-home"></i>
              <div
                className="logo-container"
                onClick={() => {
                  this.returnHome();
                }}
              >
                Ontario Home Seeking
              </div>
              {/* <div className="home-listing">Home Listing</div> */}
            </div>
            {/* <div className="center-content"></div> */}
            <div className="right-content">
              <button className="login-btn">Login</button>
              <div
                className="post-for-free"
                onClick={() => {
                  this.goToHomelisting();
                }}
              >
                Post for Free
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);

// export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
