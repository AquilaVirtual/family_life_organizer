import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import Calendar from "react-calendar";

import Navbar from "../navbar/Navbar";
import SiteHeader from "../header/SiteHeader";

import "./Calendar.css";

const CalendarPage = () => {
  return (
    <Segment
      style={{
        textAlign: "center",
        border: "none",
        boxShadow: "0px 0px 0px",
        height: "100vh",
        padding: "0px 0px"
      }}
    >
      <SiteHeader name="Calendar" />
      <Button
        primary
        icon="add"
        content="Activity"
        onClick={() => this.handleModalToggle("Add")}
      />

      <Calendar />

      <Navbar />
    </Segment>
  );
};

export default CalendarPage;
