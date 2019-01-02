import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import LandingPage from "./components/landing/LandingPage";
import UserPage from "./components/user/UserPage";
import ActivityPage from "./components/activities/ActivityPage";
import CalendarPage from "./components/calendar/CalendarPage";
import ChorePage from "./components/chores/ChorePage";
import AssignmentPage from "./components/assignments/AssignmentPage";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Temporary links */}
        <Menu>
          <Menu.Item>
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/users">Users</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/activities">Activities</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/calendar">Calendar</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/chores">Chores</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/homeworks">Homeworks</NavLink>
          </Menu.Item>
        </Menu>

        {/* Available routes */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/users" component={UserPage} />
        <Route exact path="/activities" component={ActivityPage} />
        <Route exact path="/calendar" component={CalendarPage} />
        <Route exact path="/chores" component={ChorePage} />
        <Route exact path="/homeworks" component={AssignmentPage} />
      </div>
    );
  }
}

export default App;
