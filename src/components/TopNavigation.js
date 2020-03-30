import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function TopNavigation() {
  const location = useLocation();

  const isActive = uri => {
    return location.pathname === uri ? "active" : "inactive";
  };

  const links = [
    { id: 1, path: "/", name: "الرئيسية" },
    { id: 2, path: "/map", name: "الخريطة" },
    { id: 3, path: "/stats", name: "إحصائيات" },
    { id: 4, path: "/reports", name: "تقارير" },
    { id: 5, path: "/about", name: "أسئلة وأجوبة" }
  ];

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">
            <img
              alt="Brand"
              width="38"
              height="38"
              src="../assets/imgs/virus.png"
            />
          </a>
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav">
            {links.map(item => (
              <li key={item.id} className={isActive(item.path)}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
            <li key="5">
              <a
                alt="test"
                href="https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40uniqueginun/coronative-app-a9ed5b2d686743fa9acb6c833168d5c5-signed.apk"
              >
                حمل تطبيق الجوال
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
