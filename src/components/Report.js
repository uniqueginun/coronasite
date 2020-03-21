import React, { Component } from "react";
import Axios from "axios";

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  async componentDidMount() {
    const { data } = await Axios.get("https://covid19.mathdro.id/api/daily");
    this.setState({ data, loading: false });
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-12">
          {this.state.loading ? (
            <img
              alt=""
              className="img-responsive"
              src="https://i.gifer.com/YCZH.gif"
            />
          ) : (
            <div className="well">
              <h3>الإحصائيات حسب التاريخ</h3>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>التاريخ</th>
                      <th>الحالات داخل الصين</th>
                      <th>الحالات خارج الصين</th>
                      <th>إجمالي الإصابات</th>
                      <th>إجمالي المتعافين</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map(item => (
                      <tr key={item.reportDateString}>
                        <td>{item.reportDateString || 0}</td>
                        <td>{item.mainlandChina || 0}</td>
                        <td>{item.otherLocations || 0}</td>
                        <td>{item.totalConfirmed || 0}</td>
                        <td>{item.totalRecovered || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
