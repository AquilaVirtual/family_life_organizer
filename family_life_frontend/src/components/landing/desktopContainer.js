import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import HomepageHeading from "./homePageHeading";
import "./LandingPage.css";

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Dropdown,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";


class DesktopContainer extends Component {
    state = {};
  
    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });
  
    render() {
      const { children } = this.props;
      const { fixed } = this.state;
  
      const options = [
        { key: 1, text: "users", value: 1 },
        { key: 2, text: "settings", value: 2 },
        { key: 3, text: "logout", value: 3 }
      ];
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
                  <Menu.Item position="right" className="menu">
                    {localStorage.getItem("token") &&
                    localStorage.getItem("name") ? (
                      <Menu compact>
                        {" "}
                        <Dropdown
                          style={{ color: "white", backgroundColor: "lightgrey" }}
                          text={`${localStorage.getItem("name").split(" ")[0]}`}
                          simple
                          item
                        />
                      </Menu>
                    ) : (
                      <div>
                        <NavLink to="/login">
                          {" "}
                          <Button as="a" inverted={!fixed}>
                            Log in
                          </Button>
                        </NavLink>
                        <NavLink to="/register">
                          {" "}
                          <Button
                            as="a"
                            inverted={!fixed}
                            primary={fixed}
                            style={{ marginLeft: "0.5em" }}
                          >
                            Sign Up
                          </Button>
                        </NavLink>
                      </div>
                    )}
                    <div className="dropdown-menu">
                      <ul>
                        <li onClick={() => {this.props.history.push("/users")}}>users</li>
                        <li>settings</li>
                        <li>logout</li>
                      </ul>
                    </div>
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