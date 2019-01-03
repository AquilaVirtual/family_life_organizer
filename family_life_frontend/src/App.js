import React, { Component } from "react";
import { Route } from "react-router-dom";

import LandingPage from "./components/landing/LandingPage";
import UserPage from "./components/user/UserPage";
import ActivityPage from "./components/activities/ActivityPage";
import CalendarPage from "./components/calendar/CalendarPage";
import ChorePage from "./components/chores/ChorePage";
import AssignmentPage from "./components/assignments/AssignmentPage";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Navbar from "./components/navbar/Navbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Available routes */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/:path" component={Navbar} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/users"
          render={props => <UserPage {...props} user={{ username: "Dad" }} />}
        />
        <Route exact path="/activities" component={ActivityPage} />
        <Route exact path="/calendar" component={CalendarPage} />
        <Route exact path="/chores" component={ChorePage} />
        <Route exact path="/homeworks" component={AssignmentPage} />
      </div>
    );
  }
}

export default App;
