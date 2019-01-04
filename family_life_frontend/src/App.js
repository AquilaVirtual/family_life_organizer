import React, { Component } from "react";
import { Route } from "react-router-dom";

import LandingPage from "./components/landing/LandingPage";
import UserPage from "./components/user/UserPage";
import ActivityPage from "./components/activities/ActivityPage";
import CalendarPage from "./components/calendar/CalendarPage";
import ChorePage from "./components/chores/ChorePage";
import AssignmentPage from "./components/assignments/AssignmentPage";
import Navbar from "./components/navbar/Navbar";
import LoginModal from "./components/modal/LoginModal";

import "./App.css";

class App extends Component {
  state = {
    user: '',
    type: '',
    modal: false,
  }

  componentDidMount() {
    const user = localStorage.getItem('lifelog');
    this.setState({
      user,
      type: user && 'momdad'.includes(user.toLowerCase()) ? 'parent': 'child'
    })
  }

  signin = (email, password) => {
    localStorage.setItem('lifelog', email);
    this.setState({
      user: email,
      modal: false,
      type: 'momdad'.includes(email.toLowerCase()) ? 'parent': 'child'
    })
  }

  signout = () => {
    localStorage.removeItem('lifelog', 'email');
    this.setState({
      user: '',
    })
  }

  toggleModal = () => {
    this.setState(state => ({modal: !state.modal}))
  }

  render() {
    const { user, modal, type } = this.state;

    return (
      <div className="App">
        {
          user &&
          <Navbar currentUser={user}
            toggleModal={this.toggleModal}
            signout={this.signout}
          />
        }
        {/* Available routes */}
        <Route exact path="/" render={props => (
          <LandingPage {...props}
            toggleModal={this.toggleModal}
          />
        )} />
        <Route exact path="/users" render={props => (
          <UserPage {...props}
            currentUser={user}
            toggleModal={this.toggleModal}
            type={type}
          />)} />
        <Route exact path="/activities" render={props => (
          <ActivityPage {...props}
            currentUser={user}
            toggleModal={this.toggleModal}
            type={type}
          />)} />
        <Route exact path="/calendar" render={props => (
          <CalendarPage {...props}
            currentUser={user}
            toggleModal={this.toggleModal}
            type={type}
          />)} />
        <Route exact path="/chores" render={props => (
          <ChorePage {...props}
            currentUser={user}
            toggleModal={this.toggleModal}
            type={type}
          />)} />
        <Route exact path="/homeworks" render={props => (
          <AssignmentPage {...props}
            currentUser={user}
            toggleModal={this.toggleModal}
            type={type}
          />)} />
        <LoginModal
          open={modal}
          signin={this.signin}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}

export default App;
