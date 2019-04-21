import PropTypes from "prop-types";
import React from "react";
import { NavLink} from "react-router-dom";
import "../css/LandingPage.css";

import {
  Button,
  Container, 
  Header,
  Icon,
} from "semantic-ui-react";

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="FamilyLife"
      inverted
      style={{
        fontSize: mobile ? "2em" : "6em",
        fontWeight: "bold",
        marginBottom: -19,
        marginTop: mobile ? "1.5em" : "2em"
      }}
    />
    <Header
      as="h2"
      content="The best way to keep your family organized and unified!"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <NavLink to="login">
      <Button primary size="huge">
        Get Organized!
        <Icon name="right arrow" />
      </Button>{" "}
    </NavLink>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

export default HomepageHeading;
