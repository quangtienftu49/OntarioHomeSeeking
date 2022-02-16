import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageHomelisting.scss";
import * as actions from "../../../store/actions";

class TableManageHomelisting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homelistingRedux: [],
    };
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

  handleDeleteUser = (user) => {
    // this.props.deleteAUserRedux(user.id);
  };

  handleEditUser = (user) => {
    // console.log("check edit user ", user);
    this.props.handleEditUserFromParent(user);
  };

  render() {
    // console.log("check all homelistings: ", this.props.allHomelistings);
    console.log("check state: ", this.state.homelistingRedux);

    let arrHomelistings = this.state.homelistingRedux;

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
            {arrHomelistings &&
              arrHomelistings.length > 0 &&
              arrHomelistings.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.address}</td>
                    <td>{item.city}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{formatter.format(item.price)}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => {
                          this.handleEditUser(item);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          this.handleDeleteUser(item);
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allHomelistings: state.admin.allHomelistings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllHomelistings: () => dispatch(actions.fetchAllHomelistings()),
    // deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageHomelisting);
