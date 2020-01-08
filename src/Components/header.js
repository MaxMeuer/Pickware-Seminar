import React from 'react';
import styled from "styled-components"
import { Row, Col } from 'reactstrap';


class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col xl={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 3 }} >
                        <Input placeholder="Finde Produkte, Kunden oder Bestellungen !" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Divider color={"#D8DDE6"} thickness={"1px"} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={{ size: "auto", offset: 0 }} lg={{ size: "auto", offset: 0 }} >
                        <Text>Individualisierungsprozess</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Divider color={"#57D9A3"} thickness={"2px"} />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

const Input = styled.input`
    height: 2em;
    width: 100%;
    outline: none;
    padding: 1em 0.5em;
    border: 1px solid #D8DDE6;
    border-radius: 2px;
    margin: 2em 0;
`

const Divider = styled.div`
    height: ${props => props.thickness ? props.thickness : "1px"};
    width: 100%;
    background: ${props => props.color ? props.color : "white"};
`

const Text = styled.div`
    color: #54698D;
    font-weight: bold;
    margin: 1.5em;
`




export default Sidebar