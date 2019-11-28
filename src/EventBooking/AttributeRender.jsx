import React, { PureComponent } from 'react'
import { Card } from 'react-bootstrap'
import { TiTick } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";

class AttributeRender extends PureComponent {
    constructor(props) {
        super(props)
        //console.log(props.attributes)
        this.state = {

        }
    }

    render() {
        return (
            <Card.Body>
                <Card.Title>Attributes : </Card.Title>
                {
                    this.props.attributes.garage &&
                    <Card.Text>Garage  &nbsp; <TiTick style={{ fontStyle: "Bold", color: "green", fontSize: 20}} /></Card.Text>
                }
                {
                    !this.props.attributes.garage &&
                    <Card.Text>Garage  &nbsp; <TiTimes style={{ fontStyle: "Bold", color: "red" ,fontSize: 20}} /></Card.Text>
                }
               {
                    this.props.attributes.lot &&
                    <Card.Text>Lot  &nbsp; <TiTick style={{ fontStyle: "Bold", color: "green", fontSize: 20}} /></Card.Text>
                }
                {
                    !this.props.attributes.lot &&
                    <Card.Text>Lot  &nbsp; <TiTimes style={{ fontStyle: "Bold", color: "red" ,fontSize: 20}} /></Card.Text>
                }
                {
                    this.props.attributes.street &&
                    <Card.Text>Street  &nbsp; <TiTick style={{ fontStyle: "Bold", color: "green", fontSize: 20}} /></Card.Text>
                }
                {
                    !this.props.attributes.street &&
                    <Card.Text>Street  &nbsp; <TiTimes style={{ fontStyle: "Bold", color: "red" ,fontSize: 20}} /></Card.Text>
                }
                {
                    this.props.attributes.valet &&
                    <Card.Text>Valet  &nbsp; <TiTick style={{ fontStyle: "Bold", color: "green", fontSize: 20}} /></Card.Text>
                }
                {
                    !this.props.attributes.valet &&
                    <Card.Text>Valet  &nbsp; <TiTimes style={{ fontStyle: "Bold", color: "red" ,fontSize: 20}} /></Card.Text>
                }
                {
                    this.props.attributes.validated &&
                    <Card.Text>Validated  &nbsp; <TiTick style={{ fontStyle: "Bold", color: "green", fontSize: 20}} /></Card.Text>
                }
                {
                    !this.props.attributes.validated &&
                    <Card.Text>Validated  &nbsp; <TiTimes style={{ fontStyle: "Bold", color: "red" ,fontSize: 20}} /></Card.Text>
                }
            </Card.Body>
        )
    }
}

export default AttributeRender