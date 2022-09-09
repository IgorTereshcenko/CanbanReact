/* eslint-disable import/first */
import { Draggable } from 'react-beautiful-dnd';
import './task.scss';

const Task = ({task,index}) => {

    return (
        <div className="task">
            <Draggable draggableId={task.id} index={index} >
                {(provided, snapshot) => (
                <div 
                    className='task__wrapper'
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