import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function Details() {
  let { itemDate } = useParams();
  const [dayData, setDayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDate = async () => {
      setError("");
      try {
        let target = formatDate(itemDate);
        const { data } = await Axios.get(
          `https://covid19.mathdro.id/api/daily/${target}`
        );
        setDayData(data);
      } catch (error) {
        setError("حدثت مشكلة أثناء عملية جلب البيانات من المصدر, حاول مجددا");
      }
      setLoading(false);
    };
    loadDate();
  }, [dayData]);

  const formatDate = dateStr => {
    let str = new Date(dateStr);
    return `${str.getDay()}-${str.getDate()}-${str.getFullYear()}`;
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        {loading ? (
          <img
            alt=""
            className="img-responsive"
            src="https://i.gifer.com/YCZH.gif"
          />
        ) : (
          <div className="well">
            <h3>تفاصيل الحالات في تاريخ {itemDate}</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>المدينة</th>
                    <th>الدولة</th>
                    <th>الإصابات</th>
                    <th>المتعافين</th>
                    <th>الوفيات</th>
                  </tr>
                </thead>
                <tbody>
                  {error ? (
                    <tr>
                      <td colSpan="5">{error}</td>
                    </tr>
                  ) : (
                    dayData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.provinceState}</td>
                        <td>{item.countryRegion}</td>
                        <td>{item.confirmed}</td>
                        <td>{item.recovered}</td>
                        <td>{item.deaths}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
