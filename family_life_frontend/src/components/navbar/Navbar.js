import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import './Navbar.css'

const LandingPage = () => {
  return (
    <div className="navbar">
      <div><NavLink className="navbar--btn" to="/users">Users</NavLink></div>
      <div><NavLink className="navbar--btn navbar--btn-activities"  to="/activities">Activities</NavLink></div>
      <div><NavLink className="navbar--btn navbar--btn-calendar"  to="/calendar">Calendar</NavLink></div>
      <div><NavLink className="navbar--btn navbar--btn-chores" to="/chores">Chores</NavLink></div>
      <div><div ><NavLink className="navbar--btn navbar--btn-homework" to="/homeworks">Assignments</NavLink></div></div>
    </div>
  );
};

export default LandingPage;
