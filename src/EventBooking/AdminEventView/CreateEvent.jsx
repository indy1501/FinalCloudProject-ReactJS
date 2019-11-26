import React, { PureComponent } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { eventService } from '../../services/EventService'
import { Link } from 'react-router-dom';

class CreateEvent extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            location: "",
            address: "",
            state: "",
            city: "",
            postalCode: "",
            cats: ["Active Life"],
            finalSelected: []
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.updateState = this.updateState.bind(this)
        this.updateCity = this.updateCity.bind(this)
        this.updatePostal = this.updatePostal.bind(this)
    }
    onSubmit() {
        let userEmail = sessionStorage.getItem("userEmail")
        console.log(`userEmail: ${userEmail}`)
        eventService.createEvent(userEmail, this.state.name, this.state.finalSelected, this.state.address, this.state.state, this.state.city, this.state.postalCode)
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
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Categories</Form.Label>
                                <Form.Control as="select" multiple onChange={e => {
                                    console.log(e.target.options);
                                    const opts = e.target.options;
                                    let tempArray = [];
                                    for (var i = 0; i < opts.length; i++) {
                                        var item = opts.item(i);
                                        console.log(item.selected, item.value);
                                        if (item.selected == true) {
                                            tempArray.push(item.value)
                                        }
                                    }
                                    this.setState({
                                        finalSelected: tempArray
                                    })
                                }}>
                                    <option>Active Life</option>
                                    <option>Hiking</option>
                                    <option>Golf</option>
                                    <option>Fitness & Instruction</option>
                                    <option>Cycling Classes</option>
                                    <option>Yoga</option>
                                    <option>Sporting Goods</option>
                                    <option>Boot Camps</option>
                                    <option>Cardio Classes</option>
                                    <option>Boxing</option>
                                    <option>Gymnastics</option>
                                    <option>Martial Arts</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Label>Attributes : Business Parking</Form.Label>
                                <Form.Check type="checkbox" label="Garage" />
                                <Form.Check type="checkbox" label="Lot" />
                                <Form.Check type="checkbox" label="Street" />
                                <Form.Check type="checkbox" label="Valet" />
                                <Form.Check type="checkbox" label="Validated" />
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
                            <Button variant="primary" type="submit" onClick={this.onSubmit}>
                                Submit
                        </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default CreateEvent