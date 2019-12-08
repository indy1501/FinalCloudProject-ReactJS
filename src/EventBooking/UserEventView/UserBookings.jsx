import React, { PureComponent } from 'react'
import { eventService } from '../../services/EventService';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';

class UserBookings extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            userEvents: [],
            user: "",
        }
    }
    componentDidMount() {
        let userName = sessionStorage.getItem("userName");
        let userEmail = sessionStorage.getItem("userEmail");
        console.log("userName", userName, userEmail)
        this.setState({
            user: userEmail
        })
        eventService.getEventBookingByUserID(userEmail)
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        userEvents: json,
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }

    render() {
        const { userEvents } = this.state
        return (
            <div>
                <div style={{ margin: "30px" }}>
                    <Link to="/UserEventView"> Go Back</Link>
                </div>
                <h2 className="text-center" style={{marginTop:10, marginRight:80}}>You have booked the following events</h2>
                {userEvents && userEvents.map(eventData => {
                    return (
                        <Col xl={{ span: 3, offset: 4 }}>
                            
                            <Card style={{ width: '30rem', marginTop: 30, marginBottom: 30, paddingBottom: 20, paddingTop: 20 }}>

                                <Card.Body>
                                    <Card.Title>{eventData.EventName.toUpperCase()}</Card.Title>
                                    <h6>On {eventData.EventDate}</h6>
                                    <Card.Subtitle className="mb-2 text-muted"> @ {eventData.EventLocation}</Card.Subtitle>
                                    <Card.Text>Number of tickets : {eventData.EventTickets}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })
                }
            </div>
        )
    }
}

export default UserBookings