import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const LandingPage = ({ history }) => {
  return (
    <div className="navbar">
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
        <Menu.Menu position="right">
            <Button primary onClick={() => history.push("/login")}>
              Login
            </Button>
            <Button primary onClick={() => history.push("/register")}>
              Register
            </Button>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default LandingPage;
