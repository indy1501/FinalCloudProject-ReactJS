import React, { PureComponent } from 'react'
import { Media, Card } from 'react-bootstrap'
import music from '../../assets/music.jpeg'
import { Link } from 'react-router-dom';

class Events extends PureComponent {
    constructor(props) {
        super(props)
        console.log("data:", props.eventData)
        this.state = {

        }
    }

    render() {
        const eventURL = `/BookEvent/${this.props.eventData.event_id}`
        return (

            <Card style={{ width: '22rem', marginTop: 20, marginBottom: 20 }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{this.props.eventData.event_name.toUpperCase()}</Card.Title>
                    <h6>On {this.props.eventData.date} , {this.props.eventData.time}</h6>
                    <Card.Subtitle className="mb-2 text-muted"> @ {this.props.eventData.location}, {this.props.eventData.state}</Card.Subtitle>
                    {/* <Card.Link href="#">More Details</Card.Link> */}
                    <Link to={eventURL}>More Details</Link>
                </Card.Body>
            </Card>

        )
    }
}

export default Events