import React, { useState, useEffect } from "react";
import ReactMapGL, { Popup } from "react-map-gl";
import Axios from "axios";
import Corona from "./Corona";
import moment from "moment";

let TOKEN =
  "pk.eyJ1IjoidW5pcXVlZ2ludW4iLCJhIjoiY2s4YWJsN2N5MDBvcTNkcGl2Mmhqd3lwMyJ9.y53yhmEKazJN_AqBXUnVWQ";
let baseURL = "https://covid19.mathdro.id/api/daily";

let today = moment().format("M-D-Y");
let yesterday = moment(today)
  .subtract(1, "days")
  .format("M-D-Y");

function Map() {
  const [viewport, setViewport] = useState({
    width: "100",
    height: "90vh",
    latitude: 21.389082,
    longitude: 39.85791,
    zoom: 3.4
  });

  const [data, setData] = useState([]);
  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let info = [];
      try {
        info = await grabStats(today);
      } catch (error) {}
      if (!info.length) {
        info = await grabStats(yesterday);
      }
      setData(info);
    };

    fetchData();
  }, []);

  const _displayCity = city => {
    setCity(city);
    setViewport({
      ...viewport,
      longitude: parseInt(city.long),
      latitude: parseInt(city.lat),
      zoom: 6
    });
  };

  const grabStats = async date => {
    let response = await Axios.get(`${baseURL}/${date}`);
    return response.data;
  };

  const _renderCityData = () => {
    return (
      city && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={parseInt(city.long)}
          latitude={parseInt(city.lat)}
          closeOnClick={false}
          onClose={() => setCity(null)}
        >
          <h4>{city.combinedKey}</h4>
          <p>Confirmed: {city.confirmed}</p>
          <p>Recovered: {city.recovered}</p>
          <p>Deaths: {city.deaths}</p>
        </Popup>
      )
    );
  };

  return (
    <ReactMapGL
      mapboxApiAccessToken={TOKEN}
      {...viewport}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/mapbox/dark-v10"
    >
      <Corona data={data} onClick={city => _displayCity(city)} />
      {_renderCityData()}
    </ReactMapGL>
  );
}

export default Map;
