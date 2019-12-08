import React, { PureComponent } from 'react'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { eventService } from '../../services/EventService';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import './EventGate.css'

class EventGate extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            compareResult: "",
            eventId: "",
            eventName: "",
            eventData: [],
            access: false
        }
        this.onTakePhoto = this.onTakePhoto.bind(this)
        this.getEvent = this.getEvent.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.imageCompare = this.imageCompare.bind(this)
    }

    getImageName() {
        const str = new Date().toUTCString();
        const replaced = str.replace(/[,: ]/g, "_");
        console.log(replaced);
        return replaced;
    }

    onTakePhoto(dataUri) {
        // Do stuff with the dataUri photo...
        console.log('takePhoto', dataUri);
        fetch(dataUri)
            .then(res => res.blob())
            .then(blob => {
                // Upload
                // fetch('upload', {method: 'POST', body: fd})
                let imageFileName = this.getImageName()
                let eventId = this.state.eventId

                eventService.uploadPhoto(blob, imageFileName, "temp")
                    .then(json => {
                        console.log(json);
                        /* this.setState({
                            uploadResult: "Photo Uploaded successfully"
                        });  */
                        this.imageCompare(`${imageFileName}.png`, eventId)
                    })
                    .catch(reason => {
                        console.log(reason);
                    });
            })



    }

    imageCompare(tempFileName, eventId) {
        eventService.userCheckin(tempFileName, eventId)
            .then(json => {
                console.log(json.ok);
                if (json.ok === true) {
                    this.setState({
                        access: true
                    })
                    console.log("access :" + this.state.access)
                }
            })
            .catch(reason => {
                console.log(reason);
            });

        setTimeout(() => {
            this.setState({
                access: false
            })
        }, 5000);

    }
    getEvent(event) {
        this.setState({
            eventId: event.target.value
        })
    }
    onSubmit() {
        eventService.getEventByID(this.state.eventId)
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        eventData: json[0],
                        eventName: json[0].event_name
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });

    }

    render() {
        return (
            <div>
                <div style={{ margin: "10px" }}>
                    <Link to="/UserEventView"> Go Back</Link>
                </div>
                <div className="text-center">
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintexteventid">
                            <Form.Label column sm={{ span: 1, offset: 3 }}>
                                Event ID :
                        </Form.Label>
                            <Col sm="4">
                                <Form.Control placeholder="Event Id" value={this.state.eventId} onChange={this.getEvent} />
                            </Col>
                            <Button variant="primary" type="button" onClick={this.onSubmit}>Submit</Button>
                        </Form.Group>
                    </Form>
                    {
                        this.state.eventName && <h4 style={{ marginTop: 30, color: "red" }}>WelCome to {this.state.eventName.toUpperCase()}</h4>
                    }

                </div>

                <div className="App" style={{ marginTop: 10 }}>
                    <Camera
                        onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
                    />
                    <h5 className="text-center" style={{ marginTop: 10 }}>{this.state.compareResult}</h5>
                    {
                        this.state.compareResult && <h3 style={{ marginTop: 10, color: "red" }}> {this.state.compareResult}</h3>
                    }
                </div>
                <div className="text-center" style={{ marginTop: "auto" }}>
                    <Col xl={{ span: 2, offset: 5 }}>
                        {
                            !this.state.access &&
                            <div>
                                <div id="circleRed" className="elementRed" style={{ marginLeft: 90, marginTop: 10 }}></div>
                                <h5 style={{ color: "black" }}>No Access</h5>
                            </div>

                        }
                        {
                            this.state.access &&
                            <div>
                                <div id="circleGreen" className="elementGreen" style={{ marginLeft: 100, marginTop: 30 }}></div>
                                <h5 style={{ color: "black" }}>Access</h5>
                            </div>

                        }
                    </Col>

                </div>
            </div>
        )
    }
}

export default EventGate