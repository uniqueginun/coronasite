import React from "react";
import "./App.css";
import TopNavigation from "./components/TopNavigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Stats from "./components/Stats";
import Home from "./components/Home";
import Report from "./components/Report";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <Router>
        <TopNavigation />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/reports">
            <Report />
          </Route>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
