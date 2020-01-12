import React from 'react';
import styled from "styled-components"
// import { Row, Col } from 'reactstrap';

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {}
    }

    render() {
        return (
            <Wrapper>
                <Stickyness>
                    <Logo src="tud_logo.png" />
                    <Background>

                        <Logo src="hda.svg" />
                    </Background>
                    <Topbar>Cross Domain Challenge</Topbar>
                </Stickyness>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    height: 100%;
    background-color: #2F394E
`

const Stickyness = styled.div`
    position: sticky; 
    top: 0
`

const Background = styled.div`
    margin: 1em;
    border-radius: 8px;
    background-color: white;
`


const Topbar = styled.div`
    color: white;
    font-weight: bold;
    margin: 0em auto; 
    // padding-top: 1em
`

const Logo = styled.img`
    max-width: 100%;
    border-radius: 20px; 
    padding: 1em;
    margin-top: 1em; 
`


export default Sidebar