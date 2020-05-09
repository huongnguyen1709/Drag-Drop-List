import React from 'react'
import styled from 'styled-components'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`
const Title = styled.h3`
    padding: 8px;
`
const TaskList = styled.div`
    padding: 8px;
`

const Column = (props) => {
    return (
        <div>
            <Container>
                <Title>{props.column.title}</Title>
                <Droppable
                // a Droppable has one required a droppableId
                >
                    <TaskList>
                        {
                            props.tasks.map(task => {
                                return <Task key={task.id} content={task.content} />
                            })
                        }
                    </TaskList>
                </Droppable>
            </Container>
        </div>
    );
}

export default Column;