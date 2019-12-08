import React, { PureComponent } from 'react'
import { Row, Col, Container, Card, Button, CardColumns, Alert } from "react-bootstrap";
import { ChatBot } from 'aws-amplify-react';
import Events from './Events';
import './UserEventView.css'
import { fileServices } from '../../services/fileServices'
import { eventService } from '../../services/EventService';

class UserEventView extends PureComponent {
    constructor(props) {
        super(props)
        this.file = null;
        this.state = {
            userName: "",
            userEmail: "",
            description: "User Credit Card",
            cardMessage: "You have not uploaded the card yet",
            Event: "",
            city: "",
            last_key_business_id: "",
            last_key_city: "",
            searchData: [],
        }
        this.updateCity = this.updateCity.bind(this)
        this.updateEvent = this.updateEvent.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }
    componentDidMount() {
        let userName = sessionStorage.getItem("userName");
        let userEmail = sessionStorage.getItem("userEmail");
        console.log("userName", userName, userEmail)
        this.setState({
            userEmail: userEmail,
            userName: userName
        })
        eventService.getAll()
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        searchData: json,
                        /* last_key_business_id: json.LastEvaluatedKey.business_id,
                        last_key_city: json.LastEvaluatedKey.city */
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }
    updateCity(event) {
        this.setState({
            city: event.target.value
        })
    }
    updateEvent(event) {
        this.setState({
            Event: event.target.value
        })
    }
    handleComplete(err, confirmation) {
        if (err) {
            alert('Bot conversation failed')
            return;
        }
        //alert('Success: ' + JSON.stringify(confirmation, null, 2));
        return 'Event booked. Thank you! What would you like to do next?';
    }
    handleFileChange = event => {
        this.file = event.target.files[0];
    }
    handleSubmit = async event => {
        event.preventDefault();
        this.s3fileupload();
    }
    s3fileupload() {
        const formData = new FormData();
        formData.append('file', this.file);
        const options = {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        delete options.headers['Content-Type'];

        fetch(`${process.env.REACT_APP_endPointUrl}/api/fileupload`, options)
        .then(response => {
            return response.json();
          }).then(jsonResponse => {
            //this.getFile(jsonResponse.imageUrl,jsonResponse.fileName, this.state.userName, this.state.userEmail, this.state.description);
            this.storefiledata(jsonResponse.CreditCardNumber,jsonResponse.ExpiryDate, jsonResponse.Organization, jsonResponse.User, this.state.userEmail);
            this.deleteFile(jsonResponse.FileName);
            console.log(jsonResponse);

          }).catch (error => {
            sessionStorage.setItem("cardMessage", "Card Upload failed")
            let cardMessage = sessionStorage.getItem("cardMessage");
            this.setState({
                cardMessage : cardMessage
            })
            console.log(error)
          })
    }

    storefiledata(ccnumber, expirydate, org, user, email){
        fileServices.storefiledata(ccnumber, expirydate, org, user, email)
        .then(response => {
            sessionStorage.setItem("cardMessage", "Card Uploaded Successfully")
            let cardMessage = sessionStorage.getItem("cardMessage");
            this.setState({
                cardMessage : cardMessage
            })
            console.log(response);
        });
    }
    deleteFile(fileName){
        fileServices.deleteFile(fileName)
        .then(response => {
            console.log(response);
        })
    }
    onSearch() {
        eventService.getSearchData(this.state.Event, this.state.city)
            .then(json => {
                console.log(json);
                if (Array.isArray(json.events)) {
                    this.setState({
                        searchData: json.events,
                        /* last_key_business_id: json.LastEvaluatedKey.business_id,
                        last_key_city: json.LastEvaluatedKey.city */
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }
    loadMore() {
        console.log(this.state.Event, this.state.city, this.state.last_key_business_id, this.state.last_key_city)
        eventService.getMoreSearchData(this.state.Event, this.state.city, this.state.last_key_business_id, this.state.last_key_city)
            .then(json => {
                console.log(json);
                if (Array.isArray(json.events)) {
                    this.setState({
                        searchData: this.state.searchData.concat(json.events),
                        last_key_business_id: json.LastEvaluatedKey.business_id,
                        last_key_city: json.LastEvaluatedKey.city
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }

    render() {
        const { searchData } = this.state
        return (
            <div>

                <Container fluid>
                    <section className="search-sec" style={{ marginTop: 10 }}>
                        <div className="container">
                            <form action="#" method="post" noValidate="novalidate">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-lg-5 col-md-3 col-sm-12 p-0">
                                                <input type="text" className="form-control search-slt" placeholder="Find Sports Activity" value={this.state.Event} onChange={this.updateEvent} />
                                            </div>
                                            <div className="col-lg-5 col-md-3 col-sm-12 p-0">
                                                <input type="text" className="form-control search-slt" placeholder="Enter City" value={this.state.city} onChange={this.updateCity} />
                                            </div>
                                            <div className="col-lg-2 col-md-3 col-sm-12 p-0">
                                                <button type="button" className="btn btn-info wrn-btn" onClick={this.onSearch}>Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                    <Row style={{ marginTop: 10 }}>
                        <Col xl={7} style={{ border: "1px solid black", margin: 10, borderRadius: 5, marginLeft: 80, height: (window.innerHeight) - 225, overflowY: "scroll" }}>

                            <Alert variant="primary" style={{ marginTop: 10 }}>
                                <Alert.Heading>Events</Alert.Heading>
                            </Alert>

                            <Row style={{ marginLeft: 45 }}>

                                {searchData && searchData.map(eventData => {
                                    return (
                                        <Col>
                                            <Events eventData={eventData} key={eventData.event_id}></Events>
                                        </Col>
                                    )
                                })
                                }

                            </Row>
                        </Col>
                        <Col xl={4} >
                            <Row style={{ border: "1px solid black", margin: 10, borderRadius: 5}}>

                                <Card style={{ width: "100%", height: (window.innerHeight/2) - 240 }}>
                                    {/* <Card.Header as="h4">Card Details</Card.Header> */}
                                    <Alert variant="primary" style={{ margin: 10 }}>
                                        <Alert.Heading>Card Details</Alert.Heading>
                                    </Alert>
                                    <Card.Body style={{ fontSize: 20, marginTop: 10 }}>

                                        <input type="file" onChange={this.handleFileChange}></input>
                                        <button variant="primary" className="btn btn-primary" style={{ fontSize: 15 }} type="button" onClick={this.handleSubmit}>
                                            Upload
                                        </button>
                                    </Card.Body>
                                    <Card.Body>
                                        <Card.Title>{this.state.cardMessage}</Card.Title>
                                    </Card.Body>

                                </Card>
                            </Row>
                            <Row style={{ border: "1px solid black", margin: 10, borderRadius: 5 }}>
                                <Card style={{ width: "100%", height: (window.innerHeight/2)+20  }}>
                                    <Alert variant="primary" style={{ margin: 10 }}>
                                        <Alert.Heading>ChatBot</Alert.Heading>
                                    </Alert>
                                    {/* <Card.Header as="h4">ChatBot</Card.Header> */}
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
