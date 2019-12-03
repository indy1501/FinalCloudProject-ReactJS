import React, { PureComponent } from 'react'
import {  Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/EventService';
import AttributeRender from '../AttributeRender';

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
        //let userEmail = "rashmisarode92@gmail.com"
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
    onDelete(event_id) {
        eventService.deleteEvent(this.state.user, event_id)
        /* console.log(this.state.user, event_id) */
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
        //const businessUpdateURL = `/updateBusiness/${this.state.userEventData.event_id}`
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
                            {
                                userEventData && userEventData.map(value => {
                                    return (<Card style={{ marginTop: "20px" }} key={value.event_id}>
                                        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                                        <Card.Body>
                                            <h2>{value.event_name}</h2>
                                            <h3>{value.location}</h3>
                                            <Card.Subtitle className="mb-2 text-muted">{value.address} {value.city} {value.state} {value.postal_code}</Card.Subtitle>
                                        </Card.Body>
        
                                        <Card.Body>
                                            <Card.Title>Categories : </Card.Title>
                                            <Card.Text>{value.categories}</Card.Text>
                                             {
        
                                                /* userEventData.categories && userEventData.categories.map(value => {
                                                    return (<Card.Text key={value}>&nbsp; {value} &nbsp;  <TiTick style={{ fontStyle: "Bold", color: "green" }} /> </Card.Text>)
                                                }) */
                                            }
                                        </Card.Body>
                                        <AttributeRender attributes={value.attributes.BusinessParking}></AttributeRender>
                                        <Card.Body>
                                            <Button variant="outline-danger" onClick={e=> this.onDelete(value.event_id)}> Delete </Button>
                                            {

                                            }
                                            <Link to={`/UpdateEvent/${value.event_id}`}><Button variant="outline-primary" style={{ marginLeft: "30px" }}>Update </Button></Link>
                                        </Card.Body>
        
                                    </Card>)
                                })
                            }
                            
                            </div> 
                        }


                    </Col>
                </Row>
            </div>
        )
    }
}

export default AdminView