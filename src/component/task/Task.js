/* eslint-disable import/first */
import { Draggable } from 'react-beautiful-dnd';
import './task.scss';

const Task = ({task,index,column}) => {

    return (
        <div className="task">
            <Draggable draggableId={task.id} index={index} >
                {(provided, snapshot) => (
                <div 
                    className={
                        snapshot.isDragging ? 'task__wrapper task__wrapper_snapshot' : 
                        column.id === 'column-1' ? 'task__wrapper' : column.id === 'column-2' ?
                        'task__wrapper task__wrapper_yellow' : 'task__wrapper task__wrapper_red'
                    }
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    >
                        <div className="task__name">{task.content}</div> 
                </div>)}     
            </Draggable>                 
        </div>  
    )
}

export default Task;