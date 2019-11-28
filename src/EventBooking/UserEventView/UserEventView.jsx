import React, { PureComponent } from 'react'
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { ChatBot } from 'aws-amplify-react';
import Events from './Events';
import { fileServices } from '../../services/fileServices'

class UserEventView extends PureComponent {
    constructor(props) {
        super(props)
        this.file = null;
        this.state = {
            userName:"Sneha",
            userEmail:"sneha11@gmail.com",
            description:"User Credit Card"
        }
    }
    handleComplete(err, confirmation) {
        if (err) {
          alert('Bot conversation failed')
          return;
        }
        //alert('Success: ' + JSON.stringify(confirmation, null, 2));
        return 'Event booked. Thank you! What would you like to do next?';
    }
    handleFileChange = event => {
        this.file = event.target.files[0];
    }    
    handleSubmit = async event => {
        event.preventDefault();
        this.s3fileupload();
    }
    s3fileupload(){
        const formData = new FormData();
        formData.append('file', this.file);
        const options = {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        delete options.headers['Content-Type'];

        fetch(`${process.env.REACT_APP_endPointUrl}/api/fileupload`, options)
        .then(response => {
            return response.json();
          }).then(jsonResponse => {
            //this.getFile(jsonResponse.imageUrl,jsonResponse.fileName, this.state.userName, this.state.userEmail, this.state.description);
            this.storefiledata(jsonResponse.CreditCardNumber,jsonResponse.ExpiryDate, jsonResponse.Organization, jsonResponse.User, this.state.userEmail);
            this.deleteFile(jsonResponse.FileName);
            console.log(jsonResponse);
          }).catch (error => {
            console.log(error)
          })
    }

    storefiledata(ccnumber, expirydate, org, user, email){
        fileServices.storefiledata(ccnumber, expirydate, org, user, email)
        .then(response => {
            console.log(response);
        });
    }
    deleteFile(fileName){
        fileServices.deleteFile(fileName)
        .then(response => {
            console.log(response);
        })
    }

    render() {
        return (
            <div>

                <Container fluid>
                    <Row>
                        <Col lg>
                            <Card bg="light" style={{ width: (window.innerWidth / 2) - 50, height: (window.innerHeight) - 120 }}>
                                <Card.Header as="h2">Events</Card.Header>
                                <Card.Body>
                                    {/* <Card.Title>Light Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk
                                        of the card's content.
                                    </Card.Text> */}
                                    <Events></Events>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg>
                            <Row>
                                <Card bg="light" style={{ width: (window.innerWidth / 2) - 50, height: (window.innerHeight / 2) - 120 }}>
                                    <Card.Header as="h2">Card Details</Card.Header>
                                    <Card.Body style={{fontSize: 20, marginTop: 20}}>                                   
                                        
                                        <input type="file" onChange={this.handleFileChange}></input>
                                        <button variant="primary" class="btn btn-primary" style={{fontSize: 15}} type="button" onClick={this.handleSubmit}>
                                            Upload
                                        </button>  

                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row>
                                <Card bg="light" style={{ width: (window.innerWidth / 2) - 50, height: (window.innerHeight / 2) - 20 , marginTop:20}}>
                                    <Card.Header as="h2">ChatBot</Card.Header>
                                    <Card.Body >
                                    <ChatBot
                                        title="Event Booking Bot"
                                        botName="EventBookingBot"
                                        welcomeMessage="Welcome, how can I help you today?"
                                        onComplete={this.handleComplete.bind(this)}
                                        voiceEnabled={true}
                                        clearOnComplete={true}
                                    />
                                    </Card.Body>
                                </Card>
                            </Row>

                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default UserEventView