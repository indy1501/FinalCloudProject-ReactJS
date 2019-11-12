import React, { PureComponent } from 'react'
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { ChatBot } from 'aws-amplify-react';
import Events from './Events';

class UserEventView extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

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