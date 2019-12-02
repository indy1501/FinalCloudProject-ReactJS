import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import Routes from "./Routes";
//import "./App.css";
import cognitoUtils from './Utilities/CognitoDetails'

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isUserLoggedIn: false
    };
  }
  
  userHasLoggedIn = LoggedIn => {
    this.setState({ isUserLoggedIn: LoggedIn });
  }

  onLogOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }

  render() {

  const childProps = {
    isUserLoggedIn: this.state.isUserLoggedIn,
    userHasLoggedIn: this.userHasLoggedIn
  };
    
    return (
      <div >
        { 
        // <Navbar fluid collapseOnSelect style={{backgroundColor: "#85c1e9"}}>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as="h2">
              <Link to="/" style={{ fontSize: 30, color: "white"}}> EventSync</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          
          <Navbar.Collapse className="justify-content-end">
            <Nav >
            {
              this.state.isUserLoggedIn
            ? <Nav.Link onClick={this.onLogOut} style={{ fontSize: 18}}>Logout</Nav.Link>
            : (<Nav.Link href={cognitoUtils.getCognitoSignInUri()} style={{ fontSize: 18}}>Sign In</Nav.Link>)
            }
          
            </Nav>
          </Navbar.Collapse>
        </Navbar> }
        <Routes childProps={childProps} />
      </div>
    );
  }  
}

export default App;
