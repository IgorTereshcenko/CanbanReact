/* eslint-disable import/first */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from "react-redux";
import './task.scss';
import { boardTaskDelete } from '../columns/columnsSlice';
import deleteImg from '../../resurses/delete.svg';

const Task = ({task,index,color}) => {
    
    const dispatch = useDispatch();

    const deleteTask = () => {
        dispatch(boardTaskDelete(task.id));
    }

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
                        <button 
                            className={snapshot.isDragging ? 'task__delete task__delete_snapshot' : 
                        'task__delete'} 
                            onClick={deleteTask}>
                            <img src={deleteImg} alt="deleteImg" />
                        </button> 
                </div>)}     
            </Draggable>                 
        </div>  
    )
}

const MemoTask = React.memo(Task);

export default MemoTask;