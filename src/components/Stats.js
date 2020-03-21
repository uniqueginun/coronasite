import React, { Component } from "react";
import axios from "axios";
import { Dropdown } from "semantic-ui-react";
axios.defaults.baseURL = "https://covid19.mathdro.id/";

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      loading: true,
      selectedCountry: null,
      confirmed: null,
      recovered: null,
      deaths: null
    };
  }

  async componentDidMount() {
    const { data } = await axios.get("api/countries");
    this.setState({ countries: this.objToArr(data.countries), loading: false });
  }

  objToArr = obj => {
    const countriesArray = Object.keys(obj).map(i => {
      let cntr = {};
      cntr["key"] = i;
      cntr["value"] = obj[i];
      cntr["text"] = i;
      return cntr;
    });
    countriesArray.unshift({ key: "all", value: "all", text: "World wide" });
    return countriesArray;
  };

  countrySelected = async (e, select) => {
    this.setState({ loading: true });
    let url = select.value;
    const uri = url === `all` ? `api` : `api/countries/${url}`;
    const cntr = this.state.countries.find(item => item.value === url);
    try {
      const response = await axios.get(uri);
      this.setState(prevState => {
        return {
          ...prevState,
          confirmed: response.data.confirmed.value,
          recovered: response.data.recovered.value,
          deaths: response.data.deaths.value,
          selectedCountry: cntr.text
        };
      });
    } catch (error) {
      console.log(error.response.data);
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="row justify-content-center well">
        <div className="col-md-6">
          {this.state.loading ? (
            <img alt="" src="https://i.gifer.com/YCZH.gif" />
          ) : (
            <div className="panel panel-info">
              <div className="panel-heading">
                <label>إختر الدولة</label>
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <Dropdown
                    placeholder="Select Country"
                    fluid
                    search
                    selection
                    options={this.state.countries}
                    onChange={this.countrySelected}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {this.state.selectedCountry ? (
          <div className="col-md-6">
            <div className="panel panel-info">
              <div className="panel-heading">
                <label>{this.state.selectedCountry}</label>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  <li role="presentation" className="list-group-item active">
                    المصابين
                    <span className="badge">{this.state.confirmed}</span>
                  </li>
                  <li role="presentation" className="list-group-item active">
                    المتعافين
                    <span className="badge">{this.state.recovered}</span>
                  </li>
                  <li className="list-group-item active">
                    الوفيات <span className="badge">{this.state.deaths}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
