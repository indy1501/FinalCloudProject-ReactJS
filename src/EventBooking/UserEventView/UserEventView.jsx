import React, { PureComponent } from 'react'
import { Row, Col, Container, Card } from "react-bootstrap";
import Events from './Events';

class UserEventView extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
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
                                    <Card.Body>
                                        <Card.Title>Light Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row>
                                <Card bg="light" style={{ width: (window.innerWidth / 2) - 50, height: (window.innerHeight / 2) - 20 , marginTop:20}}>
                                    <Card.Header as="h2">ChatBot</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Light Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                    </Card.Text>
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