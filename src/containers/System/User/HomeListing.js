import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./HomeListing.scss";
// import Lightbox from "react-image-lightbox";
// import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
// import TableManageUser from "./TableManageUser";

class HomeListing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnChangeImage = () => {};

  openPreviewImage = () => {};

  render() {
    return (
      <div className="user-redux-container">
        <div className="title">Create a home listing</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-6 mt-3">
                <label>Address</label>
                <input className="form-control" type="text"></input>
              </div>
              <div className="col-3 mt-3">
                <label>City</label>
                <select className="form-control">
                  <option selected>Choose...</option>
                  <option>....</option>
                </select>
              </div>
              <div className="col-3 mt-3">
                <label>Province</label>
                <input className="form-control" type="text"></input>
              </div>
              <div className="col-4 mt-3">
                <label>Phone Number</label>
                <input className="form-control" type="tel"></input>
              </div>
              <div className="col-4 mt-3">
                <label>Price</label>
                <input className="form-control" type="text"></input>
              </div>
              <div className="col-6 mt-3">
                <label>Description</label>
                <textarea className="form-control" rows="6"></textarea>
              </div>
              <div className="col-6 mt-3">
                <label>Image</label>
                <div className="preview-img-container">
                  <input
                    hidden
                    id="previewImg"
                    type="file"
                    onChange={(e) => {
                      this.handleOnChangeImage(e);
                    }}
                  ></input>
                  <label className="label-upload" htmlFor="previewImg">
                    Upload <i className="fas fa-cloud-upload-alt"></i>
                  </label>
                  <div
                    className="preview-image"
                    // style={{
                    //   backgroundImage: `url(${this.state.previewImgUrl})`,
                    // }}
                    onClick={() => {
                      this.openPreviewImage();
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <button className="btn btn-primary">Save</button>
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
    // language: state.app.language,
    // genderRedux: state.admin.genders,
    // titleRedux: state.admin.titles,
    // roleRedux: state.admin.roles,
    // isLoadingGender: state.admin.isLoadingGender,
    // listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getGenderStart: () => dispatch(actions.fetchGenderStart()),
    // getTitleStart: () => dispatch(actions.fetchTitleStart()),
    // getRoleStart: () => dispatch(actions.fetchRoleStart()),
    // createNewUser: (data) => dispatch(actions.createNewUser(data)),
    // fetchHomeListing: () => dispatch(actions.fetchAllUsersStart()),
    // editAHomeListing: (data) => dispatch(actions.editAUser(data)),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    // dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeListing);
