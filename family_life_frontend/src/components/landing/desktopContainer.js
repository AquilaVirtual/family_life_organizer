import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import HomepageHeading from "./homePageHeading";
import "../css/LandingPage.css";

import {
  Button,
  Container,
  Dropdown,
  Menu,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("accountType");
    localStorage.removeItem("username");
    window.location.reload();

    this.props.history.push("/");
  };

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{
              minHeight: 700,
              padding: "1em 0em",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundImage: `linear-gradient(to right, rgba(169,169,169 ,.7 ), rgba(169,169,169 , .7) ),url(https://images.unsplash.com/photo-1529008922463-fd89b925364e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80})`
            }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
              style={{ border: "none" }}
            >
              <Container className="header-container">
                <Menu.Item as="a" active>
                  FamilyLife
                </Menu.Item>
                <Menu.Item position="right">
                  {localStorage.getItem("token") &&
                  localStorage.getItem("name") ? (
                    <Menu className="menu" compact>
                      {" "}
                      <Dropdown
                        text={`${localStorage.getItem("name").split(" ")[0]}`}
                      >
                        <Dropdown.Menu>
                          <Dropdown.Item
                            text="Users"
                            onClick={() => {
                              this.props.history.push("/users");
                            }}
                          />
                          <Dropdown.Item text="Settings" onClick={() => {
                              this.props.history.push("/settings");
                            }} />
                          <Dropdown.Item text="Logout" onClick={this.logOut} />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu>
                  ) : (
                    <div>
                      <NavLink to="/login">
                        {" "}
                        <Button as="div" inverted={!fixed}>
                          Log In
                        </Button>
                      </NavLink>
                      <NavLink to="/register">
                        {" "}
                        <Button
                          as="div"
                          inverted={!fixed}
                          primary={fixed}
                          style={{ marginLeft: "0.5em" }}
                        >
                          Sign Up
                        </Button>
                      </NavLink>
                    </div>
                  )}
                  {/* <div className="dropdown-menu">
                    <ul>
                      <li
                        onClick={() => {
                          this.props.history.push("/users");
                        }}
                      >
                        users
                      </li>
                      <li>settings</li>
                      <li onClick={this.logOut}>logout</li>
                    </ul>
                  </div> */}
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

export default withRouter(DesktopContainer);

DesktopContainer.propTypes = {
  children: PropTypes.node
};
