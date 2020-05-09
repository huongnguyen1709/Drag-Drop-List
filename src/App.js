import React, { Component } from 'react'
import initialData from './Data/initial-data'
import Column from './Components/Column'
import 'css-reset-and-normalize'
import { DragDropContext } from 'react-beautiful-dnd'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = initialData
    }

    onDragEnd = result => {
        // TODO: reorder our column, to change state
    }

    render() {
        return (
            // the only required callback for a DragDropContext is onDragEnd
            <DragDropContext
                // onDragStart // is called when the drag start
                // onDragUpdate // is called when something changes during a drag such as an item is moving into a new position
                onDragEnd={this.onDragEnd} // is called at the end of a drag
            >
                {
                    this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId]
                        const tasks = column.taskIds.map(taskId => {
                            return this.state.tasks[taskId]
                        })
                        return <Column key={columnId} column={column} tasks={tasks} />
                    })
                }
            </DragDropContext>

        );
    }
}

export default App
