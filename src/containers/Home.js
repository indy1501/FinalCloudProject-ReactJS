import React, { Component } from "react";
import "./Home.css";
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>StorePot</h1>
          <p>One stop storage solution</p>
          <Link to="/UserEventView">User Page for Event Booking</Link>
        </div>
      </div>
    );
  }
}

export default Home;