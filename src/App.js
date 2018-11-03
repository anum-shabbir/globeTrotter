import React, { Component } from "react";
import "./App.css";
import axios from 'axios'
import { Link } from "react-router-dom";
import Navbar from "./components/layout/NavBar.js";
import ChatBox from "./components/ChatBox";
import Register from "./components/auth/Register.js";
import Login from "./components/auth/Login.js";

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }

        <header class="header">
          <div class="header__logo-box">
            {/* <img src="img/logo-white.png" alt="Logo" class="header__logo" /> */}
          </div>
          <div class="header__text-box">
            <h1 class="heading-primary">
              <span class="heading-primary--main">Travel</span>
              <span class="heading-primary--sub"> is where life happens</span>
            </h1>
            <Link
              onClick={this.toggleFragment}
              className="btn btn--white btn--animated"
              to={"/app/login"}
              render={() =>
                <Login
                  updateUser={this.updateUser}
                />}
            >
              Login
            </Link>
            <Link
              onClick={this.toggleFragment}
              className="btn btn--white btn--animated"
              to={"/app/register"}
              render={() =>
                <Register/>}
            >
              Register
            </Link>
            <Link
              onClick={this.toggleFragment}
              className="btn btn--white btn--animated"
              to={"/app/chat"}
            >
              Chat
            </Link>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default App;