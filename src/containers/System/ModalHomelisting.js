import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash"; //help check {} empty or not
import "./ModalHomelisting.scss";
import * as actions from "../../store/actions";

class ModalHomelisting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      address: "",
      description: "",
      phoneNumber: "",
      image: "",
      city: "",
      allCities: [],
    };
  }

  //show current homelisting data in modal
  componentDidMount() {
    this.props.fetchAllCities();

    let homelisting = this.props.currentHomelisting;
    if (homelisting && !_.isEmpty(homelisting)) {
      this.setState({
        price: homelisting.price,
        address: homelisting.address,
        description: homelisting.description,
        phoneNumber: homelisting.phoneNumber,
        image: homelisting.image,
        city: this.findCity(homelisting),
      });
    }
    // console.log("didmount edit modal: ", this.props.currentUser);
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

  //function to return city when getting cityId
  findCity = (item) => {
    let allCities = this.buildDataInputSelect(this.props.allCities);
    let city = allCities.find((city) => city.value === item.cityId);
    let resultCity = "";
    if (city && city.label) {
      resultCity = city.label;
    }
    return resultCity;
  };

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    console.log("check props from homepage: ", this.state);

    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-homelisting-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
          className="modal-title"
        >
          HOME LISTING DETAIL
        </ModalHeader>
        <ModalBody>
          <div className="modal-homelisting-body">
            <div
              className="image"
              style={{
                backgroundImage: `url(${this.state.image})`,
              }}
            ></div>
            <div className="detail">
              <div className="address">
                <strong>Address:</strong> {this.state.address},{" "}
                {this.state.city}
              </div>

              <div className="price">
                <strong>Price:</strong> {formatter.format(this.state.price)}
              </div>
              <div className="description">
                <strong>Description:</strong> {this.state.description}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
            className="button"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { allCities: state.admin.allCities };
};

const mapDispatchToProps = (dispatch) => {
  return { fetchAllCities: () => dispatch(actions.fetchAllCities()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalHomelisting);
