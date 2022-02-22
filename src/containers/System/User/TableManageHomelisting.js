import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageHomelisting.scss";
import * as actions from "../../../store/actions";

class TableManageHomelisting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homelistingRedux: [],
      currentPage: 1,
      homelistingsPerPage: 2,
    };
    this.handleClickPagination = this.handleClickPagination.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllHomelistings();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allHomelistings !== this.props.allHomelistings) {
      this.setState({
        homelistingRedux: this.props.allHomelistings,
      });
    }
  }

  handleDeleteHomelisting = (homelisting) => {
    // console.log("check homelisting", homelisting);
    this.props.deleteHomelistingAction(homelisting.id);
  };

  handleEditHomelisting = (homelisting) => {
    this.props.handleEditHomelistingFromParent(homelisting);
    // console.log("check edit homelisting ", homelisting);
  };

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

  handleClickPagination(e) {
    this.setState({
      currentPage: Number(e.target.id),
    });
  }

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

  render() {
    // console.log("check all homelistings: ", this.props.allHomelistings);
    // console.log("check state: ", this.state);

    let arrHomelistings = this.state.homelistingRedux;

    let { currentPage, homelistingsPerPage } = this.state;

    // Get current homelistings
    const indexOfLastHomelisting = currentPage * homelistingsPerPage;
    const indexOfFirstHomelisting =
      indexOfLastHomelisting - homelistingsPerPage;
    const currentHomelistings = arrHomelistings.slice(
      indexOfFirstHomelisting,
      indexOfLastHomelisting
    );

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(arrHomelistings.length / homelistingsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    // Create number formatter to currency
    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    return (
      <>
        <table className="TableManageHomelisting">
          <tbody>
            <tr>
              <th>Address</th>
              <th>City</th>
              <th>Phone Number</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            {/* map through data to display on home listing table */}
            {currentHomelistings &&
              currentHomelistings.length > 0 &&
              currentHomelistings.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.address}</td>
                    <td>{this.findCity(item)}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{formatter.format(item.price)}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => {
                          this.handleEditHomelisting(item);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          this.handleDeleteHomelisting(item);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="pagination-number-container">
          {pageNumbers.map((number) => {
            return (
              <div
                key={number}
                id={number}
                onClick={this.handleClickPagination}
                className={
                  currentPage === number
                    ? "pagination-number active"
                    : "pagination-number"
                }
              >
                {number}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allHomelistings: state.admin.allHomelistings,
    allCities: state.admin.allCities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllHomelistings: () => dispatch(actions.fetchAllHomelistings()),
    deleteHomelistingAction: (id) =>
      dispatch(actions.deleteHomelistingAction(id)),
    fetchAllCities: () => dispatch(actions.fetchAllCities()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageHomelisting);
