import React, { PureComponent } from 'react'
import {  Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/EventService';

class AdminView extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            userEventData: {},
            hasEvent: false,
            user: ""
        }
        this.getUserEvent = this.getUserEvent.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }
    componentDidMount() {
        let userEmail = sessionStorage.getItem("userEmail")
        console.log(userEmail)
        this.setState({
            user: userEmail
        })
        this.getUserEvent(userEmail)

    }
    getUserEvent(userEmail) {
        eventService.getEventByUserID(userEmail)
            .then(json => {
                console.log(json);
                if (!json.error) {
                    this.setState({
                        userEventData: json,
                        hasEvent: true
                    });
                } else {
                    this.setState({
                        hasEvent: false
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }
    onDelete() {
        eventService.deleteEvent(this.state.user, this.state.userEventData.business_id)
            .then(json => {
                console.log(json);
                this.getUserEvent(this.state.user)
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }

    render() {
        const { hasEvent } = this.state;
        const { userEventData } = this.state;
        const businessUpdateURL = `/updateBusiness/${this.state.userEventData.business_id}`
        return (
            <div>
                <Row style={{ display: "block" }}>
                    <Col xl={{ span: 6, offset: 3 }} style={{ marginTop: "30px" }}>
                        {
                            !hasEvent &&
                            <Card>
                                <Card.Body>

                                    <h5>You have not registered any Event yet</h5>
                                    <h5><Link to="/CreateEvent">Register Your Event</Link></h5>



                                </Card.Body>
                            </Card>
                        }
                        {
                            hasEvent && <div>
                                <Card>
                                <Card.Body>
                                    <h5> <Link to="/CreateEvent">Register new Event</Link></h5>
                                   
                                </Card.Body>
                            </Card>
                            <Card >
                                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                                <Card.Body>
                                    <h2>{userEventData.event_name}</h2>
                                    <Card.Header>{userEventData.location}</Card.Header>
                                    <Card.Subtitle className="mb-2 text-muted">{userEventData.address} {userEventData.city} {userEventData.state} {userEventData.postal_code}</Card.Subtitle>
                                </Card.Body>

                                <Card.Body>
                                    <Card.Title>Categories : </Card.Title>
                                    <Card.Text>{userEventData.categories}</Card.Text>
                                     {

                                        /* userEventData.categories && userEventData.categories.map(value => {
                                            return (<Card.Text key={value}>&nbsp; {value} &nbsp;  <TiTick style={{ fontStyle: "Bold", color: "green" }} /> </Card.Text>)
                                        }) */
                                    }
                                </Card.Body>
                                <Card.Body>
                                    <Button variant="outline-danger" onClick={this.onDelete}> Delete </Button>
                                    <Link to={businessUpdateURL}><Button variant="outline-primary" style={{ marginLeft: "30px" }}>Update </Button></Link>
                                </Card.Body>

                            </Card>
                            </div> 
                        }


                    </Col>
                </Row>
            </div>
        )
    }
}

export default AdminView