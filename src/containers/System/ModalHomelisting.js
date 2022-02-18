import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash"; //help check {} empty or not
import "./ModalHomelisting.scss";

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
    };
  }

  //show current homelisting data in modal
  componentDidMount() {
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
    console.log("check props from homepage: ", this.props);
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
        >
          The home listing detail
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
                Address: {this.state.address}, {this.state.city}
              </div>

              <div className="price">{this.state.price}</div>
              <div className="description">{this.state.description}</div>
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
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalHomelisting);
