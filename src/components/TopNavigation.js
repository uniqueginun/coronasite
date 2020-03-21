import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function TopNavigation() {
  const location = useLocation();

  const isActive = uri => {
    return location.pathname === uri ? "active" : "inactive";
  };

  const links = [
    { id: 1, path: "/", name: "الرئيسية" },
    { id: 3, path: "/stats", name: "إحصائيات" },
    { id: 2, path: "/reports", name: "تقارير" },
    { id: 4, path: "/about", name: "أسئلة وأجوبة" }
  ];

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            <img
              alt="Brand"
              width="38"
              height="38"
              src="./assets/imgs/virus.png"
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
          </ul>
        </div>
      </div>
    </nav>
  );
}
