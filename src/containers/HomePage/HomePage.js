import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import "./Homepage.scss";
import Select from "react-select";
import * as actions from "../../store/actions";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCities: [],
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
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
  };

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
            <div className="col-6 search-select">
              <Select
                // className="search-select"
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.allCities}
              />
            </div>
            {/* <div className="search-bar">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Enter a city" />
            </div> */}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allCities: state.admin.allCities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCities: () => dispatch(actions.fetchAllCities()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
