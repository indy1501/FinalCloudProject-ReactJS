import React, { PureComponent } from 'react'
import { Button, Card, Row, Col, Modal, Form } from 'react-bootstrap';
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
            ticketCount: "1",
            eventData: [],
            modalShow: false
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
    setModalShow(value) {
        this.setState({
            modalShow: value
        })
    }

    bookEvent(tickets) {
        this.setState({
            ticketCount: tickets
        })

        eventService.createEventBooking(this.state.eventId, this.state.eventData.event_name, this.state.eventData.location,this.state.eventData.date, this.state.ticketCount, this.state.userEmail)
            /* console.log(this.state.eventId, this.state.eventData.event_name, this.state.eventData.location,
                this.state.eventData.date, this.state.ticketCount, this.state.userEmail) */
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
                                        <h4><a style={{ color: "blue" }}>Location :</a> {eventData.location}</h4>
                                        <Card.Subtitle className="mb-2 text-muted">{eventData.address}, {eventData.city}, {eventData.state} {eventData.postal_code}</Card.Subtitle>
                                        <h6><a style={{ color: "red" }}>Date :</a> {eventData.date} &nbsp;&nbsp;<a style={{ color: "red" }}>Time :</a> {eventData.time}</h6>
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

                                        <Button variant="primary" size="lg" block onClick={this.bookEvent} onClick={(e) => this.setModalShow(true)}> Book </Button>
                                        <BookEventModal
                                            show={this.state.modalShow}
                                            onHide={(e) => this.setModalShow(false)}
                                            onBookEvent={this.bookEvent}></BookEventModal>
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

export const BookEventModal = ({ onBookEvent, ...props }) => {
    const [ticketText, setTicketText] = React.useState("");
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Book Event
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {/*  <textarea style={{ width: "100%", height: "300px", padding: 20 }} value={reviewText} onChange={e => setReviewText(e.target.value)}> </textarea> */}
                <Form>
                    <Form.Group as={Row} controlId="formPlaintexttickets">
                        <Form.Label column sm="3">
                            Number of Tickets :
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control  placeholder="Tickets" value={ticketText} onChange={e => setTicketText(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={e => onBookEvent(ticketText)}>Book</Button>
            </Modal.Footer>
        </Modal>
    );
}