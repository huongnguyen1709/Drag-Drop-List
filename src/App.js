import React, { Component, PureComponent } from 'react'
import initialData from './Data/initial-data'
import Column from './Components/Column'
import 'css-reset-and-normalize'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
    width: 95%;
    margin: 10px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`

class InnerList extends PureComponent { // PureComponent check as we have shouldComponentUpdate
    // shouldComponentUpdate(nextProps) {
    //     if (
    //         nextProps.column === this.props.column &&
    //         nextProps.taskMap === this.props.taskMap &&
    //         nextProps.index === this.props.index
    //     ) { return false }
    //     return true
    // }

    render() {
        const { column, taskMap, index } = this.props
        const tasks = column.taskIds.map(taskId => taskMap[taskId])
        return <Column column={column} tasks={tasks} index={index} />
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = initialData
    }

    /*onDragStart = () => {
        document.body.style.color = 'orange'
        document.body.style.transition = 'background-color 0.2s ease'
    }

    onDragUpdate = update => { // make styles change during the drag
        const { destination } = update
        const opacity = destination
            ? destination.index / Object.keys(this.state.tasks).length
            : 0
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
    }*/

    onDragEnd = result => {
        // change the color of body back to original
        document.body.style.color = 'inherit'
        document.body.style.backgroundColor = 'inherit'
        // TODO: reorder our column and change state
        console.log(result)
        const { destination, source, draggableId, type } = result
        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(this.state.columnOrder)
            newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, draggableId)

            const newState = {
                ...this.state,
                columnOrder: newColumnOrder
            }
            this.setState(newState)
            return
        }

        const start = this.state.columns[source.droppableId]
        const finish = this.state.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            }

            this.setState(newState)
            return
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        this.setState(newState)
        return
    }

    render() {
        return (
            // the only required callback for a DragDropContext is onDragEnd
            <DragDropContext
                // onDragStart // is called when the drag start
                onDragStart={this.onDragStart}
                // onDragUpdate is called when something changes during a drag such as an item is moving into a new position
                // onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd} // is called at the end of a drag
            >
                <Droppable
                    droppableId='all-columns'
                    direction='horizontal'
                    type='column'
                >
                    {provided => (
                        <Container
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {
                                this.state.columnOrder.map((columnId, index) => {
                                    const column = this.state.columns[columnId]
                                    return (
                                        <InnerList
                                            key={columnId}
                                            column={column}
                                            taskMap={this.state.tasks}
                                            index={index}
                                        />
                                    )
                                })
                            }
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>

        );
    }
}

export default App
