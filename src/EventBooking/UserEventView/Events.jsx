import React, { PureComponent } from 'react'
import { Media, Card } from 'react-bootstrap'
import music from '../../assets/music.jpeg'

class Events extends PureComponent {
    constructor(props) {
        super(props)
        console.log("data:", props.eventData)
        this.state = {

        }
    }

    render() {
        return (

            <Card style={{ width: '21rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{this.props.eventData.event_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                </Card.Body>
            </Card>

        )
    }
}

export default Events