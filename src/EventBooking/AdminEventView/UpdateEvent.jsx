import React, { PureComponent } from 'react'
import { Card, Form, Button, Col } from 'react-bootstrap'
import { eventService } from '../../services/EventService'
import { Link } from 'react-router-dom';

class UpdateEvent extends PureComponent {
    constructor(props) {
        super(props)
        console.log("event ID ", props.match.params.id);
        this.state = {
            eventId: props.match.params.id,
            name: "",
            location: "",
            date: "",
            time: "",
            address: "",
            state: "",
            city: "",
            postalCode: "",
            cats: ["Active Life"],
            finalSelected: [],
            garage: false,
            lot: false,
            street: false,
            valet: false,
            validated: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateLocation = this.updateLocation.bind(this)
        this.updateDate = this.updateDate.bind(this)
        this.updateTime = this.updateTime.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.updateState = this.updateState.bind(this)
        this.updateCity = this.updateCity.bind(this)
        this.updatePostal = this.updatePostal.bind(this)
        this.updateGarage = this.updateGarage.bind(this)
        this.updateLot = this.updateLot.bind(this)
        this.updateStreet = this.updateStreet.bind(this)
        this.updateValet = this.updateValet.bind(this)
        this.updateValidated = this.updateValidated.bind(this)
    }
    componentDidMount(){
        eventService.getEventByID(this.state.eventId)
        .then(json => {
            console.log(json);
            if (Array.isArray(json)) {
                this.setState({
                    name: json[0].event_name,
                    location: json[0].location,
                    date: json[0].date,
                    time: json[0].time,
                    address: json[0].address,
                    state: json[0].state,
                    city: json[0].city,
                    postalCode: json[0].postal_code,
                    /* garage: json[0].attributes["BusinessParking"].garage, 
                    garage: false,
                    lot: false,
                    street: false,
                    valet: false,
                    validated: false*/
                });
            }
        })
        .catch(reason => {
            console.log("Failed to fetch data from server, reason is : ", reason);
        });
    }
    onSubmit() {
        //let userEmail = sessionStorage.getItem("userEmail")
        //console.log(`userEmail: ${userEmail}`, this.state.garage, this.state.street, this.state.validated, this.state.lot, this.state.valet)
        eventService.updateEvent(this.state.eventId, this.state.name, this.state.location, this.state.finalSelected, this.state.address, this.state.state,
            this.state.city, this.state.postalCode, this.state.garage, this.state.street, this.state.validated, this.state.lot, this.state.valet,this.state.date,this.state.time )
            .then(json => {
                console.log(json);
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }
    updateName(event) {
        this.setState({
            name: event.target.value
        })
    }
    updateLocation(event) {
        this.setState({
            location: event.target.value
        })
    }
    updateDate(event) {
        this.setState({
            date: event.target.value
        })
    }
    updateTime(event) {
        this.setState({
            time: event.target.value
        })
    }
    updateAddress(event) {
        this.setState({
            address: event.target.value
        })
    }
    updateState(event) {
        this.setState({
            state: event.target.value
        })
    }
    updateCity(event) {
        this.setState({
            city: event.target.value
        })
    }
    updatePostal(event) {
        this.setState({
            postalCode: event.target.value
        })
    }
    updateGarage(event) {
        this.setState({
            garage: event.target.checked
        })
    }
    updateLot(event) {
        this.setState({
            lot: event.target.checked
        })
    }
    updateStreet(event) {
        this.setState({
            street: event.target.checked
        })
    }
    updateValet(event) {
        this.setState({
            valet: event.target.checked
        })
    }
    updateValidated(event) {
        this.setState({
            validated: event.target.checked
        })
    }

    render() {
        return (
            <div>
                <div style={{ margin: "30px" }}>
                    <Link to="/AdminView"> Go Back</Link>
                </div>
                <Card style={{ "margin": 100, "marginTop": 30 }}>
                    <Card.Body>

                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name of Event" value={this.state.name} onChange={this.updateName} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid name.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="location">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter Location" value={this.state.location} onChange={this.updateLocation} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid location.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Row style={{ marginTop: "10px" }}>
                                    <Form.Group as={Col} controlId="formGridDate">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control placeholder="MM/DD/YYYY" value={this.state.date} onChange={this.updateDate}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridTime">
                                        <Form.Label>Time</Form.Label>
                                        <Form.Control placeholder="eg. 22:00 hrs" value={this.state.time} onChange={this.updateTime}/>
                                    </Form.Group>
                                </Form.Row>
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Categories</Form.Label>
                                <Form.Control as="select" multiple onChange={e => {
                                    console.log(e.target.options);
                                    const opts = e.target.options;
                                    let tempArray = [];
                                    for (var i = 0; i < opts.length; i++) {
                                        var item = opts.item(i);
                                        console.log(item.selected, item.value);
                                        if (item.selected === true) {
                                            tempArray.push(item.value)
                                        }
                                    }
                                    this.setState({
                                        finalSelected: tempArray
                                    })
                                }}>
                                   <option>Active Life</option>
                                    <option>Football</option>
                                    <option>Flower Exhibition</option>
                                    <option>Music</option>
                                    <option>Sports</option>
                                    <option>Dance</option>
                                    <option>Art</option>
                                    <option>Game</option>
                                    <option>Political</option>
                                    <option>Entertain</option>
                                    <option>Golf</option>
                                    <option>Martial Arts</option>
                                </Form.Control>
                            </Form.Group>
                          
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Label>Attributes : Business Parking</Form.Label>
                                <Form.Check type="checkbox" label="Garage" onChange={this.updateGarage} />
                                <Form.Check type="checkbox" label="Lot" onChange={this.updateLot} />
                                <Form.Check type="checkbox" label="Street" onChange={this.updateStreet} />
                                <Form.Check type="checkbox" label="Valet" onChange={this.updateValet} />
                                <Form.Check type="checkbox" label="Validated" onChange={this.updateValidated} />
                            </Form.Group>
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter Address" value={this.state.address} onChange={this.updateAddress} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid address.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="Enter State" value={this.state.state} onChange={this.updateState} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="Enter City" value={this.state.city} onChange={this.updateCity} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="postalCode">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter Postal Code" value={this.state.postalCode} onChange={this.updatePostal} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid postal code.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={this.onSubmit}>
                                Submit
                        </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default UpdateEvent