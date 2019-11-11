import React, { Component }  from "react";
import { Button, FormControl, ControlLabel, Col, Form, FormGroup, Label, FormLabel} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateEvent extends Component {
        
  constructor() {
        super();
        this.state = {
          eventname:"",
          eventlocation:"",
          description:"",
          startDate: new Date()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
    }
    handleDateChange = date => {
      this.setState({
        startDate: date
      });
    };

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.eventname);
        console.log(this.state.eventlocation);
        console.log(this.state.startDate);
    }

    render() {
      return (
        <div className="CreateEvent">          
        <form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Col sm={6}  style={{textAlign: "right"}}>
          <FormLabel>Event Name</FormLabel>
          </Col>
          <Col sm={6}  style={{textAlign: "left"}}>
            <input type="text" name="eventname" id="eventname" onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={6}  style={{textAlign: "right"}}>
          <FormLabel>Event Location</FormLabel>
          </Col>
          <Col sm={6}  style={{textAlign: "left"}}>
            <input type="text" name="eventlocation" id="eventlocation" onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
        <Col sm={6}  style={{textAlign: "right"}}>
          <FormLabel>Event Date</FormLabel>
            </Col>
            <Col sm={6}  style={{textAlign: "left"}}>
            <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            showTimeSelect
            dateFormat="Pp"
          />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={6}  style={{textAlign: "right"}}>
          <FormLabel>Event Description</FormLabel>
          </Col>
          <Col sm={6}  style={{textAlign: "left"}}>
            <textarea name="description" id="description" onChange={this.handleChange} />
          </Col>
        </FormGroup>      
        <FormGroup row >        
        <button variant="primary" class="btn btn-primary" type="button" style={{marginTop:20}} onClick={this.handleSubmit}>
                      Create Event
                      </button>         
        </FormGroup>
          
        </form>
    	  </div>
      );
    }
  }

export default CreateEvent;