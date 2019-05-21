import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import HomepageHeading from "./homePageHeading";
import "../css/LandingPage.css";

import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
} from "semantic-ui-react";

class MobileContainer extends Component {
  state = {
    sidebarOpened: false
  };

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: !this.sidebarOpened });

  logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("accountType");
    localStorage.removeItem("username");
    this.handleSidebarHide()
    this.props.history.push("/");
  };

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <NavLink to="/users">
            <Menu.Item as="a">Users</Menu.Item>
          </NavLink>
          <NavLink to="/settings">
            <Menu.Item as="a">Settings</Menu.Item>
          </NavLink>        
            <Menu.Item as="a" onClick={this.logOut}>Logout</Menu.Item>
         
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
               {localStorage.getItem("token") ? (<Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item> ):(null )}

               { localStorage.getItem("token") ? (null ):(<Menu.Item position="right">
                  <NavLink to="/login">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                  </NavLink>
                  <NavLink to="/register">
                    {" "}
                    <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </NavLink>
                </Menu.Item>)}
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

export default withRouter(MobileContainer);
