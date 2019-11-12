import React, { PureComponent } from 'react'
import { Media, Card } from 'react-bootstrap'
import music from '../../assets/music.jpeg'

class Events extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Media>
                        <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={music}
                            alt="Generic placeholder"
                        />
                        <Media.Body>
                            <h5>Music Event</h5>
                            <p>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                Donec lacinia congue felis in faucibus.
                            </p>
                        </Media.Body>
                    </Media>
                </Card.Body>

            </Card>

        )
    }
}

export default Events