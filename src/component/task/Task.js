/* eslint-disable import/first */
import React from 'react';
import { useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './task.scss';

const Task = ({task,index,color}) => {
    console.log('task')
    
    return (
        <div className="task">
            <Draggable draggableId={task.id} index={index} >
                {(provided, snapshot) => (
                <div 
                    className={
                        snapshot.isDragging ? 'task__wrapper task__wrapper_snapshot' : 
                        'task__wrapper'
                    }
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        ...provided.draggableProps.style,
                        border: `1px solid ${color}`
                        }
                    } 
                    >
                        <div className="task__name">{task.content}</div> 
                </div>)}     
            </Draggable>                 
        </div>  
    )
}

const MemoTask = React.memo(Task);

export default MemoTask;