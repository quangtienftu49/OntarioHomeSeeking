import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { CommonUtils, CRUD_ACTIONS } from "../../../utils";
import * as actions from "../../../store/actions";
import "./HomeListingRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
// import TableManageUser from "./TableManageUser";
import Select from "react-select";
import TableManageHomelisting from "./TableManageHomelisting";
import HomeHeader from "../../HomePage/HomeHeader";

class HomeListingRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      address: "",
      description: "",
      phoneNumber: "",
      userId: "",
      province: "",
      selectedOption: "",
      allCities: [],
      hasOldData: false,
      previewImgUrl: "",
      image: "",
      isOpen: false,
      action: "",
      homelistingEditId: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllCities();
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.city;
        object.value = item.id;

        result.push(object);
      });
    }

    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allCities !== this.props.allCities) {
      let dataSelect = this.buildDataInputSelect(this.props.allCities);
      this.setState({
        allCities: dataSelect,
      });
    }

    //empty all inputs after saving data
    if (prevProps.allHomelistings !== this.props.allHomelistings) {
      let dataSelect = this.buildDataInputSelect(this.props.allCities);

      this.setState({
        price: "",
        address: "",
        description: "",
        phoneNumber: "",
        userId: "",
        province: "",
        allCities: dataSelect && dataSelect.length > 0 ? dataSelect : [],
        selectedOption: "",
        image: "",
        previewImgUrl: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  handleSaveHomelisting = () => {
    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      this.props.saveHomelisting({
        price: this.state.price,
        address: this.state.address,
        description: this.state.description,
        phoneNumber: this.state.phoneNumber,
        province: this.state.province,
        userId: this.state.userId,
        cityId: this.state.selectedOption.value,
        image: this.state.image,
      });
    } else if (action === CRUD_ACTIONS.EDIT) {
      this.props.editAHomelisting({
        id: this.state.homelistingEditId,
        price: this.state.price,
        address: this.state.address,
        description: this.state.description,
        phoneNumber: this.state.phoneNumber,
        province: this.state.province,
        userId: this.state.userId,
        cityId: this.state.selectedOption.value,
        image: this.state.image,
      });
    }

    // this.props.fetchAllHomelistings();
  };

  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    // console.log("check file 0", file);
    //create URL to preview image
    if (file) {
      //convert file image to base64
      let base64 = await CommonUtils.getBase64(file);
      // console.log("check file base64", base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        image: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgUrl) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
  };

  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;

    this.setState({
      ...copyState,
    });
  };

  handleEditHomelistingFromParent = (homelisting) => {
    // console.log("check edit user from parent", homelisting);

    //parse buffer image to base64
    let imageBase64 = "";
    if (homelisting.image) {
      imageBase64 = new Buffer(homelisting.image, "base64").toString("binary");
    }

    let allCities = this.buildDataInputSelect(this.props.allCities);
    let editSelectedOption = allCities.find(
      (item) => item.value === homelisting.cityId
    );

    //auto fill inputs when clicking edit
    this.setState({
      price: homelisting.price,
      address: homelisting.address,
      description: homelisting.description,
      phoneNumber: homelisting.phoneNumber,
      province: homelisting.province,
      selectedOption: editSelectedOption,
      image: "",
      previewImgUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      homelistingEditId: homelisting.id,
    });
  };

  render() {
    // console.log("check state", this.state);

    let { price, address, description, phoneNumber, province } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="user-redux-container">
          <div className="title">Create a home listing</div>
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div className="col-6 mt-3">
                  <label>Address</label>
                  <input
                    type="address"
                    className="form-control"
                    value={address}
                    onChange={(e) => {
                      this.onChangeInput(e, "address");
                    }}
                  ></input>
                </div>
                <div className="col-3 mt-3">
                  <label>City</label>
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleChangeSelect}
                    options={this.state.allCities}
                  />
                </div>
                <div className="col-3 mt-3">
                  <label>Province</label>
                  <input
                    type="province"
                    className="form-control"
                    value={province}
                    onChange={(e) => {
                      this.onChangeInput(e, "province");
                    }}
                  ></input>
                </div>
                <div className="col-4 mt-3">
                  <label>Phone Number</label>
                  <input
                    type="phoneNumber"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => {
                      this.onChangeInput(e, "phoneNumber");
                    }}
                  ></input>
                </div>
                <div className="col-4 mt-3">
                  <label>Price</label>
                  <input
                    type="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => {
                      this.onChangeInput(e, "price");
                    }}
                  ></input>
                </div>
                <div className="col-6 mt-3">
                  <label>Description</label>
                  <textarea
                    rows="6"
                    type="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => {
                      this.onChangeInput(e, "description");
                    }}
                  ></textarea>
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
                      style={{
                        backgroundImage: `url(${this.state.previewImgUrl})`,
                      }}
                      onClick={() => {
                        this.openPreviewImage();
                      }}
                    ></div>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <button
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={() => {
                      this.handleSaveHomelisting();
                    }}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT
                      ? "Save changes"
                      : "Create"}
                  </button>
                </div>
                <div className="col-12 my-5">
                  <TableManageHomelisting
                    handleEditHomelistingFromParent={
                      this.handleEditHomelistingFromParent
                    }
                    action={this.state.action}
                  />
                </div>
              </div>
            </div>
          </div>
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgUrl}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allCities: state.admin.allCities,
    allHomelistings: state.admin.allHomelistings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCities: () => dispatch(actions.fetchAllCities()),
    saveHomelisting: (data) => dispatch(actions.saveHomelistingAction(data)),
    fetchAllHomelistings: () => dispatch(actions.fetchAllHomelistings()),
    editAHomelisting: (data) => dispatch(actions.editAHomelisting(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeListingRedux);
