import React from 'react';
import ReactEcharts from 'echarts-for-react';


class Graph extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {}
        // console.log(this.props);
    }

    componentDidMount() {
        var flattendData = []
        this.props.data.map(p => p.subprocesses ? p.subprocesses.map(sub => flattendData.push(sub)) : flattendData.push(p))
        var newData = this.createBubbles(flattendData)
        this.setState({ bubbles: newData[0], links: newData[1] })
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.data !== this.props.data) {
            var flattendData = []
            this.props.data.map(p => p.subprocesses ? p.subprocesses.map(sub => flattendData.push(sub)) : flattendData.push(p))
            var newData = this.createBubbles(flattendData)

            this.setState({ bubbles: newData[0], links: newData[1] })
        }
    }

    render() {
        console.log(this.state);
        return (
            <ReactEcharts
                option={this.getOption()}
                style={{ height: '800px', width: '100%' }}
                className='react_for_echarts' />
        )
    }

    createBubbles(flattendData) {
        var bubbles = []
        var links = []
        this.props.data.forEach((process, processIndex) => {
            if (!process.subprocesses) {
                var bubble = {
                    name: process.name,
                    time: process.time,
                    place: process.place,
                    ressources: process.ressources,
                    x: 200,
                    y: (processIndex + 1) * 50,
                    itemStyle: { color: '#57D9A3' }
                }
                bubbles.push(bubble)
                // console.log(this.props.data[processIndex + 1]);
                console.log("proces", process);

                if (this.props.data[processIndex + 1]) {
                    if (this.props.data[processIndex + 1].subprocesses) {
                        this.props.data[processIndex + 1].subprocesses.forEach((sub, subIndex) => {
                            console.log("sub", sub);
                            var link = {
                                source: process.name,
                                target: sub.name
                            }
                            links.push(link)
                        })
                    } else {
                        var link = {
                            source: process.name,
                            target: this.props.data[processIndex + 1].name
                        }
                        links.push(link)
                    }
                } else {
                    var link = {
                        source: process.name,
                        target: process[processIndex + 1]
                    }
                    links.push(link)
                }

            } else {
                process.subprocesses.forEach((subProc, subProcIndex) => {
                    var bubble = {
                        name: subProc.name,
                        time: subProc.time,
                        place: subProc.place,
                        ressources: subProc.ressources,
                        x: subProcIndex * 200,
                        y: (processIndex + 1) * 50,
                        itemStyle: { color: '#57D9A3' }
                    }
                    bubbles.push(bubble)
                    if (this.props.data[processIndex + 1]) {
                        if (!this.props.data[processIndex + 1].subprocesses) {
                            var link = {
                                source: subProc.name,
                                target: this.props.data[processIndex + 1].name
                            }
                            links.push(link)
                        } else {
                            this.props.data[processIndex + 1].subprocesses.forEach((nextSubProc, nextSubProcIndex) => {
                                var link = {
                                    source: subProc.name,
                                    target: nextSubProc.name
                                }
                            })
                        }
                    }
                })
            }

            if (processIndex === this.props.data.length - 1) {
                if (process.subprocesses) {
                    process.subprocesses.forEach((sub, subIndex) => {
                        var link = {
                            source: sub.name,
                            target: "End"
                        }
                        links.push(link)
                    })
                } else {
                    var link = {
                        source: process.name,
                        target: "End"
                    }
                    links.push(link)
                }
                bubbles.push({ name: "End", x: 200, y: (processIndex + 2) * 50, itemStyle: { color: '#F64747' }, symbolSize: "50" })
            }

        })

        if (this.props.data[0].subprocesses) {
            this.props.data[0].subprocesses.forEach((sub, subIndex) => {
                var link = {
                    source: "Start",
                    target: sub.name
                }
                links.push(link)
            })
        } else {
            var link = {
                source: "Start",
                target: this.props.data[0].name
            }
            links.push(link)
        }
        bubbles.splice(0, 0, { name: "Start", x: 200, y: 0, itemStyle: { color: '#F64747' }, symbolSize: "50" })


        return [bubbles, links]
    }

    createBubbles2(flattendData) {
        var bubbles = []
        var links = []
        this.props.data.forEach((process, processIndex) => {
            if (process.subprocesses === undefined) {
                var bubble =
                {
                    name: process.name,
                    x: 0,
                    y: (processIndex + 1) * 50,
                    itemStyle: { color: '#57D9A3' }
                }

                for (var i = processIndex + 1; i < this.props.data.length; i++) {
                    if (this.props.data[i].subprocesses === undefined) {
                        var link = {
                            source: process.name,
                            target: this.props.data[i].name
                        }
                        links.push(link)
                        if (this.props.data[i].allowBackstep) {
                            const link = {
                                source: this.props.data[i].name,
                                target: process.name
                            }
                            links.push(link)
                        }
                    } else {
                        this.props.data[i].subprocesses.forEach((nextSubtype) => {
                            var link = {
                                source: process.name,
                                target: nextSubtype.name
                            }
                            links.push(link)
                            if (nextSubtype.allowBackstep) {
                                const link = {
                                    source: nextSubtype.name,
                                    target: process.name
                                }
                                links.push(link)
                            }
                        })
                    }
                }

                bubbles.push(bubble)

            } else {
                process.subprocesses.forEach((subtype, subtypeIndex) => {
                    var bubble =
                    {
                        name: subtype.name,
                        x: subtypeIndex * 200,
                        y: (processIndex + 1) * 50,
                        itemStyle: { color: '#57D9A3' }
                    }
                    for (var nextProcessIndex = processIndex + 1; nextProcessIndex < this.props.data.length; nextProcessIndex++) {
                        if (this.props.data[nextProcessIndex].subprocesses === undefined) {

                            var link = {
                                source: subtype.name,
                                target: this.props.data[nextProcessIndex].name
                            }
                            links.push(link)

                            if (this.props.data[nextProcessIndex].allowBackstep) {
                                const link = {
                                    source: this.props.data[nextProcessIndex].name,
                                    target: subtype.name,
                                }
                                links.push(link)
                            }
                        } else {
                            this.props.data[nextProcessIndex].subprocesses.forEach((nextSubtype) => {
                                var link = {
                                    source: subtype.name,
                                    target: nextSubtype.name
                                }
                                links.push(link)
                                if (nextSubtype.allowBackstep) {
                                    const link = {
                                        source: nextSubtype.name,
                                        target: subtype.name,
                                    }
                                    links.push(link)
                                }
                            })
                        }
                    }
                    bubbles.push(bubble)
                })
            }

            if (processIndex === this.props.data.length - 1) {
                bubbles.push({ name: "End", x: 200, y: (processIndex + 2) * 50, itemStyle: { color: '#F64747' }, symbolSize: "50" })
            }
        })

        var allLinks = this.addEndpoints(links, flattendData)

        bubbles.splice(0, 0, { name: "Start", x: 200, y: 0, itemStyle: { color: '#F64747' }, symbolSize: "50" })
        return [bubbles, allLinks]
    }

    addEndpoints(links, flattendData) {
        // flattendData.forEach(p => {
        //     if (p.type !== 0) {
        //         var link1 = {
        //             source: "Start",
        //             target: p.name
        //         }
        //         var link2 = {
        //             source: p.name,
        //             target: "End"
        //         }
        //         links.push(link1)
        //         links.push(link2)
        //     }

        // })
        // links.push({ source: "Start", target: "End" })

        var startBubble = {

        }
        return links
    }

    getOption = () => ({
        tooltip: {
            trigger: 'item',
            formatter: (params => {
                console.log('params: ', params.data);
                return 'Name: ' + params.data.name + (params.data.place !== undefined ? ' </br></br> Place: ' + params.data.place + '</br></br> Time: ' + params.data.time + '</br></br> Ressource: ' + params.data.ressources : "")
            })
        },

        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                roam: true,
                label: {
                    normal: {
                        show: true
                    }
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                data: this.state.bubbles,
                links: this.state.links,
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 1,
                        curveness: 0
                    }
                }
            }
        ]
    })
}

export default Graph