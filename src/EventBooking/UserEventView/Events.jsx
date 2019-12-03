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

            <Card style={{ width: '30rem', marginTop: 30, marginBottom: 30, paddingBottom:20, paddingTop:20}}>
              
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