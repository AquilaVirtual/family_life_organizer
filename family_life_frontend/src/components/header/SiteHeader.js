import React from "react";
import { Button } from "semantic-ui-react";
import moment from "moment";
import { NavLink, withRouter } from "react-router-dom";
import "./Header.css";

const Header = props => {
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("accountType");
    localStorage.removeItem("username");
    window.location.reload();
  };
  return (
    <div className="header--headingContainer">
      <p className="header--time">
        <span>{moment().format("LT")} </span> {moment().format("MMM Do YY")}
      </p>
      <h1 id="header--heading">
        <NavLink to="/">FamilyLife</NavLink> | {props.name}
      </h1>
      <div>
        <NavLink to="/settings">
          {" "}
          <Button size="huge" basic content="Settings" />
        </NavLink>
        <NavLink to="/">
          {" "}
          <Button
            size="huge"
            basic
            content="Sign Out"
            onClick={() => {
              logOut();
            }}
          />
        </NavLink>
      </div>
    </div>
  );
};

export default withRouter(Header);
