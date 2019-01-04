import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const LandingPage = ({ signout }) => {
  return (
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
        <Menu.Item>
          <Button icon="sign-out" content="Sign Out" primary onClick={signout} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default LandingPage;