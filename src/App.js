import React, { Component } from 'react'
import initialData from './Data/initial-data'
import Column from './Components/Column'
import 'css-reset-and-normalize'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
    width: 95%;
    margin: 10px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr) 
`

class App extends Component {

    constructor(props) {
        super(props);
        this.state = initialData
    }

    onDragStart = () => {
        document.body.style.color = 'orange'
        document.body.style.transition = 'background-color 0.2s ease'
    }

    onDragUpdate = update => { // make styles change during the drag
        const { destination } = update
        const opacity = destination
            ? destination.index / Object.keys(this.state.tasks).length
            : 0
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
    }

    onDragEnd = result => {
        // change the color of body back to original
        document.body.style.color = 'inherit'
        document.body.style.backgroundColor = 'inherit'
        // TODO: reorder our column and change state

        const { destination, source, draggableId } = result
        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
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
                // onDragUpdate // is called when something changes during a drag such as an item is moving into a new position
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd} // is called at the end of a drag
            >
                <Container>
                    {
                        this.state.columnOrder.map(columnId => {
                            const column = this.state.columns[columnId]
                            const tasks = column.taskIds.map(taskId => {
                                return this.state.tasks[taskId]
                            })
                            return <Column key={columnId} column={column} tasks={tasks} />
                        })
                    }
                </Container>
            </DragDropContext>

        );
    }
}

export default App
