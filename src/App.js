import React, { Component } from 'react'
import initialData from './Data/initial-data'
import Column from './Components/Column'
import 'css-reset-and-normalize'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = initialData
    }

    render() {
        return (
            <div>
                {
                    this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId]
                        const tasks = column.taskIds.map(taskId => {
                            return this.state.tasks[taskId]
                        })
                        return <Column key={columnId} column={column} tasks={tasks} />
                    })
                }
            </div>

        );
    }
}

export default App
