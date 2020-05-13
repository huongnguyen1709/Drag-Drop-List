import React, { Component } from 'react'
import styled from 'styled-components'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    background-color: skyblue;

    display: flex;
    flex-direction: column;
`
const Title = styled.h2`
    padding: 8px;
    text-align: center;
    background-color: #ed402d;
    color: #eddfdd;
    font-size: 22px;
`
const TaskList = styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? '#48d995' : 'inherit')};
    transition: background-color 0.2s ease;
    flex-grow: 1;
    min-height: 100px;
`

class InnerList extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.tasks === this.props.tasks) {
            return false // if the tasks is the same, position not changed, so not allow a render
        }
        return true // allow render
    }

    render() {
        return (
            <div>
                {
                    this.props.tasks.map((task, index) => {
                        return <Task key={task.id} task={task} index={index} />
                    })
                }
            </div>
        );
    }
}

const Column = (props) => {
    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {provided => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Title {...provided.dragHandleProps}>{props.column.title}</Title>
                    <Droppable
                        // a Droppable has one required a droppableId (this ID need to be unique within the DragDropContext)
                        droppableId={props.column.id}
                        // column-3 là done, 2 column còn lại là active, column-3 sẽ ko droppable dc, cùng type sẽ droppable dc, khác type thì không
                        //type={props.column.id === 'column-3' ? 'done' : 'active'}
                        type='task'
                    >
                        {   /* (...) inside the bracket, we have 'provided' object has a property called 
                                droppable props (provided.droppableProps)  
                            */
                            (provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    <InnerList tasks={props.tasks} />

                                    {/* A place holder is a react element that is used to increase the available space in a droppable during a drag when it's needed */}
                                    {provided.placeholder}
                                </TaskList>
                            )
                        }
                    </Droppable>
                </Container>
            )}
        </Draggable>
    );
}

export default Column;