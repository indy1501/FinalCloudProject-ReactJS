import React, { PureComponent } from 'react'
import { Row, Col, Container} from "react-bootstrap";

class UserEventView extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                
                <Container>
                    <Row>
                        <Col>1 of 2</Col>
                        <Col>2 of 2</Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default UserEventView