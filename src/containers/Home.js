import React, { Component } from "react";
import "./Home.css";
import { Row, Col, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
class Home extends Component {
  render() {
    return (

      <div>
        <Col xl={{ span: 6, offset: 3 }}>
          <Row style={{ display: "block" }}>
            <Alert variant="success" style={{ marginTop: "200px" }} className="text-center">
              <Alert.Heading>Welcome to the EventSync App</Alert.Heading>
            </Alert>
          </Row>
        </Col>
        <Link to="/UserEventView">User Page for Event Booking</Link>
        <Link to="/AdminView">Admin Page for Event Booking</Link>
      </div>
      // <div className="Home">
      //   <div className="lander">
      //     <h1>StorePot</h1>
      //     <p>One stop storage solution</p>
      //     <Link to="/Redirect">User Page for Event Booking</Link>
      //   </div>
      // </div> 


    );
  }
}

export default Home;