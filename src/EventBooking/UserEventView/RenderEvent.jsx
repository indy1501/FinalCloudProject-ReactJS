import React, { PureComponent } from 'react'
import { Button, Card, Row, Col } from 'react-bootstrap';
import { eventService } from '../../services/EventService';
import AttributeRender from '../AttributeRender';
import { bindActionCreators } from 'redux';

class RenderEvent extends PureComponent {
    constructor(props) {
        super(props)
        console.log("Event ID ", props.match.params.id);
        this.state = {
            eventId: props.match.params.id,
            userName: "",
            userEmail: "",
            ticketCount:"",
            eventData: []
        }
        this.bookEvent = this.bookEvent.bind(this)
    }

    componentDidMount() {
        let userName = sessionStorage.getItem("userName");
        let userEmail = sessionStorage.getItem("userEmail");
        console.log("userName", userName, userEmail)
        this.setState({
            userName: userName,
            userEmail: userEmail
        })

        eventService.getEventByID(this.state.eventId)
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        eventData: json[0],
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });

    }

    bookEvent(){
        eventService.createEventBooking(this.state.eventId,this.state.eventData.event_name,this.state.eventData.location,
            this.state.eventData.date,this.state.ticketCount,this.state.userEmail)
        .then(json => {
            console.log(json);
            if (Array.isArray(json)) {
                this.setState({
                    eventData: json[0],
                });
            }
        })
        .catch(reason => {
            console.log("Failed to fetch data from server, reason is : ", reason);
        });

    }


    render() {
        const { eventData } = this.state
        return (
            <div>
                {
                    eventData && <div>
                        <Row style={{ display: "block" }}>
                            <Col xl={{ span: 6, offset: 3 }} style={{ marginTop: "30px" }}>
                                <Card style={{ marginTop: "20px" }} key={eventData.event_id}>
                                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                                    <Card.Body>
                                        <h2>{eventData.event_name && eventData.event_name.toUpperCase()}</h2>
                                        <h4><a style={{color:"blue"}}>Location :</a> {eventData.location}</h4>
                                        <Card.Subtitle className="mb-2 text-muted">{eventData.address}, {eventData.city}, {eventData.state} {eventData.postal_code}</Card.Subtitle>
                                        <h6><a style={{color:"red"}}>Date :</a> {eventData.date} &nbsp;<a style={{color:"red"}}>Time :</a> {eventData.time}</h6>
                                    </Card.Body>

                                    <Card.Body>
                                        <Card.Title>Categories : </Card.Title>
                                        <Card.Text>{eventData.categories}</Card.Text>
                                        {

                                            /* userEventData.categories && userEventData.categories.map(value => {
                                                return (<Card.Text key={value}>&nbsp; {value} &nbsp;  <TiTick style={{ fontStyle: "Bold", color: "green" }} /> </Card.Text>)
                                            }) */
                                        }
                                    </Card.Body>
                                    {
                                        eventData.attributes && <AttributeRender attributes={eventData.attributes.BusinessParking}></AttributeRender> 
                                    }
                                    
                                    <Card.Body>
                                        
                                        <Button variant="primary" size="lg" block onClick={this.bookEvent}> Book </Button>
                                    </Card.Body>

                                </Card>
                            </Col>
                        </Row>
                    </div>
                }
            </div>


        )
    }
}

export default RenderEvent