import React, { Component } from "react";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import Axios from "axios";

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOneLoading: true,
      firstChartData: null,
      userCountry: null,
      ChartTwoLoading: true,
      userCountryData: null,
      globalStatusLoading: true,
      globalStatusData: null
    };
  }

  async componentDidMount() {
    await this.fetchChartOneData();
    await this.fetchUserCountryData();
    await this.fetchGlobalStatus();
  }

  fetchGlobalStatus = async () => {
    const { data } = await Axios.get(
      "https://covidapi.info/api/v1/global/count"
    );
    console.log();
    let globalStatusData = {};

    globalStatusData["labels"] = Object.keys(data.result);

    let confirmed = {};
    let deaths = {};
    let recovered = {};

    confirmed["label"] = "Confirmed";
    deaths["label"] = "Deaths";
    recovered["label"] = "Recovered";

    confirmed["borderColor"] = "#3e95cd";
    deaths["borderColor"] = "#8e5ea2";
    recovered["borderColor"] = "#3cba9f";

    confirmed["fill"] = false;
    deaths["fill"] = false;
    recovered["fill"] = false;

    confirmed["data"] = Object.keys(data.result).map(date => {
      return data.result[date]["confirmed"];
    });

    deaths["data"] = Object.keys(data.result).map(date => {
      return data.result[date]["deaths"];
    });

    recovered["data"] = Object.keys(data.result).map(date => {
      return data.result[date]["recovered"];
    });

    globalStatusData["datasets"] = [confirmed, deaths, recovered];

    this.setState({ globalStatusData, globalStatusLoading: false });
  };

  fetchUserCountryData = async () => {
    const { data } = await Axios.get("http://ip-api.com/json");
    const response = await Axios.get(
      `https://restcountries.eu/rest/v2/alpha/${data.countryCode}`
    );
    this.setState({ userCountry: response.data });
    const countryData = await Axios.get(
      `https://covidapi.info/api/v1/country/${response.data.alpha3Code}/latest`
    );
    let userCountryData = {};
    userCountryData["labels"] = Object.keys(
      Object.values(countryData.data.result)[0]
    );
    userCountryData["datasets"] = [
      {
        label: "Latest record for " + response.data.name,
        data: Object.values(Object.values(countryData.data.result)[0]),
        backgroundColor: ["#ffec43", "#E91E63", "#03A9F4"],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)"
        ],
        borderWidth: 1
      }
    ];
    this.setState({ userCountryData, ChartTwoLoading: false });
  };

  fetchChartOneData = async () => {
    const { data } = await Axios.get("https://covidapi.info/api/v1/global");
    let firstChartData = this.handleChartData(data);
    this.setState({ firstChartData, chartOneLoading: false });
  };

  handleChartData = data => {
    let desiredFormat = {};
    desiredFormat["labels"] = Object.keys(data.result);
    desiredFormat["datasets"] = [
      {
        label: "Latest Global Count",
        data: Object.values(data.result),
        backgroundColor: ["#ffec43", "#E91E63", "#03A9F4"],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)"
        ],
        borderWidth: 1
      }
    ];
    return desiredFormat;
  };

  options = {
    responsive: true
  };

  render() {
    return (
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="panel">
              <div className="panel-heading">Latest Global Count</div>
              <div className="panel-body">
                {this.state.chartOneLoading ? (
                  <img
                    alt=""
                    className="img-responsive"
                    src="https://i.gifer.com/YCZH.gif"
                  />
                ) : (
                  <Doughnut
                    data={this.state.firstChartData}
                    options={this.options}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="panel">
              <div className="panel-heading">
                Latest record for{" "}
                {this.state.userCountry && this.state.userCountry.name}
              </div>
              <div className="panel-body">
                {this.state.ChartTwoLoading ? (
                  <img
                    alt=""
                    className="img-responsive"
                    src="https://i.gifer.com/YCZH.gif"
                  />
                ) : (
                  <Doughnut
                    data={this.state.userCountryData}
                    options={this.options}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="panel">
              <div className="panel-heading">Global Status By Data</div>
              <div className="panel-body">
                {this.state.globalStatusLoading ? (
                  <img
                    alt=""
                    className="img-responsive"
                    src="https://i.gifer.com/YCZH.gif"
                  />
                ) : (
                  <Line
                    data={this.state.globalStatusData}
                    options={this.options}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
