import React, { Component } from "react";
import { connect } from "react-redux";
import "./Homepage.scss";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  returnHome = () => {
    if (this.props.history) {
      this.props.history.push(`/homepage`);
    }
  };

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
              <div className="post-for-free">Post for Free</div>
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

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
// );

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
