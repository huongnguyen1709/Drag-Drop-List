import React from 'react'
import styled from 'styled-components'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
`
const Title = styled.h3`
    padding: 8px;
`
const TaskList = styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    transition: background-color 0.2s ease;
    flex-grow: 1;
    min-height: 100px;
`

const Column = (props) => {
    return (
        <div>
            <Container>
                <Title>{props.column.title}</Title>
                <Droppable
                    // a Droppable has one required a droppableId (this ID need to be unique within the DragDropContext)
                    droppableId={props.column.id}
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
                                {
                                    props.tasks.map((task, index) => {
                                        return <Task key={task.id} task={task} index={index} />
                                    })
                                }
                                {provided.placeholder}
                            </TaskList>
                        )
                    }
                </Droppable>
            </Container>
        </div>
    );
}

export default Column;