import React from 'react';
import styled from "styled-components"
import { Row, Col } from 'reactstrap';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Graph from "./../Components/graph"


const pro = [
    {
        name: "Druckart",
        id: "item0",
        subprocesses: [
            { name: "Siebdruck", time: "1h 30min", place: "Station 1", ressources: "Farbe", id: "subitem-0" },
            { name: "Bestickt", time: "3h", place: "Station 1", ressources: "Garn", id: "subitem-1" },
            { name: "Digitaler Direktdruck", time: "20min", place: "Station 1", ressources: " - ", id: "subitem-1" }
        ]
    },
    { name: "Profi-Qualitätscheck", time: "1h", place: "Station 3", ressources: " - ", id: "item-1" },

]

class HelloScreen extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            showMask: true,
            name: "",
            place: "",
            subQuestion: false,
            time: "",
            ressources: "",
            showOrga: false,
            showMainInput: true,
            mainName: "",
            process: [],
            // subQuestion: true
        }

        this.handleInput = this.handleInput.bind(this)
        this.newSubprocess = this.newSubprocess.bind(this)
        this.addSubprocess = this.addSubprocess.bind(this)
        this.addStep = this.addStep.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this)
    }

    render() {
        const { showMask, showOrga, process, subprocess, subQuestion, name, mainName, place, ressources, time, showMainInput, data } = this.state
        return (
            <React.Fragment>
                {!showOrga ?
                    <React.Fragment>
                        {showMask &&

                            <WhiteFrame>
                                {process[0] &&
                                    process.map((proc, procIndex) => {
                                        return (
                                            <React.Fragment>
                                                {proc.subprocesses ?
                                                    proc.subprocesses.length > 0 &&
                                                    <WhiteFrame>
                                                        <Row>
                                                            <Frame margin="1em">
                                                                <Dot src="dot.png" />
                                                                <Number>{procIndex + 1}</Number>
                                                            </Frame>
                                                            <Text>{proc.name}</Text>
                                                        </Row>
                                                        <Row>
                                                            {proc.subprocesses.map((sub, subIndex) => {
                                                                return (
                                                                    <Col lg="4" key={subIndex}>
                                                                        <WhiteFrame>
                                                                            <Frame>
                                                                                <Dot src="dot.png" />
                                                                                <Number>{subIndex + 1}</Number>
                                                                            </Frame>
                                                                            <Text>Name: {sub.name}</Text>
                                                                            <Text>Time: {sub.time}</Text>
                                                                            <Text>Place: {sub.place}</Text>
                                                                            <Text>Ressources: {sub.ressources}</Text>
                                                                        </WhiteFrame>
                                                                    </Col>
                                                                )
                                                            })}
                                                        </Row>
                                                    </WhiteFrame>
                                                    :
                                                    < WhiteFrame >
                                                        <Col key={procIndex}>
                                                            <Frame margin="1em">
                                                                <Dot src="dot.png" />
                                                                <Number>{procIndex + 1}</Number>
                                                            </Frame>
                                                            <Text>Name: {proc.name}</Text>
                                                            <Text>Time: {proc.time}</Text>
                                                            <Text>Place: {proc.place}</Text>
                                                            <Text>Ressources: {proc.ressources}</Text>
                                                        </Col>
                                                    </WhiteFrame>
                                                }
                                            </React.Fragment>

                                        )

                                    })

                                }
                                <React.Fragment>
                                    {subQuestion &&
                                        <React.Fragment>
                                            <Row>
                                                <Wrapper>
                                                    <Text>Will This Step Consist Of Multiple Substeps?</Text>
                                                </Wrapper>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button onClick={this.newSubprocess}>Yes</Button>
                                                </Col>
                                                <Col >
                                                    <Button onClick={() => this.setState({ subprocess: false, subQuestion: false })}>No</Button>
                                                </Col>
                                            </Row>
                                        </React.Fragment>
                                    }
                                    {subprocess && showMainInput ?
                                        <Row>
                                            <Col lg="2">
                                                <Text>Name Step</Text>
                                            </Col>
                                            <Col lg="10">
                                                <Input value={mainName} onChange={this.handleInput} name="mainName" placeholder="Enter Name here..." />
                                            </Col>
                                        </Row>
                                        :
                                        null
                                    }
                                    {subQuestion ?
                                        null
                                        :
                                        <React.Fragment>
                                            <Row>
                                                <Text>Add Information To Your Step</Text>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <Row>
                                                        <Col lg="1">
                                                            <Text>Name</Text>
                                                        </Col>
                                                        <Col lg="11">
                                                            <Input value={name} placeholder="Enter Name here..." onChange={this.handleInput} name="name" />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="6">
                                                    <Row>
                                                        <Col lg="1">
                                                            <Text>Place</Text>
                                                        </Col>
                                                        <Col lg="11">
                                                            <Input placeholder="Enter Place here..." onChange={this.handleInput} value={place} name="place" />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="6">
                                                    <Row>
                                                        <Col lg="1">
                                                            <Text>Time</Text>
                                                        </Col>
                                                        <Col lg="11">
                                                            <Input placeholder="Enter Time here..." onChange={this.handleInput} value={time} name="time" />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="6">
                                                    <Row>
                                                        <Col lg="1">
                                                            <Text>Ressources</Text>
                                                        </Col>
                                                        <Col lg="11">
                                                            <Input placeholder="Enter Ressources here..." onChange={this.handleInput} value={ressources} name="ressources" />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </React.Fragment>
                                    }
                                    {subprocess && showMask &&
                                        <Row>
                                            <Wrapper>
                                                <Button onClick={this.addSubprocess}>Add Substep</Button>
                                            </Wrapper>
                                        </Row>
                                    }
                                    {!subprocess &&
                                        <Row>
                                            <Wrapper>
                                                <Button onClick={this.addStep}>Add Step</Button>
                                            </Wrapper>
                                        </Row>
                                    }
                                </React.Fragment>
                            </WhiteFrame>
                        }

                        <Col lg="12">
                            <Button onClick={() => this.setState({ showMask: true, subQuestion: true })}>
                                Create New Step
                            </Button>
                            <Button onClick={() => this.setState({ showOrga: true })}>Organize Steps</Button>
                        </Col>
                        <Space></Space>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        {process[0] &&
                            <Col lg="9">
                                <React.Fragment>
                                    <Text>Übersicht über alle Produktionsschritte</Text>
                                    <Graph data={process} />
                                </React.Fragment>
                            </Col>
                        }
                        <Col lg="3">

                            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                                <Outline >
                                    <Text weight={"bold"}>Alle Produktionsschritte</Text>
                                    <Droppable droppableId="droppable-init" >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {process.length === 0 ?
                                                    null
                                                    :
                                                    process.map((proc, index) => {
                                                        return (
                                                            <Draggable key={proc.id} draggableId={proc.id} index={index}>
                                                                {(provided) => (
                                                                    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                                        <Row key={index}>
                                                                            <Col >
                                                                                <Outline margin="1em" width="80%">
                                                                                    <Text>{proc.name}</Text>
                                                                                    <Frame>
                                                                                        <Dot src="dot.png" />
                                                                                        <Number type={proc.name === "" ? "input" : "reg"}>{index + 1}</Number>
                                                                                    </Frame>
                                                                                </Outline>
                                                                            </Col>
                                                                        </Row>

                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    })
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Outline>
                            </DragDropContext>
                        </Col>
                    </React.Fragment>
                }
            </React.Fragment >
        )
    }

    onDragEnd(result) {
        const steps = [...this.state.process]
        var dest = steps[result.destination.index]
        var source = steps[result.source.index]

        steps[result.source.index] = dest
        steps[result.destination.index] = source

        this.setState({ process: steps })
        this.createNetzplan()
    }

    createNetzplan() {

    }

    newSubprocess() {
        let process = [...this.state.process]
        process.push({ name: "", id: "item" + process.length, subprocesses: [] })
        this.setState({ subprocess: true, subQuestion: false, process: process, showMainInput: true, mainName: "" })
    }

    addStep() {
        let process = [...this.state.process]
        const newProcess = {
            name: this.state.name,
            time: this.state.time,
            place: this.state.place,
            ressources: this.state.ressources,
            id: "item-" + process.length
        }
        process.push(newProcess)
        this.setState({ process: process, name: "", place: "", ressources: "", time: "" })
    }

    addSubprocess() {
        let process = [...this.state.process]
        const subprocess = {
            name: this.state.name,
            time: this.state.time,
            place: this.state.place,
            ressources: this.state.ressources,
            id: "subitem-" + process[process.length - 1].subprocesses.length
        }
        process[process.length - 1].subprocesses.push(subprocess)
        process[process.length - 1].name = this.state.mainName
        this.setState({ process: process, time: "", place: "", name: "", ressources: "", showMainInput: false })
    }

    handleInput(event) {
        const target = event.target;
        const value = target.value
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
}

const Title = styled.h1`
    font-weight: bold;
    margin: 0.5em auto;
    `

const ButtonText = styled.div`
margin: 3em auto;;
display: inline;
padding: 0 0.5em

    `

const Input = styled.input`
    border: 1px solid #D8DDE6;
    padding: 0.25em 0.5em;
    outline: none;
    margin: 1em;
    width: 80%
`



const WhiteFrame = styled.div`
    background-color: white;
    width: 90%;
margin: ${props => props.margin ? props.margin : "1em auto"}
border: 1px solid #D8DDE6

`

const Space = styled.div`
    margin-bottom: 50em
`

const Add = styled.img`
    width: 1.2rem;
    margin-left: 1em
`

const Outline = styled.div`
    border: 1px solid #D8DDE6;
    min-width: 5em;
    border-radius: 3px;
    width: ${props => props.width ? props.width : null}
    padding: 1em 0.5em;
    // margi    n: 2em 5em;
    display: inline-block;
    cursor: ${props => props.cursor ? null : "pointer"};
    margin: ${props => props.margin ? props.margin : "2em auto"}
    : hover{
        border : 1px solid #54698D
    }
`

const Background = styled.div`
    width: 100%;
    background-color: #FAFBFC;
    `



const Wrapper = styled.div`
margin:auto
`


const Button = styled.button`
    background-color: #57D9A3;
    color: white;
    min-width: 10em;
    margin: 3em 1em;
    border: none;
    padding: 2em;
    border-radius: 5px;
    outline: none
`


const Text = styled.div`
    margin: 1em;
    `

const Frame = styled.div`
    display: inline
    position: relative
    margin:${props => props.margin ? props.margin : "0"}
`

const Dot = styled.img`
    width: 1em
`

const Number = styled.div`
    color: white;
    display: inline;
    position: absolute;
    width: 1em;
    margin-top: ${props => props.type === "input" ? "0.3em " : "0.03em"};
    left: 0;
`

export default HelloScreen