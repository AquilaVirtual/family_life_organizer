import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import DesktopContainer from "./desktopContainer";
import MobileContainer from "./mobileContainer";
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

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const LandingPage = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={9}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              A must have application for families on the go!
            </Header>
            <List className="landingPage--list" bulleted>
              <List.Item>
                Set up, track and monitor chores and homework
              </List.Item>
              <List.Item>Schedule appointments and activities</List.Item>
              <List.Item>Use from any mobile device or computer</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src="https://images.unsplash.com/photo-1484981184820-2e84ea0af397?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column id="landingPage--getStarted" textAlign="center">
            <NavLink to="/register">
              <Button size="huge">Get Started with a free account!</Button>
            </NavLink>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={9}>
              <Header as="h4" inverted>
                FamilyLife
              </Header>
              <p>Keep yourself and your family organized with ease.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default withRouter(LandingPage);
